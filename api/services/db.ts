import mysql, { Connection } from "mysql2/promise";
import config from "../config";
import { Err } from "../Types";

// query database
async function query(sql: string, params?: unknown[]) {
  const connection = await mysql.createConnection(config.db);
  connection.connect();

  try {
    const [results] = await connection.query(sql, params);
    return results;
  } catch (error: unknown) {
    console.error("Database error:", (error as Error));
    throw new Err(
      (error as { sqlMessage: string }).sqlMessage,
      (error as mysql.QueryError).sqlState === "45000" ? 400 : 500
    );
  } finally {
    connection.end();
  }
}

// start a transaction
async function startTransaction() {
  const connection = await mysql.createConnection(config.db);
  await connection.beginTransaction();
  return connection;
}

// query transaction
async function queryTransaction(
  connection: Connection,
  sql: string,
  params?: unknown[]
) {
  try {
    const [results] = await connection.query(sql, params);
    return results;
  } catch (error: unknown) {
    console.error("Database error:", (error as Error));
    await connection.rollback();
    throw new Err(
      (error as { sqlMessage: string }).sqlMessage,
      (error as mysql.QueryError).sqlState === "45000" ? 400 : 500
    );
  }
}

// commit a transaction
async function commit(connection: Connection) {
  await connection.commit();
  connection.end();
}

// rollback a transaction
async function rollback(connection: Connection) {
  await connection.rollback();
  connection.end();
}

// get operator
function getOperator(operator?: string) {
  if (!operator) {
    return "=";
  }

  const validOperators = ["=", "<>", "<", ">", "<=", ">=", "LIKE"];
  if (validOperators.includes(operator)) {
    return operator;
  }

  return "=";
}

export default {
  query,
  getOperator,
  startTransaction,
  queryTransaction,
  commit,
  rollback,
};
