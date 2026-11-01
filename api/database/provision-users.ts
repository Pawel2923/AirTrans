import mysql from "mysql2/promise";
import { createDatabaseConnection, loadEnv } from "./client";

loadEnv();

const database = process.env["DB_NAME"] ?? process.env["MYSQLDB_DATABASE"] ?? "AirTrans";
const host = process.env["DB_USER_HOST"] ?? "172.%";
const databaseIdentifier = mysql.escapeId(database);

const accounts = [
  ["admin", "MYSQLDB_ADMIN_PASSWORD"],
  ["client", "MYSQLDB_CLIENT_PASSWORD"],
  ["atc", "MYSQLDB_ATC_PASSWORD"],
  ["ground_crew", "MYSQLDB_GROUND_CREW_PASSWORD"],
  ["airport_staff", "MYSQLDB_AIRPORT_STAFF_PASSWORD"],
  ["parking_staff", "MYSQLDB_PARKING_STAFF_PASSWORD"],
  ["rental_staff", "MYSQLDB_RENTAL_STAFF_PASSWORD"],
] as const;

async function provisionUsers(): Promise<void> {
  const connection = await createDatabaseConnection();
  try {
    for (const [account, passwordVariable] of accounts) {
      const password = process.env[passwordVariable];
      if (!password) {
        throw new Error(`${passwordVariable} must be set to provision database users.`);
      }

      await connection.query(
        `CREATE USER IF NOT EXISTS ${mysql.escapeId(account)}@'${host}' IDENTIFIED BY ?`,
        [password]
      );
      await connection.query(
        `ALTER USER ${mysql.escapeId(account)}@'${host}' IDENTIFIED BY ?`,
        [password]
      );
    }

    await connection.query(
      `GRANT ALL PRIVILEGES ON ${databaseIdentifier}.* TO ${mysql.escapeId("admin")}@'${host}'`
    );
    await connection.query("CREATE ROLE IF NOT EXISTS 'user'");
    await connection.query("CREATE ROLE IF NOT EXISTS 'employee'");

    const userSelectTables = [
      "Airplanes",
      "Announcements",
      "Cars",
      "Contact_info",
      "Departures",
      "Employees",
      "Flights",
      "Flight_data",
      "Gates",
      "Parking_info",
      "Runways",
      "Taxiways",
      "Terminals",
    ];
    for (const table of userSelectTables) {
      await connection.query(`GRANT SELECT ON ${databaseIdentifier}.${mysql.escapeId(table)} TO 'user'`);
    }
    for (const [privileges, table] of [
      ["SELECT, INSERT, UPDATE, DELETE", "Luggage"],
      ["SELECT, INSERT, UPDATE", "Parking_reservations"],
      ["SELECT, INSERT, UPDATE", "Rentals"],
      ["SELECT, INSERT, UPDATE", "Tickets"],
      ["SELECT, INSERT, UPDATE, DELETE", "Users"],
      ["SELECT, INSERT, UPDATE", "Reset_password"],
    ]) {
      await connection.query(
        `GRANT ${privileges} ON ${databaseIdentifier}.${mysql.escapeId(table)} TO 'user'`
      );
    }

    await connection.query(
      `GRANT EXECUTE ON PROCEDURE ${databaseIdentifier}.Logowanie TO 'user'`
    );
    await connection.query(
      `GRANT EXECUTE ON PROCEDURE ${databaseIdentifier}.Rejestracja TO 'user'`
    );
    await connection.query(
      `GRANT EXECUTE ON PROCEDURE ${databaseIdentifier}.validate_user_data TO 'user'`
    );
    for (const functionName of [
      "validate_airplane_fuel",
      "validate_arrival_departure",
      "validate_birth_date",
      "validate_email",
      "validate_password",
      "validate_phone_number",
    ]) {
      await connection.query(
        `GRANT EXECUTE ON FUNCTION ${databaseIdentifier}.${mysql.escapeId(functionName)} TO 'user'`
      );
    }

    await connection.query(`GRANT 'user' TO ${mysql.escapeId("client")}@'${host}'`);
    for (const account of accounts.slice(2).map(([name]) => name)) {
      await connection.query(`GRANT 'user', 'employee' TO ${mysql.escapeId(account)}@'${host}'`);
    }
    await connection.query(`SET DEFAULT ROLE 'user' TO ${mysql.escapeId("client")}@'${host}'`);
    for (const account of accounts.slice(2).map(([name]) => name)) {
      await connection.query(
        `SET DEFAULT ROLE 'user', 'employee' TO ${mysql.escapeId(account)}@'${host}'`
      );
    }

    await connection.query(`GRANT USAGE ON ${databaseIdentifier}.* TO 'employee'`);
    await connection.query(`GRANT INSERT, UPDATE, DELETE ON ${databaseIdentifier}.Announcements TO 'employee'`);
    await connection.query(
      `GRANT SELECT, INSERT, UPDATE, DELETE ON ${databaseIdentifier}.Flight_data TO ${mysql.escapeId("atc")}@'${host}'`
    );
    await connection.query(
      `GRANT SELECT, INSERT, UPDATE, DELETE ON ${databaseIdentifier}.Flights TO ${mysql.escapeId("atc")}@'${host}'`
    );
    for (const table of ["Runways", "Taxiways", "Terminals"]) {
      await connection.query(
        `GRANT SELECT, INSERT, UPDATE, DELETE ON ${databaseIdentifier}.${mysql.escapeId(table)} TO ${mysql.escapeId("atc")}@'${host}'`
      );
    }
    await connection.query(
      `GRANT SELECT, INSERT, UPDATE, DELETE ON ${databaseIdentifier}.Equipment TO ${mysql.escapeId("ground_crew")}@'${host}'`
    );
    await connection.query(
      `GRANT UPDATE ON ${databaseIdentifier}.Tickets TO ${mysql.escapeId("airport_staff")}@'${host}'`
    );
    await connection.query(
      `GRANT UPDATE, INSERT, DELETE ON ${databaseIdentifier}.Gates TO ${mysql.escapeId("airport_staff")}@'${host}'`
    );
    await connection.query(
      `GRANT UPDATE ON ${databaseIdentifier}.Contact_info TO ${mysql.escapeId("airport_staff")}@'${host}'`
    );
    await connection.query(
      `GRANT DELETE ON ${databaseIdentifier}.Parking_reservations TO ${mysql.escapeId("parking_staff")}@'${host}'`
    );
    await connection.query(
      `GRANT INSERT, UPDATE, DELETE ON ${databaseIdentifier}.Parking_info TO ${mysql.escapeId("parking_staff")}@'${host}'`
    );
    await connection.query(
      `GRANT INSERT, UPDATE, DELETE ON ${databaseIdentifier}.Cars TO ${mysql.escapeId("rental_staff")}@'${host}'`
    );
    await connection.query(
      `GRANT DELETE ON ${databaseIdentifier}.Rentals TO ${mysql.escapeId("rental_staff")}@'${host}'`
    );
    await connection.query("FLUSH PRIVILEGES");
    console.log("Database users, roles, and grants are up to date.");
  } finally {
    await connection.end();
  }
}

provisionUsers().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
