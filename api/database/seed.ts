import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { createDatabaseConnection, loadEnv, splitSqlStatements } from "./client";

loadEnv();

function resolveSeedFile(): string {
  const candidateFiles = [
    path.join(__dirname, "seeds", "20260206122000_reference_data.sql"),
    path.resolve(__dirname, "../../database/seeds/20260206122000_reference_data.sql"),
    path.resolve(__dirname, "../database/seeds/20260206122000_reference_data.sql"),
    path.resolve(process.cwd(), "database/seeds/20260206122000_reference_data.sql"),
    path.resolve(process.cwd(), "api/database/seeds/20260206122000_reference_data.sql"),
  ];

  for (const file of candidateFiles) {
    if (fsSync.existsSync(file)) {
      return file;
    }
  }

  return path.join(__dirname, "seeds", "20260206122000_reference_data.sql");
}

async function seed(): Promise<void> {
  const connection = await createDatabaseConnection();
  try {
    const seedFile = resolveSeedFile();
    const contents = await fs.readFile(seedFile, "utf8");
    const statements = splitSqlStatements(contents);
    await connection.beginTransaction();
    try {
      for (const statement of statements) {
        await connection.query(statement);
      }
      await connection.commit();
      console.log(`Applied ${path.basename(seedFile)} (${statements.length} statements).`);
    } catch (error: unknown) {
      await connection.rollback();
      throw new Error(`Seed file ${path.basename(seedFile)} failed.`, { cause: error });
    }
  } finally {
    await connection.end();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
