const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// Function to validate flight details
async function validateFlight(flight) {
	// Check if all required properties are present in the flight object
	helper.checkObject(flight, [
		"Id",
		"Status",
		"Airline_name",
		"Destination",
		"Arrival",
		"Departure",
		"Airplane_serial_no",
	]);

	// Regular expression to validate date and time format
	const datetimeRegex =
		/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

	// Validate Arrival and Departure date and time format
	if (!datetimeRegex.test(flight.Arrival)) {
		const error = new Error("Arrival property invalid format");
		error.statusCode = 400;
		throw error;
	}

	if (!datetimeRegex.test(flight.Departure)) {
		const error = new Error("Departure property invalid format");
		error.statusCode = 400;
		throw error;
	}

	// Check if airplane with given serial number exists
	const airplaneSerialNoExists = await db.query(
		"SELECT '' FROM Airplane WHERE Serial_no=?",
		[flight.Airplane_serial_no]
	);

	if (airplaneSerialNoExists.length === 0) {
		const error = new Error(
			"Airplane with this serial number does not exist"
		);
		error.statusCode = 404;
		throw error;
	}
}

// Function to get flights with optional filter and sort parameters
async function get(
	page = 1,
	limit = config.listPerPage,
	filter = undefined,
	sort = undefined
) {
	// Parse page and limit to integer
	page = parseInt(page);
	limit = parseInt(limit);

	// Check if page and limit are valid
	if (page < 1 || limit < 1) {
		const error = new Error("Invalid page or limit number");
		error.statusCode = 400;
		throw error;
	}

	// Get offset for pagination
	const offset = helper.getOffset(page, config.listPerPage);

	// Build SQL query with filter, sort, offset and limit parameters
	const { query, queryParams } = helper.buildQuery(
		"Flight",
		filter,
		sort,
		offset,
		limit
	);

	// Execute the query
	const rows = await db.query(query, queryParams);
	const data = helper.emptyOrRows(rows);

	// If no data found, throw an error
	if (data.length === 0) {
		const error = new Error("No flights found");
		error.statusCode = 404;
		throw error;
	}

	// Get total number of pages
	const pages = await helper.getPages("Flight", limit);

	// Prepare meta data for response
	const meta = {
		page,
		pages,
	};

	// Return data, meta data and success message
	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

// Function to get flights by departure or arrival
async function getByDepartureOrArrival(page = 1, limit = 5) {
	// Parse page and limit to integer
	limit = parseInt(limit);
	page = parseInt(page);

	// Get offset for pagination
	const offset = helper.getOffset(page, limit);

	// Execute the query to get flights by departure or arrival
	const rows = await db.query(
		"(SELECT * FROM ArrDepTable WHERE is_departure=1 ORDER BY departure LIMIT ?,?) UNION (SELECT * FROM ArrDepTable WHERE is_departure=0 ORDER BY arrival LIMIT ?,?)",
		[offset, limit, offset, limit]
	);
	const data = helper.emptyOrRows(rows);

	// Get total number of pages
	const pages = await helper.getPages("ArrDepTable", limit);

	// Prepare meta data for response
	const meta = {
		page,
		pages,
	};

	// Return data, meta data and success message
	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

// Function to create a new flight
async function create(flight) {
	// Validate flight details
	await validateFlight(flight);

	// Check if flight with given id already exists
	const flightExists = await db.query("SELECT '' FROM Flight WHERE id=?", [
		flight.id,
	]);

	if (flightExists.length > 0) {
		const error = new Error("Flight with this id already exists");
		error.statusCode = 409;
		throw error;
	}

	// Insert new flight into the database
	const result = await db.query(
		"INSERT INTO Flight VALUES (?, ?, ?, ?, ?, ?, ?)",
		[
			flight.Id,
			flight.Status,
			flight.Airline_name,
			flight.Destination,
			flight.Arrival,
			flight.Departure,
			flight.Airplane_serial_no,
		]
	);

	// If insertion is successful, return success message, else throw an error
	if (result.affectedRows) {
		return {
			data: flight,
			message: "Flight created successfully",
		};
	} else {
		throw new Error("Flight could not be created");
	}
}

// Function to update a flight
async function update(flightId, flight) {
	// Set flight id
	flight.id = flightId;

	// Validate flight details
	await validateFlight(flight);

	// Check if flight with given id exists
	const flightExists = await db.query("SELECT '' FROM Flight WHERE id=?", [
		flight.id,
	]);

	if (flightExists.length === 0) {
		const error = new Error("Flight with this id does not exist");
		error.statusCode = 404;
		throw error;
	}

	// Update flight in the database
	const result = await db.query(
		"UPDATE Flight SET Status=?, Airline_name=?, Destination=?, Arrival=?, Departure=?, Airplane_serial_no=? WHERE id=?",
		[
			flight.Status,
			flight.Airline_name,
			flight.Destination,
			flight.Arrival,
			flight.Departure,
			flight.Airplane_serial_no,
			flight.Id,
		]
	);

	// If update is successful, return success message, else throw an error
	if (result.affectedRows) {
		return {
			data: flight,
			message: "Flight updated successfully",
		};
	} else {
		throw new Error("Flight could not be updated");
	}
}

// Function to delete a flight
async function remove(id) {
	// Check if flight with given id exists
	const flightExists = await db.query("SELECT '' FROM Flight WHERE id=?", [
		id,
	]);

	if (flightExists.length === 0) {
		const error = new Error("Flight with this id does not exist");
		error.statusCode = 404;
		throw error;
	}

	// Delete flight from the database
	const result = await db.query("DELETE FROM Flight WHERE id=?", [id]);

	// If deletion is successful, return success message, else throw an error
	if (result.affectedRows === 0) {
		throw new Error("Flight could not be deleted");
	}

	return "Flight deleted successfully";
}

// Search flight by term
async function search(
	term,
	page = 1,
	limit = config.listPerPage,
	filter = undefined,
	sort = undefined
) {
	// Parse page and limit to integer
	page = parseInt(page);
	limit = parseInt(limit);

	// Check if search term is provided
	if (!term) {
		const error = new Error("Search term is required");
		error.statusCode = 400;
		throw error;
	}

	// Check if page and limit are valid
	if (page < 1 || limit < 1) {
		const error = new Error("Invalid page or limit number");
		error.statusCode = 400;
		throw error;
	}

	// Get offset for pagination
	const offset = helper.getOffset(page, limit);

	const search = { query: "", queryParams: [] };
	// Search query
	search.query =
		" WHERE (id LIKE ? OR Status LIKE ? OR Airline_name LIKE ? OR Destination LIKE ? OR Arrival LIKE ? OR Departure LIKE ? OR Airplane_serial_no LIKE ?)";
	// Add search term to the query parameters
	search.queryParams = Array(7).fill(`%${term}%`);

	// Build SQL query with filter, sort, offset and limit parameters
	const { query: query, queryParams } = helper.buildQuery(
		"Flight",
		filter,
		sort,
		offset,
		limit,
		search
	);

	console.log(query, queryParams);

	// Execute the search query
	const result = await db.query(query, queryParams);
	const data = helper.emptyOrRows(result);

	// If no data found, throw an error
	if (data.length === 0) {
		const error = new Error("No flights found");
		error.statusCode = 404;
		throw error;
	}

	// Get pages count from the data length
	const pages = Math.ceil(data.length / limit);

	// Prepare meta data for response
	const meta = {
		page,
		pages,
		total: data.length,
	};

	// Return data and success message
	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

// Exporting functions for external use
module.exports = {
	get,
	getByDepartureOrArrival,
	create,
	update,
	remove,
	search,
};
