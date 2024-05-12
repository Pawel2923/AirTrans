import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err, Cars } from "../Types";
import { ResultSetHeader } from "mysql2";

async function getAllCars(
	page = 1,
	limit = config.listPerPage,
	tableName = "Cars"
) {
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
async function getOneCar(carId: number, tableName = "Cars") {
	const row = await db.query("SELECT * FROM ?? WHERE Id = ?", [
		tableName,
		carId,
	]);

	const data = helper.emptyOrRows(row);

	if (!data) {
		return {
			data: null,
			response: {
				message: `Cars with ID ${carId} not found`,
				statusCode: 404,
			},
		};
	}

	return {
		data,
		response: {
			message: `Successfully fetched car with ID ${carId}`,
			statusCode: 200,
		},
	};
}
async function getById(carId: number, tableName = "Cars") {
	const row = await db.query("SELECT * FROM ?? WHERE Id = ?", [
		tableName,
		carId,
	]);

	const data = helper.emptyOrRows(row);

	if (!data) {
		return {
			data: null,
			response: {
				message: `Cars with ID ${carId} not found`,
				statusCode: 404,
			},
		};
	}
}

async function create(car: Cars) {
	try {
		await validateCar(car);

		const carExists = await db.query(
			"SELECT * FROM Cars WHERE License_plate=?",
			[car.license_plate]
		);

		if (helper.emptyOrRows(carExists).length > 0) {
			const error = new Err(
				"Auto o podanym numerze rejestracyjnym już istnieje!"
			);
			error.statusCode = 409;
			throw error;
		}

		// Insert the new car into the database
		let result = await db.query(
			"INSERT INTO Cars (brand, model, price_per_day, production_year, license_plate, fuel_type, transmission_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[
				car.brand,
				car.model,
				car.price_per_day,
				car.production_year,
				car.license_plate,
				car.fuel_type,
				car.transmission_type,
			]
		);
		result = result as ResultSetHeader;

		if (result.affectedRows) {
			return {
				data: car,
				statusCode: 201,
				message: "Auto zostało dodane!",
			};
		} else {
			throw new Err("Auto nie zostało dodane!");
		}
	} catch (error) {
		throw error;
	}
}

async function validateCar(car: Cars) {
	if (
		!car.brand ||
		!car.model ||
		!car.price_per_day ||
		!car.production_year ||
		!car.license_plate ||
		!car.fuel_type ||
		!car.transmission_type
	) {
		const error = new Err("Brak wymaganych pól!");
		error.statusCode = 400;
		throw error;
	}
}
async function update(carId: number, car: Cars) {
	try {
		car.id = carId;

		await validateCar(car);

		const carExists = await db.query("SELECT * FROM Cars WHERE Id=?", [
			car.id,
		]);

		if (helper.emptyOrRows(carExists).length === 0) {
			const error = new Err("Samochód o podanym Id nie istnieje");
			error.statusCode = 404;
			throw error;
		}

		let result = await db.query(
			"UPDATE Cars SET brand=?, model=?, price_per_day=?, production_year=?, license_plate=?, fuel_type=?, transmission_type=? WHERE id=?",
			[
				car.brand,
				car.model,
				car.price_per_day,
				car.production_year,
				car.license_plate,
				car.fuel_type,
				car.transmission_type,
				car.id,
			]
		);
		result = result as ResultSetHeader;

		if (result.affectedRows) {
			return {
				data: car,
				statusCode: 200,
				message: "Samochód zaktualizowany pomyślnie",
			};
		} else {
			throw new Err("Samochód nie mógł zostać zaktualizowany");
		}
	} catch (error) {
		throw error;
	}
}

async function remove(id: number) {
	const carExists = await db.query("SELECT * FROM Cars WHERE Id=?", [id]);

	if (helper.emptyOrRows(carExists).length === 0) {
		const error = new Err("Samochód o podanym Id nie istnieje");
		error.statusCode = 404;
		throw error;
	}

	let rows = await db.query("DELETE FROM Cars WHERE Id=?", [id]);
	rows = rows as ResultSetHeader;

	if (rows.affectedRows === 0) {
		throw new Err("Samochód nie został usunięty");
	}

	return {
		message: "Samochód usunięty pomyślnie",
		statusCode: 201,
	};
}

export default {
	getAllCars,
	getOneCar,
	create,
	update,
	remove,
	getById,
};
