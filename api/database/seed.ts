import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { createDatabaseConnection, splitSqlStatements } from "./client";

dotenv.config();

const seedFile = path.join(__dirname, "seeds", "20260206122000_reference_data.sql");

async function seed(): Promise<void> {
  const connection = await createDatabaseConnection();
  try {
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
