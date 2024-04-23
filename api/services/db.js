const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
	try {
		const connection = await mysql.createConnection(config.db);
		connection.connect();

		const [results] = await connection.query(sql, params);

		connection.end();
		return results;
	} catch (error) {
		throw new Error(JSON.stringify({
            message: error.message,
            statusCode: 500,
        }));
	}
}

module.exports = { query };
