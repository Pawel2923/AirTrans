import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err } from "../Types";
import { ResultSetHeader } from "mysql2";
import { Rentals } from "../Types";

const rentalProperties = [
  "since",
  "until",
  "status",
  "Users_id",
  "Cars_id",
];


function validateRental(rental: Rentals) {
helper .checkObject(rental,rentalProperties);

const datetimeRegex =
  /^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

if (!datetimeRegex.test(rental.since)) {
  const error = new Err("Since property invalid format");
  error.statusCode = 400;
  throw error;
}
if (!datetimeRegex.test(rental.until)) {
  const error = new Err("Until property invalid format");
  error.statusCode = 400;
  throw error;
}
const currentDate = new Date();
const sinceDate = new Date(rental.since);
const untilDate = new Date(rental.until);

if (sinceDate < currentDate) {
  const error = new Err("Since date should be greater than current date");
  error.statusCode = 400;
  throw error;
}
if (untilDate < currentDate) {
  const error = new Err("Until date should be greater than current date");
  error.statusCode = 400;
  throw error;
}

if (untilDate < sinceDate) {
  const error = new Err("Until date should be greater than since date");
  error.statusCode = 400;
  throw error;

}
}
async function getAllRentals(
  page = 1,
  limit = config.listPerPage,
  userEmail?: string
) {
  const offset = helper.getOffset(page, limit);

  let query =
    "SELECT r.*, u.first_name, u.last_name, u.email, u.phone_number, c.brand, c.model, c.price_per_day  FROM Rentals AS r LEFT JOIN Users u ON r.Users_id = u.id LEFT JOIN Cars c ON r.Cars_id = c.id";
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
    message: "Successfully fetched data",
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
  validateRental(rentalData);
  const carAvailability = await db.query(
    "SELECT * FROM Rentals WHERE Cars_id = ? AND (since <= ? AND until >= ?)",
    [rentalData.Cars_id, rentalData.until, rentalData.since]
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
 const data = helper.emptyOrRows(rows).map((row) => ({
    ...row,
    since: formatDate(row["since"]),
    until: formatDate(row["until"]),
  }));

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
