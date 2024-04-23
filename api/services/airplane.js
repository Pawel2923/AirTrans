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

async function getAll(page = 1, limit = config.listPerPage) {
	limit = parseInt(limit);
	page = parseInt(page);
	const offset = helper.getOffset(page, limit);

	const rows = await db.query("SELECT * FROM Airplane LIMIT ?, ?", [
		offset,
		limit,
	]);
	const data = helper.emptyOrRows(rows);

	const pages = await helper.getPages("Airplane", limit);

	const meta = { page, pages };

	return {
		data,
		meta,
		response: {
			message: "Successfully fetched data",
			statusCode: 200,
		},
	};
}

async function getBySerialNo(serial_no) {
	const rows = await db.query("SELECT * FROM Airplane WHERE Serial_no = ?", [
		serial_no,
	]);
	const data = helper.emptyOrRows(rows);

	if (data.length === 0) {
		throw new Error(
			JSON.stringify({
				message: "Airplane not found",
				statusCode: 404,
			})
		);
	}

	return {
		data,
		response: {
			message: "Successfully fetched data",
			statusCode: 200,
		},
	};
}

async function create(airplane) {
	validateAirplane(airplane);

	const airplaneExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) result FROM Airplane WHERE Serial_no = ?",
		[airplane.Serial_no]
	);

	if (airplaneExists[0].result) {
		throw new Error(
			JSON.stringify({
				message: "Airplane with this serial number already exists",
				statusCode: 409,
			})
		);
	}

	const rows = await db.query(
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

	if (rows.affectedRows === 0) {
		throw new Error(
			JSON.stringify({
				message: "Could not create airplane",
				statusCode: 500,
			})
		);
	}

	return {
		data: airplane,
		response: {
			message: "Successfully created airplane",
			statusCode: 201,
		},
	};
}

async function update(serial_no, airplane) {
	validateAirplane(airplane);

	const airplaneExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) result FROM Airplane WHERE Serial_no = ?",
		[serial_no]
	);

	if (!airplaneExists[0].result) {
		throw new Error(
			JSON.stringify({
				message: "Airplane not found",
				statusCode: 404,
			})
		);
	}

	const rows = await db.query(
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

	if (rows.affectedRows === 0) {
		throw new Error(
			JSON.stringify({
				message: "Could not update airplane",
				statusCode: 500,
			})
		);
	}

	return {
		data: airplane,
		response: {
			message: "Successfully updated airplane",
			statusCode: 200,
		},
	};
}

async function remove(serial_no) {
	const rows = await db.query("DELETE FROM Airplane WHERE Serial_no = ?", [
		serial_no,
	]);

	if (rows.affectedRows === 0) {
		throw new Error(
			JSON.stringify({
				message: "Airplane not found",
				statusCode: 404,
			})
		);
	}

	return {
		response: {
			message: "Successfully deleted airplane",
			statusCode: 200,
		},
	};
}

module.exports = {
	getAll,
	getBySerialNo,
	create,
	update,
	remove,
};
