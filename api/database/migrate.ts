import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";
import { createDatabaseConnection, splitSqlStatements } from "./client";

dotenv.config();

interface MigrationFile {
  version: string;
  name: string;
  filename: string;
  contents: string;
  checksum: string;
}

interface AppliedMigration extends RowDataPacket {
  version: string;
  checksum: string;
}

const migrationsDirectory = path.join(__dirname, "migrations");
const migrationPattern = /^(\d+)_([a-z0-9_-]+)\.sql$/i;

async function readMigrations(): Promise<MigrationFile[]> {
  const filenames = (await fs.readdir(migrationsDirectory))
    .filter((filename) => migrationPattern.test(filename))
    .sort();

  const migrations = await Promise.all(
    filenames.map(async (filename) => {
      const match = migrationPattern.exec(filename);
      if (!match) {
        throw new Error(`Invalid migration filename: ${filename}`);
      }
      const version = match[1];
      const name = match[2];
      if (!version || !name) {
        throw new Error(`Invalid migration filename: ${filename}`);
      }

      const contents = await fs.readFile(path.join(migrationsDirectory, filename), "utf8");
      return {
        version,
        name,
        filename,
        contents,
        checksum: crypto.createHash("sha256").update(contents).digest("hex"),
      };
    })
  );

  const duplicateVersions = migrations
    .map((migration) => migration.version)
    .filter((version, index, versions) => versions.indexOf(version) !== index);
  if (duplicateVersions.length > 0) {
    throw new Error(`Duplicate migration version: ${duplicateVersions[0]}`);
  }

  return migrations;
}

async function ensureMigrationsTable(connection: Connection): Promise<void> {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(32) NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      checksum CHAR(64) NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);
}

async function getAppliedMigrations(connection: Connection): Promise<Map<string, AppliedMigration>> {
  const [rows] = await connection.query<AppliedMigration[]>(
    "SELECT version, checksum FROM schema_migrations ORDER BY version"
  );
  return new Map(rows.map((migration) => [migration.version, migration]));
}

async function applyMigration(connection: Connection, migration: MigrationFile): Promise<void> {
  const statements = splitSqlStatements(migration.contents);
  console.log(`Applying ${migration.filename} (${statements.length} statements)...`);

  await connection.beginTransaction();
  try {
    for (const statement of statements) {
      await connection.query(statement);
    }
    await connection.query<ResultSetHeader>(
      "INSERT INTO schema_migrations (version, name, checksum) VALUES (?, ?, ?)",
      [migration.version, migration.name, migration.checksum]
    );
    await connection.commit();
  } catch (error: unknown) {
    await connection.rollback();
    throw new Error(`Migration ${migration.filename} failed.`, { cause: error });
  }
}

async function migrate(): Promise<void> {
  const connection = await createDatabaseConnection();
  try {
    await ensureMigrationsTable(connection);
    const [migrations, applied] = await Promise.all([
      readMigrations(),
      getAppliedMigrations(connection),
    ]);

    for (const migration of migrations) {
      const existing = applied.get(migration.version);
      if (existing) {
        if (existing.checksum !== migration.checksum) {
          throw new Error(
            `Migration ${migration.filename} was already applied with a different checksum.`
          );
        }
        continue;
      }

      await applyMigration(connection, migration);
    }

    console.log("Database migrations are up to date.");
  } finally {
    await connection.end();
  }
}

migrate().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
