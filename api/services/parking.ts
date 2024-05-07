import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Err } from "../Types";

async function getAllParking(
	page = 1,
	limit = config.listPerPage,
	tableName = "Parking_reservations"
) {
	const offset = helper.getOffset(page, config.listPerPage);

	const rows = await db.query("SELECT * FROM ?? LIMIT ?, ?", [
		tableName,
		offset,
		limit,
	]);

	const data = helper.emptyOrRows(rows).map((row) => ({
		...row,
		Since: formatDate(row.Since),
		Until: formatDate(row.Until),
	}));

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

async function createParking(parkingData: any) {
	try {
		const parkingAvailability = await db.query(
			"SELECT * FROM Parking_reservations WHERE Parking_level = ? AND Space_id = ? AND ((Since <= ? AND Until >= ?) OR (Since <= ? AND Until >= ?) OR (Since >= ? AND Until <= ?))",
			[
				parkingData.Parking_level,
				parkingData.Space_id,
				parkingData.Since,
				parkingData.Since,
				parkingData.Until,
				parkingData.Until,
				parkingData.Since,
				parkingData.Until,
			]
		);
		if (helper.emptyOrRows(parkingAvailability).length > 0) {
			const error = new Err(
				"Parking is already reserved for the given time period"
			);
			error.statusCode = 409;
			throw error;
		}

		let result = await db.query(
			"INSERT INTO Parking_reservations (Client_id, Since, Until, Parking_level, Space_id, License_plate, Price_per_day) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[
				parkingData.Client_id,
				parkingData.Since,
				parkingData.Until,
				parkingData.Parking_level,
				parkingData.Space_id,
				parkingData.License_plate,
				parkingData.Price_per_day,
			]
		);
    result = result as ResultSetHeader;

		if (result.affectedRows) {
			return {
				data: parkingData,
				statusCode: 201,
				message: "Parking reserved successfully",
			};
		} else {
			throw new Err("Failed to reserve parking");
		}
	} catch (error) {
		throw error;
	}
}
async function removeParking(id: number) {
	const parkingExist = await db.query(
		"SELECT * FROM Parking_reservations WHERE id = ?",
		[id]
	);
	if (helper.emptyOrRows(parkingExist).length === 0) {
		const error = new Err("Parking nie istnieje");
		error.statusCode = 404;
		throw error;
	}
	let rows = await db.query(
		"DELETE FROM Parking_reservations WHERE id = ?",
		[id]
	);
  rows = rows as ResultSetHeader;

	if (rows.affectedRows === 0) {
		throw new Err("Parking nie został usunięty");
	}
	return {
		message: "Parking usunięty pomyślnie",
		statusCode: 201,
	};
}
async function getById(parkingId: number, tableName = "Parking_reservations") {
	try {
		const rows = await db.query("SELECT * FROM ?? WHERE id = ?", [
			tableName,
			parkingId,
		]);
		const data = helper.emptyOrRows(rows);
		if (!data) {
			return {
				data: null,
				response: {
					message: `Parking with ID ${parkingId} not found`,
					statusCode: 404,
				},
			};
		}
		return {
			data,
			response: {
				message: `Successfully fetched data for parking with ID ${parkingId}`,
				statusCode: 200,
			},
		};
	} catch (error) {
		throw error;
	}
}

async function updateParking(parkingId: number, parking: any) {
	try {
		parking.Id = parkingId;

		const parkingExist = await db.query(
			"SELECT * FROM Parking_reservations WHERE Id = ?",
			[parking.Id]
		);

		if (helper.emptyOrRows(parkingExist).length === 0) {
			const error = new Err("Parking not found");
			error.statusCode = 404;
			throw error;
		}

		let result = await db.query(
			"UPDATE Parking_reservations SET Client_id=?, Since=?, Until=?, Parking_level=?, Space_id=?, License_plate=?, Price_per_day=? WHERE Id=?",
			[
				parking.Client_id,
				parking.Since,
				parking.Until,
				parking.Parking_level,
				parking.Space_id,
				parking.License_plate,
				parking.Price_per_day,
				parking.Id,
			]
		);
    result = result as ResultSetHeader;

		if (result.affectedRows) {
			return {
				data: parking,
				message: "Parking updated successfully",
				statusCode: 200,
			};
		} else {
			throw new Err("Failed to update parking");
		}
	} catch (error) {
		throw error;
	}
}
export default {
	getAllParking,
	createParking,
	removeParking,
	getById,
	updateParking,
};
