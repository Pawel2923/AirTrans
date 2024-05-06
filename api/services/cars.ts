import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Car, Err } from "../Types";

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

	const data = helper.emptyOrRows(rows) as Car[];

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

	const data = helper.emptyOrRows(row) as Car[];

	if (!data) {
		return {
			data: null,
			response: {
				message: `Car with ID ${carId} not found`,
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

	const data = helper.emptyOrRows(row) as Car[];

	if (!data) {
		return {
			data: null,
			response: {
				message: `Car with ID ${carId} not found`,
				statusCode: 404,
			},
		};
	}

	return {
		data: data[0], // Bez konwersji, zwracamy pierwszy rekord
		response: {
			message: `Successfully fetched car with ID ${carId}`,
			statusCode: 200,
		},
	};
}

async function create(car: Car) {
	const { Id, ...carWithoutId } = car;

	try {
		await validateCar(carWithoutId);

		let carExists = await db.query(
			"SELECT * FROM Cars WHERE License_plate=?",
			[carWithoutId.License_plate]
		);
        carExists = helper.emptyOrRows(carExists);

		if (carExists.length > 0) {
			const error = new Err(
				"Auto o podanym numerze rejestracyjnym już istnieje!"
			);
			error.statusCode = 409;
			throw error;
		}

		// Insert the new car into the database
		let result = await db.query(
			"INSERT INTO Cars (Brand, Model, Price_per_day, Production_year, License_plate, Fuel_type, Transmission_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[
				carWithoutId.Brand,
				carWithoutId.Model,
				carWithoutId.Price_per_day,
				carWithoutId.Production_year,
				carWithoutId.License_plate,
				carWithoutId.Fuel_type,
				carWithoutId.Transmission_type,
			]
		);
        result = result as ResultSetHeader;

		if (result.affectedRows) {
			return {
				data: carWithoutId,
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

async function validateCar(car: Car) {
	if (
		!car.Brand ||
		!car.Model ||
		!car.Price_per_day ||
		!car.Production_year ||
		!car.License_plate ||
		!car.Fuel_type ||
		!car.Transmission_type
	) {
		const error = new Err("Brak wymaganych pól!");
		error.statusCode = 400;
		throw error;
	}
}
async function update(carId: number, car: Car) {
	try {
		car.Id = carId;

		await validateCar(car);

		let carExists = await db.query("SELECT '' FROM Cars WHERE Id=?", [
			car.Id,
		]);
        carExists = helper.emptyOrRows(carExists);

		if (carExists.length === 0) {
			const error = new Err("Samochód o podanym Id nie istnieje");
			error.statusCode = 404;
			throw error;
		}

		let result = await db.query(
			"UPDATE Cars SET Brand=?, Model=?, Price_per_day=?, Production_year=?, License_plate=?, Fuel_type=?, Transmission_type=? WHERE Id=?",
			[
				car.Brand,
				car.Model,
				car.Price_per_day,
				car.Production_year,
				car.License_plate,
				car.Fuel_type,
				car.Transmission_type,
				car.Id,
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
	try {
		let carExists = await db.query("SELECT '' FROM Cars WHERE Id=?", [id]);
        carExists = helper.emptyOrRows(carExists);

		if (carExists.length === 0) {
			const error = new Err("Samochód o podanym Id nie istnieje");
			error.statusCode = 404;
			throw error;
		}

		let result = await db.query("DELETE FROM Cars WHERE Id=?", [id]);
        result = result as ResultSetHeader;

		if (result.affectedRows === 0) {
			throw new Err("Samochód nie został usunięty");
		}

		return {
			message: "Samochód usunięty pomyślnie",
			statusCode: 201,
		};
	} catch (error) {
		throw error;
	}
}

export default {
	getAllCars,
	getOneCar,
	create,
	update,
	remove,
	getById,
};
