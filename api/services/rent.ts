import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err } from "../Types";
import { ResultSetHeader } from "mysql2";
import { Rentals } from "../Types";

async function getAllRentals(
  page = 1,
  limit = config.listPerPage,
  userEmail?: string,
) {
  const offset = helper.getOffset(page, config.listPerPage);

  let query = "SELECT r.*, u.first_name, u.last_name, u.email, u.phone_number, c.brand, c.model, c.price_per_day  FROM Rentals AS r LEFT JOIN Users u ON r.Users_id = u.id LEFT JOIN Cars c ON r.Cars_id = c.id";
  const queryParams = [];

  if (userEmail) {
    query += " WHERE u.email = ?";
    queryParams.push(userEmail);
  }

  query += " ORDER BY r.id DESC LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);

  const rows = await db.query(query, queryParams);

  const data = helper.emptyOrRows(rows).map((row) => ({
    ...row,
    since: formatDate(row["since"]),
    until: formatDate(row["until"]),
  }));

  const pages = await helper.getPages("Rentals", limit);

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

async function createRental(rentalData: Rentals) {
  const carAvailability = await db.query(
    "SELECT '' FROM Rentals WHERE Cars_id = ? AND until > NOW()",
    [rentalData.Cars_id, rentalData.until]
  );

  if (helper.emptyOrRows(carAvailability).length > 0) {
    const error = new Err(
      "Ten samochód jest już wypożyczony w podanym terminie."
    );
    error.statusCode = 409;
    throw error;
  }

  let result = await db.query(
    "INSERT INTO Rentals (since,until, status,Users_id, Cars_id) VALUES (?, ?, ?, ?, ?)",
    [
      rentalData.since,
      rentalData.until,
      rentalData.status,
      rentalData.Users_id,
      rentalData.Cars_id,
    ]
  );
  result = result as ResultSetHeader;

  if (result.affectedRows) {
    return {
      data: rentalData,
      statusCode: 201,
      message: "Wypożyczenie zostało dodane pomyślnie.",
    };
  } else {
    throw new Err("Wypożyczenie nie zostało dodane.");
  }
}

async function removeRent(Id: number) {
  const rentExists = await db.query("SELECT * FROM Rentals WHERE id=?", [Id]);

  if (helper.emptyOrRows(rentExists).length === 0) {
    const error = new Err("Wypożyczenie nie istnieje!");
    error.statusCode = 404;
    throw error;
  }

  let result = await db.query("DELETE FROM Rentals WHERE id=?", [Id]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Wypożyczenie nie zostało usunięte!");
  }
  return {
    message: "Wypożyczenie zostało usunięte!",
    statusCode: 201,
  };
}

async function getById(rentId: number, tableName = "Rentals") {
  const rows = await db.query("SELECT * FROM ?? WHERE id = ?", [
    tableName,
    rentId,
  ]);
  const data = helper.emptyOrRows(rows);

  if (!data) {
    return {
      data: null,
      response: {
        message: `Wypożyczenie o ID ${rentId} nie istnieje`,
        statusCode: 404,
      },
    };
  }

  return {
    data,
    response: {
      message: `Successfully fetched data for rental with ID ${rentId}`,
      statusCode: 200,
    },
  };
}

async function updateRent(rentId: number, rent: Rentals) {
  rent.id = rentId;

  const rentExists = await db.query("SELECT * FROM Rentals WHERE id=?", [
    rent.id,
  ]);

  if (helper.emptyOrRows(rentExists).length === 0) {
    const error = new Err("Wypożyczenie nie istnieje!");
    error.statusCode = 404;
    throw error;
  }

  let result = await db.query(
    "UPDATE Rentals SET since=?, until=?, status=?, Users_id=?, Cars_id=? WHERE id=?",
    [rent.since, rent.until, rent.status, rent.Users_id, rent.Cars_id, rent.id]
  );
  result = result as ResultSetHeader;

  if (result.affectedRows) {
    return {
      data: rent,
      statusCode: 200,
      message: "Wypożyczenie zostało zaktualizowane!",
    };
  } else {
    throw new Err("Wypożyczenie nie zostało zaktualizowane!");
  }
}

export default {
  getAllRentals,
  removeRent,
  createRental,
  updateRent,
  getById,
};
