import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err } from "../Types";

async function get(
	page = 1,
	limit = config.listPerPage,
	filter?: string,
	sort?: string
) {
	const offset = helper.getOffset(page, limit);

	// Build query
	let query = "SELECT u.uid, u.email, u.first_name, u.last_name, u.phone_number, u.address, u.gender, u.birth_date, u.create_time, e.role FROM Employees e RIGHT JOIN Users u ON e.Users_uid=u.uid";
	let queryParams = [];

	// Check if filter is provided
	if (filter) {
		const filterQuery = helper.buildFilterQuery(filter);
		query += filterQuery.query;
		filterQuery.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	// Check if sort is provided
	if (sort) {
		const sortQuery = helper.buildSortQuery(sort);
		query += sortQuery.query;
		sortQuery.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	// Add limit and offset
	query += ` LIMIT ? OFFSET ?`;
	queryParams.push(limit, offset);

	// Execute query
	const result = await db.query(query, queryParams);
	const data = helper.emptyOrRows(result);

	// check if data is empty
	if (data.length === 0) {
		throw new Err("No users found", 404);
	}

	// Get total pages
	const pages = await helper.getPages("Users", limit);

	// Generate meta data
	const meta = { page, pages, limit, total: data.length };

    return {
		data,
		meta,
		message: "Successfully fetched users",
	};
}

export default {
	get,
};
