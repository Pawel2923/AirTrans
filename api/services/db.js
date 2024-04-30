const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
	const connection = await mysql.createConnection(config.db);
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

function getOperator(operator) {
	const validOperators = ["=", "<>", "<", ">", "<=", ">=", "LIKE"];
	if (validOperators.includes(operator)) {
		return operator;
	}

	return "=";
}

module.exports = { query, getOperator };
