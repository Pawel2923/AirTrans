const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const announcementProperties = [
	"title",
	"content",
	"validUntil",
	"personnelId",
];

function validateAnnouncement(announcement) {
	// check if all required properties are present
	helper.checkObject(announcement, announcementProperties);

	const datetimeRegex =
		/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

	// check if validUntil is in correct format
	if (!datetimeRegex.test(announcement.validUntil)) {
		throw new Error(
			JSON.stringify({
				message: "validUntil property invalid format",
				statusCode: 400,
			})
		);
	}

	// check if validUntil is greater than current date
	const currentDate = new Date();
	const validUntilDate = new Date(announcement.validUntil);
	if (validUntilDate < currentDate) {
		throw new Error(
			JSON.stringify({
				message:
					"validUntil date should be greater than current date",
				statusCode: 400,
			})
		);
	}
}

async function getAll(page = 1, limit = config.listPerPage) {
	limit = parseInt(limit);
	page = parseInt(page);
	const offset = helper.getOffset(page, limit);
	const rows = await db.query("SELECT * FROM Announcements LIMIT ?,?", [
		offset,
		limit,
	]);
	const data = helper.emptyOrRows(rows);

	const pages = await helper.getPages("Announcements", limit);

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

	if (data.length === 0) {
		throw new Error(
			JSON.stringify({
				message: "Announcement not found",
				statusCode: 404,
			})
		);
	}

	return {
		data,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}

async function create(announcement) {
	validateAnnouncement(announcement);

	const announcementExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) result FROM Announcements WHERE id=?",
		[id]
	);

	if (announcementExists[0].result) {
		throw new Error(
			JSON.stringify({
				message: "Announcement with this id already exists",
				statusCode: 409,
			})
		);
	}

	const result = await db.query("INSERT INTO Announcements SET ?", [
		{
			Id: announcement.id ? announcement.id : null,
			Title: announcement.title,
			Content: announcement.content,
			Valid_until: announcement.validUntil,
			Personnel_id: announcement.personnelId,
		},
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

	const announcementExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) result FROM Announcements WHERE id=?",
		[id]
	);

	if (!announcementExists[0].result) {
		throw new Error(
			JSON.stringify({
				message: "Announcement with this id does not exist",
				statusCode: 404,
			})
		);
	}

	const result = await db.query("UPDATE Announcements SET ? WHERE id=?", [
		{
			Id: announcement.id ? announcement.id : id,
			Title: announcement.title,
			Content: announcement.content,
			Valid_until: announcement.validUntil,
			Personnel_id: announcement.personnelId,
		},
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
	const announcementExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) result FROM Announcements WHERE id=?",
		[id]
	);

	if (!announcementExists[0].result) {
		throw new Error(
			JSON.stringify({
				message: "Announcement with this id does not exist",
				statusCode: 404,
			})
		);
	}

	const result = await db.query("DELETE FROM Announcements WHERE id=?", [id]);

	if (result.affectedRows) {
		return {
			message: "Successfully deleted announcement",
			statusCode: 200,
		};
	} else {
		throw new Error(
			JSON.stringify({
				message: "Announcement could not be deleted",
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
