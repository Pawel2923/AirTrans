const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const announcementProperties = [
	"Title",
	"Content",
	"Valid_until",
	"Personnel_id",
];

function validateAnnouncement(announcement) {
	// check if all required properties are present
	helper.checkObject(announcement, announcementProperties);

	const datetimeRegex =
		/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

	// check if Valid_until is in correct format
	if (!datetimeRegex.test(announcement.Valid_until)) {
		const error = new Error("Valid_until property invalid format");
		error.statusCode = 400;
		throw error;
	}

	// check if Valid_until is greater than current date
	const currentDate = new Date();
	const validUntilDate = new Date(announcement.Valid_until);
	if (validUntilDate < currentDate) {
		const error = new Error(
			"Valid_until date should be greater than current date"
		);
		error.statusCode = 400;
		throw error;
	}
}

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
		"Announcements",
		filter,
		sort,
		offset,
		limit
	);

	const rows = await db.query(query, queryParams);
	const data = helper.emptyOrRows(rows);

	if (data.length === 0) {
		const error = new Error("No announcements found");
		error.statusCode = 404;
		throw error;
	}

	const pages = await helper.getPages("Announcements", limit);

	const meta = {
		page,
		pages,
	};

	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

async function create(announcement) {
	validateAnnouncement(announcement);

	const announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[id]
	);

	if (announcementExists.length > 0) {
		const error = new Error("Announcement with this id already exists");
		error.statusCode = 409;
		throw error;
	}

	const result = await db.query(
		"INSERT INTO Announcements SET ?",
		announcement
	);

	if (result.affectedRows === 0) {
		throw new Error("Failed to create announcement");
	}

	return {
		data: announcement,
		message: "Successfully created announcement",
	};
}

async function update(id, announcement) {
	validateAnnouncement(announcement);

	const announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[id]
	);

	if (announcementExists.length === 0) {
		const error = new Error("Announcement with this id does not exist");
		error.statusCode = 404;
		throw error;
	}

	const result = await db.query("UPDATE Announcements SET ? WHERE Id=?", [
		{
			...announcement,
			Id: announcement.Id || id,
		},
		id,
	]);

	if (result.affectedRows === 0) {
		throw new Error("Failed to update announcement");
	}

	return {
		data: announcement,
		message: "Successfully updated announcement",
	};
}

async function remove(id) {
	const announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[id]
	);

	if (announcementExists.length === 0) {
		const error = new Error("Announcement with this id does not exist");
		error.statusCode = 404;
		throw error;
	}

	const result = await db.query("DELETE FROM Announcements WHERE Id=?", [id]);

	if (result.affectedRows === 0) {
		throw new Error("Failed to delete announcement");
	}

	return "Successfully deleted announcement";
}

module.exports = {
	get,
	create,
	update,
	remove,
};
