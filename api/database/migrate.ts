import crypto from "crypto";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { createDatabaseConnection, loadEnv, splitSqlStatements } from "./client";

loadEnv();

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

const DEFAULT_BASELINE_VERSION = "20260206121500";
const migrationPattern = /^(\d+)_([a-z0-9_-]+)\.sql$/i;

function resolveMigrationsDirectory(): string {
  const candidateDirs = [
    path.join(__dirname, "migrations"),
    path.resolve(__dirname, "../../database/migrations"),
    path.resolve(__dirname, "../database/migrations"),
    path.resolve(process.cwd(), "database/migrations"),
    path.resolve(process.cwd(), "api/database/migrations"),
  ];

  for (const dir of candidateDirs) {
    if (fsSync.existsSync(dir)) {
      return dir;
    }
  }

  return path.join(__dirname, "migrations");
}

function parseBaselineArg(): { isBaseline: boolean; baselineVersion: string } {
  const args = process.argv.slice(2);
  let isBaseline = false;
  let baselineVersion = DEFAULT_BASELINE_VERSION;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) {
      continue;
    }
    if (arg === "--baseline" || arg === "-b") {
      isBaseline = true;
      const nextArg = args[i + 1];
      if (nextArg && !nextArg.startsWith("-")) {
        baselineVersion = nextArg;
        i++;
      }
    } else if (arg.startsWith("--baseline=")) {
      isBaseline = true;
      const val = arg.slice("--baseline=".length).trim();
      if (val) {
        baselineVersion = val;
      }
    }
  }

  return { isBaseline, baselineVersion };
}

async function readMigrations(): Promise<MigrationFile[]> {
  const migrationsDirectory = resolveMigrationsDirectory();
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

async function baseline(connection: Connection, baselineVersion: string): Promise<void> {
  await ensureMigrationsTable(connection);
  const [migrations, applied] = await Promise.all([
    readMigrations(),
    getAppliedMigrations(connection),
  ]);

  const baselineMigrations = migrations.filter((m) => m.version <= baselineVersion);
  let recordedCount = 0;

  for (const m of baselineMigrations) {
    const existing = applied.get(m.version);
    if (existing) {
      if (existing.checksum !== m.checksum) {
        throw new Error(
          `Baseline migration ${m.filename} was already recorded with a different checksum.`
        );
      }
      console.log(`Baseline: ${m.filename} is already recorded.`);
    } else {
      await connection.query(
        "INSERT INTO schema_migrations (version, name, checksum) VALUES (?, ?, ?)",
        [m.version, m.name, m.checksum]
      );
      console.log(`Baseline: recorded ${m.filename} as applied.`);
      recordedCount++;
    }
  }

  console.log(
    `Baseline completed up to version ${baselineVersion}. Recorded ${recordedCount} new migrations (no schema statements executed).`
  );
}

async function migrate(): Promise<void> {
  const { isBaseline, baselineVersion } = parseBaselineArg();
  const connection = await createDatabaseConnection();

  try {
    if (isBaseline) {
      await baseline(connection, baselineVersion);
      return;
    }

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
