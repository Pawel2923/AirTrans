const db = require("./services/db");

function getOffset(currentPage = 1, listPerPage) {
	return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
	if (!rows) {
		return [];
	}
	return rows;
}

async function getPages(tableName, limit) {
	const rows = await db.query("SELECT COUNT(*) count FROM ??", [tableName]);
	const data = emptyOrRows(rows);

	const count = data[0].count;

	return Math.ceil(count / limit);
}

function checkObject(obj, objectProperties) {
	objectProperties.forEach((property) => {
		if (property in obj === false) {
			const error = new Error(`${property} property is missing`);
			error.statusCode = 400;
			throw error;
		}
	});

	for (const [key, value] of Object.entries(obj)) {
		if (value === null || value === "") {
			const error = new Error(`${key} is empty`);
			error.statusCode = 400;
			throw error;
		}
	}
}

function buildQuery(tableName, filter, sort, offset, limit) {
	let query = `SELECT * FROM ??`;
	const queryParams = [tableName];

	if (filter) {
		filter = JSON.parse(filter);

		if (filter.by && filter.value) {
			query += ` WHERE ?? ${db.getOperator(filter.operator)} ?`;
			queryParams.push(filter.by, filter.value);
		}
	}

	if (sort) {
		sort = JSON.parse(sort);

		if (sort.by && sort.order) {
			query += " ORDER BY ?? ??";
			queryParams.push(sort.by, sort.order);
		}
	}

	query += " LIMIT ?,?";
	queryParams.push(offset, limit);

	return { query, queryParams };
}

module.exports = {
	getOffset,
	getPages,
	emptyOrRows,
	checkObject,
	buildQuery,
};
