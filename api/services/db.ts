import { createConnection } from "mysql2/promise";
import config from "../config";

async function query(sql: string, params?: any[]) {
	const connection = await createConnection(config.db);
	connection.connect();

	try {
		const [results] = await connection.query(sql, params);
		return results;
	} catch (error) {
		console.error("Database error:", error);
	} finally {
		connection.end();
	}
}

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

export default { query, getOperator };
