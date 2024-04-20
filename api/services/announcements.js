const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		"SELECT * FROM Announcements LIMIT ?,?",
		[offset, config.listPerPage]
	);
	const data = helper.emptyOrRows(rows);

	const pages = await helper.getPages("Announcements", config.listPerPage);

	const meta = {
		page,
		pages,
	};

	return {
		data,
		meta,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}

module.exports = { getAll };
