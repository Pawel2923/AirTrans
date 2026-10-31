import mysql, { ConnectionOptions } from "mysql2/promise";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export function getDatabaseConfig(): ConnectionOptions {
  const password = process.env["DB_MIGRATION_PASSWORD"] ?? process.env["MYSQLDB_ROOT_PASSWORD"];
  if (!password) {
    throw new Error(
      "DB_MIGRATION_PASSWORD or MYSQLDB_ROOT_PASSWORD must be set for database administration."
    );
  }

  const host = process.env["DB_HOST"] ?? "localhost";
  const isLocalhost = host === "localhost" || host === "127.0.0.1";
  const defaultPort = isLocalhost
    ? Number(
        process.env["MYSQLDB_PUBLISHED_PORT"] ??
          process.env["MYSQLDB_LOCAL_PORT"] ??
          process.env["MYSQLDB_INTERNAL_PORT"] ??
          3306
      )
    : Number(
        process.env["MYSQLDB_INTERNAL_PORT"] ??
          process.env["MYSQLDB_DOCKER_PORT"] ??
          3306
      );

  return {
    host,
    port: Number(process.env["DB_PORT"] ?? defaultPort),
    user: process.env["DB_MIGRATION_USER"] ?? "root",
    password,
    database: process.env["DB_NAME"] ?? process.env["MYSQLDB_DATABASE"] ?? "AirTrans",
    multipleStatements: false,
  };
}

export function splitSqlStatements(contents: string): string[] {
  const statements: string[] = [];
  let delimiter = ";";
  let statement = "";

  for (const line of contents.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (trimmedLine.toUpperCase().startsWith("DELIMITER ")) {
      delimiter = trimmedLine.slice("DELIMITER ".length).trim();
      continue;
    }

    statement += `${line}\n`;
    if (statement.trimEnd().endsWith(delimiter)) {
      const sql = statement.trimEnd().slice(0, -delimiter.length).trim();
      const executableSql = sql
        .replace(/^(?:\s*--[^\r\n]*(?:\r?\n|$))+/g, "")
        .replace(/^(?:\s*\/\*[\s\S]*?\*\/\s*)+/g, "")
        .trim();
      if (executableSql) {
        statements.push(executableSql);
      }
      statement = "";
    }
  }

  const remainingExecutable = statement
    .replace(/--[^\r\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .trim();

  if (remainingExecutable) {
    throw new Error("SQL file contains an unterminated SQL statement.");
  }

  return statements;
}

export async function createDatabaseConnection(): Promise<mysql.Connection> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      return await mysql.createConnection(getDatabaseConfig());
    } catch (error: unknown) {
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? (error as { code?: unknown }).code
          : undefined;
      if (code !== "ECONNREFUSED" && code !== "ETIMEDOUT" && code !== "PROTOCOL_CONNECTION_LOST") {
        throw error;
      }
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error("Unable to connect to MySQL after multiple attempts.", { cause: lastError });
}
