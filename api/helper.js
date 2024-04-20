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

module.exports = {
	getOffset,
	getPages,
	emptyOrRows,
};
