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

		if (!obj[property as keyof object]) {
			throw new Err(`${property} is empty`, 400);
		}
	});
}

function buildFilterQuery(filter: string) {
	try {
		let query = " WHERE";
		const queryParams: any[] = [];

		const parsedFilter = JSON.parse(filter) as {
			by: string;
			value: string;
			operator?: string;
		}[];

		parsedFilter.forEach((condition) => {
			if (condition.by && condition.value) {
				query += ` ?? ${db.getOperator(condition.operator)} ? AND`;
				queryParams.push(condition.by, condition.value);
			}
		});

		query = query.slice(0, -4); // Remove the last "AND" from the query

		return { query, queryParams };
	} catch (error) {
		throw new Err("Invalid filter query", 400);
	}
}

function buildSortQuery(sort: string) {
	try {
		const parsedSort = JSON.parse(sort) as { by: string; order?: string };

		let query = " ORDER BY ??";
		const queryParams: any[] = [parsedSort.by];

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

		return { query, queryParams };
	} catch (error) {
		throw new Err("Invalid sort query", 400);
	}
}

function buildQuery(
	tableName: string,
	offset: number,
	limit: number,
	filter?: string,
	sort?: string,
	search?: { query: string; queryParams: any[] }
) {
	let query = "SELECT * FROM ??" + (search ? search.query : "");
	const queryParams: any[] = [tableName];

	if (search) {
		search.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	if (filter) {
		const filterQuery = buildFilterQuery(filter);
		query += filterQuery.query;
		filterQuery.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	if (sort) {
		const sortQuery = buildSortQuery(sort);
		query += sortQuery.query;
		sortQuery.queryParams.forEach((param) => {
			queryParams.push(param);
		});
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
	buildFilterQuery,
	buildSortQuery,
	buildQuery,
};
