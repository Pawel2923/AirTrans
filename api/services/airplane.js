const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const airplaneProperties = [
	"Serial_no",
	"Model",
	"Type",
	"Production_year",
	"Num_of_seats",
	"Fuel_tank",
	"Fuel_quant",
	"Crew_size",
	"Max_cargo",
];

function validateAirplane(airplane) {
	helper.checkObject(airplane, airplaneProperties);
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
		"Airplane",
		filter,
		sort,
		offset,
		limit
	);

	const rows = await db.query(query, queryParams);
	const data = helper.emptyOrRows(rows);

	if (data.length === 0) {
		const error = new Error("No airplanes found");
		error.statusCode = 404;
		throw error;
	}

	const pages = await helper.getPages("Airplane", limit);

	const meta = { page, pages };

	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

async function create(airplane) {
	validateAirplane(airplane);

	const airplaneExists = await db.query(
		"SELECT '' FROM Airplane WHERE Serial_no = ?",
		[airplane.Serial_no]
	);

	if (airplaneExists.length > 0) {
		const error = new Error(
			"Airplane with this serial number already exists"
		);
		error.statusCode = 409;
		throw error;
	}

	const result = await db.query(
		"INSERT INTO Airplane VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			airplane.Serial_no,
			airplane.Model,
			airplane.Type,
			airplane.Production_year,
			airplane.Num_of_seats,
			airplane.Fuel_tank,
			airplane.Fuel_quant,
			airplane.Crew_size,
			airplane.Max_cargo,
		]
	);

	if (result.affectedRows === 0) {
		throw new Error("Could not create airplane");
	}

	return {
		data: airplane,
		message: "Successfully created airplane",
	};
}

async function update(serial_no, airplane) {
	validateAirplane(airplane);

	const airplaneExists = await db.query(
		"SELECT '' FROM Airplane WHERE Serial_no = ?",
		[serial_no]
	);

	if (airplaneExists.length === 0) {
		const error = new Error("Airplane not found");
		error.statusCode = 404;
		throw error;
	}

	const result = await db.query(
		"UPDATE Airplane SET Model = ?, Type = ?, Production_year = ?, Num_of_seats = ?, Fuel_tank = ?, Fuel_quant = ?, Crew_size = ?, Max_cargo = ? WHERE Serial_no = ?",
		[
			airplane.Model,
			airplane.Type,
			airplane.Production_year,
			airplane.Num_of_seats,
			airplane.Fuel_tank,
			airplane.Fuel_quant,
			airplane.Crew_size,
			airplane.Max_cargo,
			serial_no,
		]
	);

	if (result.affectedRows === 0) {
		throw new Error("Could not update airplane");
	}

	return {
		data: airplane,
		message: "Successfully updated airplane",
	};
}

async function remove(serial_no) {
	const airplaneExists = await db.query(
		"SELECT '' FROM Airplane WHERE Serial_no = ?",
		[serial_no]
	);

	if (airplaneExists.length === 0) {
		const error = new Error("Airplane not found");
		error.statusCode = 404;
		throw error;
	}

	const rows = await db.query("DELETE FROM Airplane WHERE Serial_no = ?", [
		serial_no,
	]);

	if (rows.affectedRows === 0) {
		throw new Error("Could not delete airplane");
	}

	return "Successfully deleted airplane";
}

module.exports = {
	get,
	create,
	update,
	remove,
};
