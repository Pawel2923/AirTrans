import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Announcement, Err } from "../Types";

const announcementProperties = [
	"title",
	"content",
	"valid_until",
	"personnel_id",
];

function validateAnnouncement(announcement: Announcement) {
	// check if all required properties are present
	helper.checkObject(announcement, announcementProperties);

	const datetimeRegex =
		/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

	// check if Valid_until is in correct format
	if (!datetimeRegex.test(announcement.valid_until)) {
		const error = new Err("Valid_until property invalid format");
		error.statusCode = 400;
		throw error;
	}

	// check if Valid_until is greater than current date
	const currentDate = new Date();
	const validUntilDate = new Date(announcement.valid_until);
	if (validUntilDate < currentDate) {
		const error = new Err(
			"Valid_until date should be greater than current date"
		);
		error.statusCode = 400;
		throw error;
	}
}

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

	const { query, queryParams } = helper.buildQuery("Announcements", offset, limit, filter, sort);

	const rows = await db.query(query, queryParams);
	const data = helper.emptyOrRows(rows) as Announcement[];

	if (data.length === 0) {
		const error = new Err("No announcements found");
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

async function create(announcement: Announcement) {
	validateAnnouncement(announcement);

	let announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[announcement.id]
	);
	announcementExists = helper.emptyOrRows(announcementExists);

	if (announcementExists.length > 0) {
		const error = new Err("Announcement with this id already exists");
		error.statusCode = 409;
		throw error;
	}

	let result = await db.query(
		"INSERT INTO Announcements SET ?",
		[announcement]
	);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Failed to create announcement");
	}

	return {
		data: announcement,
		message: "Successfully created announcement",
	};
}

async function update(id: number, announcement: Announcement) {
	validateAnnouncement(announcement);

	let announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[id]
	);
	announcementExists = helper.emptyOrRows(announcementExists);

	if (announcementExists.length === 0) {
		const error = new Err("Announcement with this id does not exist");
		error.statusCode = 404;
		throw error;
	}

	if (id !== announcement.id) {
		const error = new Err("Id in request body does not match id in URL");
		error.statusCode = 400;
		throw error;
	}

	let result = await db.query("UPDATE Announcements SET ? WHERE id=?", [
		{
			...announcement,
			id: announcement.id || id,
		},
		id,
	]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Failed to update announcement");
	}

	return {
		data: announcement,
		message: "Successfully updated announcement",
	};
}

async function remove(id: number) {
	let announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[id]
	);
	announcementExists = helper.emptyOrRows(announcementExists);

	if (announcementExists.length === 0) {
		const error = new Err("Announcement with this id does not exist");
		error.statusCode = 404;
		throw error;
	}

	let result = await db.query("DELETE FROM Announcements WHERE Id=?", [id]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Failed to delete announcement");
	}

	return "Successfully deleted announcement";
}

export default {
	get,
	create,
	update,
	remove,
};
