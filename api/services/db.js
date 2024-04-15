const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
	const connection = await mysql.createConnection(config.db);
    connection.connect();

	const [results] = await connection.execute(sql, params, (err, results) => {
        if (err) {
            throw new Error({ message: err.message, statusCode: 500 });
        }
        return results;
    });

    connection.end();
    return results;
}

module.exports = { query };