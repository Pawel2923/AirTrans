const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT id, title, content, valid_until, personnel_id FROM Announcements LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);

	const allAnnouncements = await db.query(
		"SELECT COUNT(*) announcementCount FROM Announcements"
	);

	const meta = {
		page,
		pages: Math.ceil(
			allAnnouncements[0].announcementCount / config.listPerPage
		),
	};

	return {
		data,
		meta,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}

module.exports = { getAll };
