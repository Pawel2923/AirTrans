import db from "./db";
import config from "../config";
import helper from "../helper";
import { ResultSetHeader } from "mysql2";
import { Err, Contact_info } from "../Types";

async function get(
	page = 1,
	limit = config.listPerPage,
	filter?: string,
	sort?: string
) {
	if (page < 1 || limit < 1) {
		const error = new Err("Invalid page or limit number");
		error.statusCode = 400;
		throw error;
	}

	const offset = helper.getOffset(page, limit);

	const { query, queryParams } = helper.buildQuery("Contact_info", offset, limit, filter, sort);

	const rows = await db.query(query, queryParams);
	const data = helper.emptyOrRows(rows) as Contact_info[];

	if (data.length === 0) {
		const error = new Err("No contact info found");
		error.statusCode = 404;
		throw error;
	}

	const pages = await helper.getPages("Airplanes", limit);

	const meta = { page, pages };

	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

async function update(name: string, info: Contact_info) {
	const contactInfoExists = await db.query(
		"SELECT '' FROM Contact_info WHERE name = ?",
		[name]
	);
	const infoExists = helper.emptyOrRows(contactInfoExists).length === 0;

	if (infoExists) {
		const error = new Err("Contact info not found");
		error.statusCode = 404;
		throw error;
	}
	let result = await db.query("UPDATE Contact_info SET ? WHERE name = ?", [
		info,
		name,
	]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Could not update contact info");
	}

	return {
		data: { name, info },
		message: "Successfully updated contact info",
	};
}

export default {
	get,
	update,
};
