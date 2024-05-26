import db from "./db";
import helper from "../helper";
import { Err } from "../Types";

const employeesColumns = [
    "id",
    "role",
    "Gates_id",
    "Flight_id",
    "Users_id",
];

async function getEmployees(
	id?: number,
	limit?: number,
	page?: number,
	column?: string,
	sort?: string
) {
	const queryParams: any[] = [];
	const meta: any = undefined;
    const response: any = {};

	// Build query
	let query: string = "";
	if (column) {
		if (!employeesColumns.includes(column)) {
            const error = new Err("Invalid column name");
            error.statusCode = 400;
            throw error;
        }

        query = "SELECT ?? FROM Employees";
		queryParams.push(column);
	} else {
		query = "SELECT * FROM Employees";
	}

	if (id) {
		query += ` WHERE Users_id = ?`;
		queryParams.push(id);
	}

	if (sort) {
		const parsedSort = JSON.parse(sort) as {
			by: string | string[];
			order?: string;
		};

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

	if (page && limit) {
		const offset = helper.getOffset(page, limit);

		query += ` LIMIT ? OFFSET ?`;
		queryParams.push(limit, offset);

		meta.page = page;
		meta.pages = helper.getPages("Employees", limit);
        response.meta = meta;
	}

	// Execute query
	const result = await db.query(query, queryParams);
	const data = helper.emptyOrRows(result);

	// check if data is empty
	if (data.length === 0) {
		const error = new Err(
			id ? "Employee not found" : "No employees found"
		);
		error.statusCode = 404;
		throw error;
	}

    response.data = data;
    response.message = id ? "Successfully fetched employee" : "Successfully fetched employees";

    return response;
}

export default {
	getEmployees,
};
