import db from "./db";
import helper from "../helper";
import config from "../config";
import { Cars } from "../Types";
import { Err } from "../Types";
import { ResultSetHeader } from "mysql2";

async function getAllCars(
  page = 1,
  limit = config.listPerPage,
  
) {
  if (page < 1 || limit < 1) {
    const error = new Err("Invalid page or limit number");
    error.statusCode = 400;
    throw error;
  }
  const offset = helper.getOffset(page, limit);

  const { query, queryParams } = helper.buildQuery(
    "Cars",
    offset,
    limit,
  
  );
  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows) as Cars[];

  if (data.length === 0) {
    const error = new Err("No cars found");
    error.statusCode = 404;
    throw error;
  }

  const pages = await helper.getPages("Cars", limit);

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
async function getAllCar(
  page = 1,
  limit = config.listPerPage,
  
) {
  if (page < 1 || limit < 1) {
    const error = new Err("Invalid page or limit number");
    error.statusCode = 400;
    throw error;
  }
  const offset = helper.getOffset(page, limit);

  const { query, queryParams } = helper.buildQuery(
    "Cars",
    offset,
    limit,
  
  );
  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows) as Cars[];

  if (data.length === 0) {
    const error = new Err("No cars found");
    error.statusCode = 404;
    throw error;
  }

  const pages = await helper.getPages("Cars", limit);

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
async function getById(carId: number) {
  let row = await db.query("SELECT * FROM Cars WHERE Id=?", [carId]);
  row = helper.emptyOrRows(row);

  if (row.length === 0) {
    const error = new Err("Samochód o podanym Id nie istnieje");
    error.statusCode = 404;
    throw error;
  }

  return {
    data: row[0],
    message: "Samochód znaleziony pomyślnie",
  };
}
async function addImg(carId: number, path: string) {
  let carExists = await db.query("SELECT * FROM Cars WHERE Id=?", [carId]);
  carExists = helper.emptyOrRows(carExists);
  if (carExists.length === 0) {
    const error = new Err("Samochód o podanym Id nie istnieje");
    error.statusCode = 404;
    throw error;
  }
  let result = await db.query("UPDATE Cars SET img=? WHERE Id=?", [path, carId]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Zdjęcie nie mogło zostać dodane");
  }

  return {
    message: "Zdjęcie dodane pomyślnie",
  };
}

async function create(car: Cars) {
   validateCar(car);
  let carExists = await db.query("SELECT * FROM Cars WHERE license_plate=?", [car.license_plate]);
  carExists = helper.emptyOrRows(carExists);
  if (carExists.length > 0) {
    const error = new Err("Samochód o podanym numerze rejestracyjnym już istnieje");
    error.statusCode = 409;
    throw error;
  }
  let result = await db.query("INSERT INTO Cars (brand, model, price_per_day, production_year, license_plate, fuel_type, transmission_type) VALUES (?,?,?,?,?,?,?)", [
    car.brand,
    car.model,
    car.price_per_day,
    car.production_year,
    car.license_plate,
    car.fuel_type,
    car.transmission_type,
  ]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Samochód nie mógł zostać utworzony");
  }

  return {
    data: car,
    message: "Samochód utworzony pomyślnie",
  };
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
 let carExists = await db.query("SELECT * FROM Cars WHERE Id=?", [carId]);
  carExists = helper.emptyOrRows(carExists);
  if (carExists.length === 0) {
    const error = new Err("Samochód o podanym Id nie istnieje");
    error.statusCode = 404;
    throw error;
  }
  let result = await db.query("UPDATE Cars SET brand=?, model=?, price_per_day=?, production_year=?, license_plate=?, fuel_type=?, transmission_type=?,img=? WHERE Id=?", [
    car.brand,
    car.model,
    car.price_per_day,
    car.production_year,
    car.license_plate,
    car.fuel_type,
    car.transmission_type,
    car.img,
    carId,
  ]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Samochód nie mógł zostać zaktualizowany");
  }

  return {
    data: car,
    message: "Samochód zaktualizowany pomyślnie",
  };
}

async function remove(id: number) {
  let carExists = await db.query("SELECT * FROM Cars WHERE Id=?", [id]);
  carExists = helper.emptyOrRows(carExists);

  if (carExists.length === 0) {
    const error = new Err("Samochód o podanym Id nie istnieje");
    error.statusCode = 404;
    throw error;
  }
  let result = await db.query("DELETE FROM Cars WHERE Id=?", [id]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Samochód nie mógł zostać usunięty");
  }
  return "Samochód usunięty pomyślnie";
}

export default {
  addImg,
  getAllCars,
  getAllCar,
  getOneCar,
  create,
  update,
  remove,
  getById,
};
