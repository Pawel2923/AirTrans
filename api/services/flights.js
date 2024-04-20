const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const flightProperties = [
	"id",
	"status",
	"airlineName",
	"destination",
	"arrival",
	"departure",
	"airplaneSerialNo",
];

async function getAll(
	page = 1,
	limit = config.listPerPage,
	tableName = "Flight"
) {
	limit = parseInt(limit);
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query("SELECT * FROM ?? LIMIT ?,?", [
		tableName,
		offset,
		limit,
	]);
	const data = helper.emptyOrRows(rows);

	const pages = await helper.getPages(tableName, limit);

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

async function getByDepartureOrArrival(limit = 5, page = 1) {
	limit = parseInt(limit);
	const offset = helper.getOffset(page, limit);
	const rows = await db.query(
		"(SELECT * FROM ArrDepTable WHERE is_departure=1 ORDER BY departure LIMIT ?,?) UNION (SELECT * FROM ArrDepTable WHERE is_departure=0 ORDER BY arrival LIMIT ?,?)",
		[offset, limit, offset, limit]
	);
	const data = helper.emptyOrRows(rows);

	const pages = await helper.getPages("ArrDepTable", limit);

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

async function getById(id, tableName = "Flight") {
	const rows = await db.query("SELECT * FROM ?? WHERE id=?", [tableName, id]);
	const data = helper.emptyOrRows(rows);

	if (data.length === 0) {
		throw new Error(
			JSON.stringify({
				statusMessage: `Flight with id ${id} not found`,
				statusCode: 404,
			})
		);
	}

	return {
		data,
		response: { message: "Successfully fetched data", statusCode: 200 },
	};
}

async function create(flight) {
	flightProperties.forEach((property) => {
		if (property in flight === false) {
			throw new Error(
				JSON.stringify({
					statusMessage: `${property} property is missing`,
					statusCode: 400,
				})
			);
		}
	});

	for (const [key, value] of Object.entries(flight)) {
		if (value === null || value === "") {
			throw new Error(
				JSON.stringify({
					message: `${key} is empty`,
					statusCode: 400,
				})
			);
		}
	}

	const flightExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) flight_exists FROM Flight WHERE id=?",
		[flight.id]
	);

	if (flightExists[0].flight_exists) {
		throw new Error(
			JSON.stringify({
				statusMessage: "Flight with this id already exists",
				statusCode: 409,
			})
		);
	}

	const datetimeRegex =
		/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

	if (!datetimeRegex.test(flight.arrival)) {
		throw new Error(
			JSON.stringify({
				statusMessage: "Arrival property invalid format",
				statusCode: 400,
			})
		);
	}

	if (!datetimeRegex.test(flight.departure)) {
		throw new Error(
			JSON.stringify({
				statusMessage: "Departure property invalid format",
				statusCode: 400,
			})
		);
	}

	const airplaneSerialNoExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) serial_no_exists FROM Airplane WHERE Serial_no=?",
		[flight.airplaneSerialNo]
	);
	
	if (!airplaneSerialNoExists[0].serial_no_exists) {
		throw new Error(
			JSON.stringify({
				statusMessage: "Airplane with this serial number does not exist",
				statusCode: 404,
			})
		);
	}

	const result = await db.query(
		"INSERT INTO Flight VALUES (?, ?, ?, ?, ?, ?, ?)",
		[
			flight.id,
			flight.status,
			flight.airlineName,
			flight.destination,
			flight.arrival,
			flight.departure,
			flight.airplaneSerialNo,
		]
	);

	let message;
	let statusCode;

	if (result.affectedRows) {
		message = "Flight created successfully";
		statusCode = 201;
	} else {
		throw new Error(
			JSON.stringify({
				statusMessage: "Flight could not be created",
				statusCode: 500,
			})
		);
	}

	return { message, statusCode };
}

module.exports = {
	getAll,
	getByDepartureOrArrival,
	getById,
	create,
};
