const db = require("./db");
const config = require("../config");
const helper = require("../helper");

async function get(
	page = 1,
	limit = config.listPerPage,
	filter = undefined,
	sort = undefined
) {
	limit = parseInt(limit);
	page = parseInt(page);
	if (page < 1 || limit < 1) {
		const error = new Error("Invalid page or limit number");
		error.statusCode = 400;
		throw error;
	}

	const offset = helper.getOffset(page, limit);

	const { query, queryParams } = helper.buildQuery(
		"Contact_info",
		filter,
		sort,
		offset,
		limit
	);

	const rows = await db.query(query, queryParams);
	const data = helper.emptyOrRows(rows);

	if (data.length === 0) {
		const error = new Error("No contact info found");
		error.statusCode = 404;
		throw error;
	}

	const pages = await helper.getPages("Airplane", limit);

	const meta = { page, pages };

	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

async function update(name, info) {
	const contactInfoExists = await db.query(
		"SELECT '' FROM Contact_info WHERE name = ?",
		[name]
	);

	if (contactInfoExists.length === 0) {
		const error = new Error("Contact info not found");
		error.statusCode = 404;
		throw error;
	}

	const result = await db.query(
		"UPDATE Contact_info SET info = ? WHERE name = ?",
		[info, name]
	);

	if (result.affectedRows === 0) {
		throw new Error("Could not update contact info");
	}

	return {
		data: { name, info },
		message: "Successfully updated contact info",
	};
}

module.exports = {
	get,
	update,
};
