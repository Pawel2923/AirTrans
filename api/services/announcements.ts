import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Announcements, Err } from "../Types";

const announcementProperties = [
	
	"title",
	"content",
	"valid_until",
	"Employee_id",
];

function validateAnnouncement(announcement: Announcements) {
    // check if all required properties are present
    helper.checkObject(announcement, announcementProperties);

    const datetimeRegex =
        /^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

    // check if valid_until is in correct format
    if (!datetimeRegex.test(announcement.valid_until)) {
        const error = new Err("Valid_until property invalid format");
        error.statusCode = 400;
        throw error;
    }

    // check if valid_until is greater than current date
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
function formatDate(dateString: string) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
	const data = helper.emptyOrRows(rows).map((row) => ({
		...row,
		valid_until: formatDate(row.valid_until),
	}));

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
async function getById(id: number) {
	let row = await db.query("SELECT * FROM Announcements WHERE id=?", [id]);
	row = helper.emptyOrRows(row);

	if (row.length === 0) {
		const error = new Err("Announcements with this id does not exist");
		error.statusCode = 404;
		throw error;
	}

	return {
		data: row[0],
		message: "Successfully fetched announcement",
	};
}

async function create(announcement: Announcements) {
	validateAnnouncement(announcement);


	let announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[announcement.id]
	);
	announcementExists = helper.emptyOrRows(announcementExists);

	if (announcementExists.length > 0) {
		const error = new Err("Announcements with this id already exists");
		error.statusCode = 409;
		throw error;
	}

	let result = await db.query(
		"INSERT INTO Announcements (title, content, valid_until, Employee_id) VALUES (?, ?, ?, ?)",
		[
			
			announcement.title,
			announcement.content,
			announcement.valid_until,
			announcement.Employee_id,
		
		]
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

async function update(id: number, announcement: Announcements) {
	validateAnnouncement(announcement);

	let announcementExists = await db.query(
		"SELECT '' FROM Announcements WHERE id=?",
		[id]
	);
	announcementExists = helper.emptyOrRows(announcementExists);

	if (announcementExists.length === 0) {
		const error = new Err("Announcements with this id does not exist");
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
		const error = new Err("Announcements with this id does not exist");
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
	getById,
	create,
	update,
	remove,
};
