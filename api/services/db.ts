import mysql from "mysql2/promise";
import config from "../config";
import { Err } from "../Types";

// query database
async function query(sql: string, params?: any[]) {
	const connection = await mysql.createConnection(config.db);
	connection.connect();

	try {
		const [results] = await connection.query(sql, params);
		return results;
	} catch (error: any) {
		console.error("Database error:", error);
		throw new Err(error.sqlMessage, error.sqlState === "45000" ? 400 : 500);
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
async function queryTransaction(connection: any, sql: string, params?: any[]) {
	try {
		const [results] = await connection.query(sql, params);
		return results;
	} catch (error: any) {
		console.error("Database error:", error);
		await connection.rollback();
		throw new Err(error.sqlMessage, error.sqlState === "45000" ? 400 : 500);
	}
}

// commit a transaction
async function commit(connection: any) {
	await connection.commit();
	connection.end();
}

// rollback a transaction
async function rollback(connection: any) {
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
