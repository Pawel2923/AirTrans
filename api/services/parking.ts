import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Err } from "../Types";
import { Parking_reservations } from "../Types";


async function getAllParking(
  page = 1,
  limit = config.listPerPage,
  userEmail?: string
) {
  const offset = helper.getOffset(page, limit);

  let query = "SELECT p.* FROM Parking_reservations p JOIN Users u ON p.Users_id = u.id";
  const queryParams = [];

  if (userEmail) {
    query += " WHERE u.email = ?";
    queryParams.push(userEmail);
  }

  query += " LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);


  const rows = await db.query(query, queryParams);

  const data = helper.emptyOrRows(rows).map((row) => ({
    ...row,
    since: formatDate(row["since"]),
    until: formatDate(row["until"]),
  }));

  const pages = await helper.getPages("Parking_reservations", limit);

  const meta = {
    page,
    pages,
  };

  return {
    data,
    meta,
    message: "Successfully featched data" 
  };
}
function validacjaParking(parking: Parking_reservations) {
  
  const currentDate = new Date();
  const sinceDate = new Date(parking.since);
  const untilDate = new Date(parking.until);

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
  }}

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

async function createParking(parkingData: Parking_reservations) {
  validacjaParking(parkingData);
  const parkingAvailability = await db.query(
    "SELECT * FROM Parking_reservations WHERE parking_level = ? AND space_id = ? AND ((since <= ? AND until >= ?) OR (since <= ? AND until >= ?) OR (since >= ? AND until <= ?))",
    [
      parkingData.parking_level,
      parkingData.space_id,
      parkingData.since,
      parkingData.since,
      parkingData.until,
      parkingData.until,
      parkingData.since,
      parkingData.until,
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
    "INSERT INTO Parking_reservations (Users_id, since, until, parking_level, space_id, license_plate,status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      parkingData.Users_id,
      parkingData.since,
      parkingData.until,
      parkingData.parking_level,
      parkingData.space_id,
      parkingData.license_plate,
      parkingData.status,
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
  let rows = await db.query("DELETE FROM Parking_reservations WHERE id = ?", [
    id,
  ]);
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
  const rows = await db.query("SELECT * FROM ?? WHERE id = ?", [
    tableName,
    parkingId,
  ]);
  const data = helper.emptyOrRows(rows).map((row) => ({
    ...row,
    since: formatDate(row["since"]),
    until: formatDate(row["until"]),
  }));

  if (!data) {
    const error = new Err("Parking not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    data,
    response: {
    message: "Parking found",
    statusCode: 200,
    }
  };
}

async function updateParking(parkingId: number, parking: Parking_reservations) {
  validacjaParking(parking);
  parking.id = parkingId;


  const parkingExist = await db.query(
    "SELECT * FROM Parking_reservations WHERE id = ?",
    [parkingId]
  );
  if (helper.emptyOrRows(parkingExist).length === 0) {
    const error = new Err("Parking not found");
    error.statusCode = 404;
    throw error;
  }


  let result = await db.query(
    "UPDATE Parking_reservations SET since = ?, until = ?, parking_level = ?, space_id = ?, license_plate = ?, status = ? WHERE id = ?",
    [
      parking.since,
      parking.until,
      parking.parking_level,
      parking.space_id,
      parking.license_plate,
      parking.status,
      parkingId,
    ]
  );
  result = result as ResultSetHeader;

  if(result.affectedRows) {
    return {
      data: parking,
      message: "Parking updated successfully",
      statusCode: 200,
    };
  }
  else {
    throw new Err("Failed to update parking");
  }
}
export default {
  getAllParking,
  createParking,
  removeParking,
  getById,
  updateParking,
};
