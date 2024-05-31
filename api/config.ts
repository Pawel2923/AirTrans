import { ConnectionOptions } from "mysql2";

interface Config {
  db: ConnectionOptions;
  listPerPage: number;
  getDbUser: (role: string) => void;
  employeeRoles: string[];
}

const config: Config = {
  db: {
    host: process.env["DB_HOST"] as string,
    user: "client",
    password: process.env["DB_CLIENT_PASSWORD"] as string,
    database: process.env["DB_NAME"] as string,
    connectTimeout: 60000,
  },
  listPerPage: 10,
  getDbUser,
  employeeRoles: [
    "admin",
    "atc",
    "ground_crew",
    "airport_staff",
    "parking_staff",
    "rental_staff",
  ],
};

export default config;

function getDbUser(role: string) {
  if (role === "admin") {
    config.db.password = process.env["DB_ADMIN_PASSWORD"] as string;
  } else if (role === "atc") {
    config.db.password = process.env["DB_ATC_PASSWORD"] as string;
  } else if (role === "ground_crew") {
    config.db.password = process.env["DB_GROUND_CREW_PASSWORD"] as string;
  } else if (role === "aiport_staff") {
    config.db.password = process.env["DB_AIRPORT_STAFF_PASSWORD"] as string;
  } else if (role === "parking_staff") {
    config.db.password = process.env["DB_PARKING_STAFF_PASSWORD"] as string;
  } else if (role === "rental_staff") {
    config.db.password = process.env["DB_RENTAL_STAFF_PASSWORD"] as string;
  } else {
    config.db.password = process.env["DB_CLIENT_PASSWORD"] as string;
    config.db.user = "client";
    return;
  }

  config.db.user = role;
}
