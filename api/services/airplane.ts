import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Airplanes, Err } from "../Types";

const airplaneProperties = [
	"serial_no",
	"model",
	"type",
	"production_year",
	"num_of_seats",
	"fuel_tank",
	"fuel_quant",
	"crew_size",
	"max_cargo",
];

function validateAirplane(airplane: Airplanes) {
	helper.checkObject(airplane, airplaneProperties);
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

	const { query, queryParams } = helper.buildQuery("Airplanes", offset, limit, filter, sort);

	const rows = await db.query(query, queryParams);
	const data = helper.emptyOrRows(rows) as Airplanes[];

	if (data.length === 0) {
		const error = new Err("No airplanes found");
		error.statusCode = 404;
		throw error;
	}

	const pages = await helper.getPages("Airplanes", limit);

	const meta = { page, pages };

	return {
		data,
		meta,
		message: "Successfully fetched data",
	};
}

async function getSerialNumbers() {
	const rows = await db.query("SELECT DISTINCT serial_no FROM Airplanes");
	let data = helper.emptyOrRows(rows);

	data = data.map((row: Airplanes) => row.serial_no);

	if (data.length === 0) {
		const error = new Err("No airplane serial numbers found");
		error.statusCode = 404;
		throw error;
	}

	return {
		data,
		message: "Successfully fetched airplane serial numbers",
	};
}

async function create(airplane: Airplanes) {
	validateAirplane(airplane);

	let airplaneExists = await db.query(
		"SELECT '' FROM Airplanes WHERE serial_no = ?",
		[airplane.serial_no]
	);
	airplaneExists = helper.emptyOrRows(airplaneExists);

	if (airplaneExists.length > 0) {
		const error = new Err(
			"Airplanes with this serial number already exists"
		);
		error.statusCode = 409;
		throw error;
	}

	let result = await db.query("INSERT INTO Airplanes SET ?", [airplane]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Could not create airplane");
	}

	return {
		data: airplane,
		message: "Successfully created airplane",
	};
}

async function update(serial_no: string, airplane: Airplanes) {
	validateAirplane(airplane);

	let airplaneExists = await db.query(
		"SELECT '' FROM Airplanes WHERE serial_no = ?",
		[serial_no]
	);
	airplaneExists = helper.emptyOrRows(airplaneExists);

	if (airplaneExists.length === 0) {
		const error = new Err("Airplanes not found");
		error.statusCode = 404;
		throw error;
	}

	if (serial_no !== airplane.serial_no) {
		const error = new Err("Serial number cannot be changed");
		error.statusCode = 400;
		throw error;
	}

	let result = await db.query("UPDATE Airplanes SET ? WHERE serial_no = ?", [
		airplane,
		serial_no,
	]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Could not update airplane");
	}

	return {
		data: airplane,
		message: "Successfully updated airplane",
	};
}

async function remove(serial_no: string) {
	let airplaneExists = await db.query(
		"SELECT '' FROM Airplanes WHERE Serial_no = ?",
		[serial_no]
	);
	airplaneExists = helper.emptyOrRows(airplaneExists);

	if (airplaneExists.length === 0) {
		const error = new Err("Airplanes not found");
		error.statusCode = 404;
		throw error;
	}

	let result = await db.query("DELETE FROM Airplanes WHERE Serial_no = ?", [
		serial_no,
	]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Could not delete airplane");
	}

	return "Successfully deleted airplane";
}

export default {
	get,
	getSerialNumbers,
	create,
	update,
	remove,
};
