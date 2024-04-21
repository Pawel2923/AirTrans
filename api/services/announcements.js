const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const announcementProperties = [
	"title",
	"content",
	"valid_until",
	"personnel_id",
];

function validateAnnouncement(announcement) {
	// check if all required properties are present
	helper.checkObject(announcement, announcementProperties);

	const datetimeRegex =
		/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

	// check if valid_until is in correct format
	if (!datetimeRegex.test(announcement.valid_until)) {
		throw new Error(
			JSON.stringify({
				statusMessage: "Valid until property invalid format",
				statusCode: 400,
			})
		);
	}

	// check if valid_until is greater than current date
	const currentDate = new Date();
	const validUntilDate = new Date(announcement.valid_until);
	if (validUntilDate < currentDate) {
		throw new Error(
			JSON.stringify({
				statusMessage:
					"Valid until date should be greater than current date",
				statusCode: 400,
			})
		);
	}
}

async function getAll(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query("SELECT * FROM Announcements LIMIT ?,?", [
		offset,
		config.listPerPage,
	]);
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

async function getById(id) {
	const rows = await db.query("SELECT * FROM Announcements WHERE id=?", [id]);
	const data = helper.emptyOrRows(rows);

	return {
		data,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}

async function create(announcement) {
	validateAnnouncement(announcement);

	const result = await db.query("INSERT INTO Announcements SET=?", [
		announcement,
	]);

	if (result.affectedRows) {
		return {
			message: "Successfully created announcement",
			statusCode: 201,
		};
	} else {
		throw new Error(
			JSON.stringify({
				message: "Failed to create announcement",
				statusCode: 500,
			})
		);
	}
}

async function update(id, announcement) {
	validateAnnouncement(announcement);

	const result = await db.query("UPDATE Announcements SET ? WHERE id=?", [
		announcement,
		id,
	]);

	if (result.affectedRows) {
		return {
			message: "Successfully updated announcement",
			statusCode: 200,
		};
	} else {
		throw new Error(
			JSON.stringify({
				message: "Failed to update announcement",
				statusCode: 500,
			})
		);
	}
}

async function remove(id) {
	const result = await db.query("DELETE FROM Announcements WHERE id=?", [id]);

	if (result.affectedRows) {
		return {
			message: "Successfully deleted announcement",
			statusCode: 200,
		};
	} else {
		throw new Error(
			JSON.stringify({
				message: "Failed to delete announcement",
				statusCode: 500,
			})
		);
	}
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
