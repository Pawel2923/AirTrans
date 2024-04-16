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

async function getAll(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT * FROM Flight LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);

	const allFlights = await db.query(
		"SELECT COUNT(*) flightCount FROM Flight"
	);

	const meta = {
		page,
		pages: Math.ceil(allFlights[0].flightCount / config.listPerPage),
	};

	return {
		data,
		meta,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}

async function getArrDep() {
	const rows = await db.query(`
        (SELECT * FROM ArrDepTable WHERE is_departure=1 ORDER BY departure LIMIT 5)
        UNION
        (SELECT * FROM ArrDepTable WHERE is_departure=0 ORDER BY arrival LIMIT 5)
    `);
	const data = helper.emptyOrRows(rows);

	return {
		data,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}

async function getById(id) {
	if (typeof id === "string" && id.length === 0) {
		throw new Error("Id is empty");
	}
	if (id === null) {
		throw new TypeError("Id is null");
	}

	const rows = await db.query("SELECT * FROM ArrDepTable WHERE id=?", [id]);
	const data = helper.emptyOrRows(rows);

	return {
		data,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}

async function create(flight) {
	flightProperties.forEach((property) => {
		if (property in flight === false) {
			throw new Error(`${property} property is missing`);
		}
	});

	for (const [key, value] of Object.entries(flight)) {
		if (value === null || value === "") {
			throw new Error(`${key} is empty`);
		}
	}

	const datetimeRegex =
		/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

	if (!datetimeRegex.test(flight.arrival)) {
		throw new Error("Arrival property invalid format");
	}

	if (!datetimeRegex.test(flight.departure)) {
		throw new Error("Departure property invalid format");
	}

	const rows = await db.query("SELECT Serial_no FROM Airplane");
	const data = helper.emptyOrRows(rows);
	const airplaneSerialNumbers = [];
	data.forEach((row) => {
		airplaneSerialNumbers.push(row.Serial_no);
	});

	if (!airplaneSerialNumbers.includes(flight.airplaneSerialNo)) {
		return {
			message: "Provided airplane serial number does not exist",
			statusCode: 404,
		};
	}

	const result = await db.query(`INSERT INTO Flight VALUES (
        "${flight.id}", 
        "${flight.status}", 
        "${flight.airlineName}", 
        "${flight.destination}", 
        "${flight.arrival}", 
        "${flight.departure}", 
        "${flight.airplaneSerialNo}"
    )`);

	const response = {
		message: "Flight could not be created",
		statusCode: 500,
	};

	if (result.affectedRows) {
		response.message = "Flight created successfully";
		response.statusCode = 201;
	}

	return response;
}

module.exports = {
	getAll,
	getArrDep,
	getById,
	create,
};
