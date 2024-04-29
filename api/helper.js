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

function buildQuery(tableName, filter, sort, offset, limit, search = undefined) {
	let query = "SELECT * FROM ??" + (search ? search.query : "");
	const queryParams = [tableName];

	if (search) {
		search.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	if (filter) {
		filter = JSON.parse(filter);

		if (filter && filter.length > 0) {
			if (!search) {
				query += " WHERE";
			} else {
				query += " AND";
			}
			filter.forEach((condition) => {
				if (condition.by && condition.value) {
					query += ` ?? ${db.getOperator(condition.operator)} ? AND`;
					queryParams.push(condition.by, condition.value);
				}
			});
			query = query.slice(0, -4); // Remove the last "AND" from the query
		}
	}

	if (sort) {
		sort = JSON.parse(sort);

		if (Array.isArray(sort.by)) {
			sort.by.forEach((sortBy, index) => {
				if (index === 0) {
					query += " ORDER BY ??";
				} else {
					query += " ??";
				}
				queryParams.push(sortBy);
				if (sort.order && index === sort.by.length - 1) {
					query += ` ${sort.order}`;
				}
				query += ",";
			});
			query = query.slice(0, -1); // Remove the last comma from the query
		} else if (sort.by) {
			query += " ORDER BY ??";
			queryParams.push(sort.by);
			if (sort.order) {
				query += ` ${sort.order}`;
			}
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
