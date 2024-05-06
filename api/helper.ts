import { QueryResult } from "mysql2";
import db from "./services/db";
import { Err } from "./Types";

function getOffset(currentPage = 1, listPerPage: number) {
	return (currentPage - 1) * listPerPage;
}

function emptyOrRows(rows?: QueryResult) {
	if (!rows) {
		return [];
	}
	return rows as any[];
}

async function getPages(tableName: string, limit: number) {
	const rows = await db.query("SELECT COUNT(*) count FROM ??", [tableName]);
	const data = emptyOrRows(rows);

	const count = data[0].count;

	return Math.ceil(count / limit);
}

function checkObject(obj: object, objectProperties: string[]) {
	objectProperties.forEach((property) => {
		if (property in obj === false) {
			throw new Err(`${property} property is missing`, 400);
		}
	});

	for (const [key, value] of Object.entries(obj)) {
		if (value === null || value === "") {
			throw new Err(`${key} is empty`, 400);
		}
	}
}

function buildQuery(tableName: string, offset: number, limit: number, filter?: string, sort?: string, search?: { query: string; queryParams: any[] }) {
	let query = "SELECT * FROM ??" + (search ? search.query : "");
	const queryParams: any[] = [tableName];

	if (search) {
		search.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	if (filter) {
		const parsedFilter = JSON.parse(filter) as { by: string; value: string; operator?: string }[]

		if (parsedFilter && parsedFilter.length > 0) {
			if (!search) {
				query += " WHERE";
			} else {
				query += " AND";
			}
			parsedFilter.forEach((condition) => {
				if (condition.by && condition.value) {
					query += ` ?? ${db.getOperator(condition.operator)} ? AND`;
					queryParams.push(condition.by, condition.value);
				}
			});
			query = query.slice(0, -4); // Remove the last "AND" from the query
		}
	}

	if (sort) {
		const parsedSort = JSON.parse(sort) as { by: string | string[]; order?: string };

		if (Array.isArray(parsedSort.by)) {
			parsedSort.by.forEach((sortBy, index) => {
				if (index === 0) {
					query += " ORDER BY ??";
				} else {
					query += " ??";
				}
				queryParams.push(sortBy);
				if (parsedSort.order && index === parsedSort.by.length - 1) {
					query += ` ${parsedSort.order}`;
				}
				query += ",";
			});
			query = query.slice(0, -1); // Remove the last comma from the query
		} else if (parsedSort.by) {
			query += " ORDER BY ??";
			queryParams.push(parsedSort.by);
			if (parsedSort.order) {
				query += ` ${parsedSort.order}`;
			}
		}
	}

	query += " LIMIT ?,?";
	queryParams.push(offset, limit);

	return { query, queryParams };
}

export default {
	getOffset,
	getPages,
	emptyOrRows,
	checkObject,
	buildQuery,
};
