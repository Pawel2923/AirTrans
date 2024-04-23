const db = require("./services/db");

function getOffset (currentPage = 1, listPerPage) {
	return (currentPage - 1) * [listPerPage];
}

function emptyOrRows (rows) {
	if (!rows) {
		return [];
	}
	return rows;
}

async function getPages (tableName, limit) {
	const rows = await db.query(`SELECT COUNT(*) count FROM ??`, [tableName]);
	const data = emptyOrRows(rows);

	const count = data[0].count;

	return Math.ceil(count / limit);
}

function checkObject (obj, objectProperties) {
	objectProperties.forEach((property) => {
		if (property in obj === false) {
			throw new Error(
				JSON.stringify({
					statusMessage: `${property} property is missing`,
					statusCode: 400,
				})
			);
		}
	});

	for (const [key, value] of Object.entries(obj)) {
		if (value === null || value === "") {
			throw new Error(
				JSON.stringify({
					message: `${key} is empty`,
					statusCode: 400,
				})
			);
		}
	}
}

module.exports = {
	getOffset,
	getPages,
	emptyOrRows,
	checkObject,
};
