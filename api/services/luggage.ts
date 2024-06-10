import helper from "../helper";
import config from "../config";
import db from "./db";
import { Err, Luggage } from "../Types";
import { ResultSetHeader } from "mysql2";

const luggageProperties = [
  "type",
  "size",
  "weight",
  "Users_id",
  "Flights_id",
]

async function get(page = 1, limit = config.listPerPage, userEmail?: string) {
  const offset = helper.getOffset(page, limit);

  let query =
    "SELECT l.id, l.type, l.size, l.weight, u.email, u.phone_number, u.first_name, u.last_name, Flights_id FROM Luggage l JOIN Users u ON l.Users_id = u.id";
  const queryParams = [];

  if (userEmail) {
    query += " WHERE u.email = ?";
    queryParams.push(userEmail);
  }
  
  query += " LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);

  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows);

  if (data.length === 0) {
    const error = new Err("No luggage found");
    error.statusCode = 404;
    throw error;
  }

  const pages = await helper.getPages("Luggage", limit);

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

async function create(luggage: Luggage) {
  // Check if luggage object has all required properties
  helper.checkObject(luggage, luggageProperties);

  // Check if user exists
  let userExists = await db.query("SELECT '' FROM Users WHERE id=?", [luggage.Users_id]);
  userExists = helper.emptyOrRows(userExists);

  if (userExists.length === 0) {
    throw new Err("User with this id does not exist", 404);
  }

  // Check if flight exists
  let flightExists = await db.query("SELECT '' FROM Flights WHERE id=?", [luggage.Flights_id]);
  flightExists = helper.emptyOrRows(flightExists);

  if (flightExists.length === 0) {
    throw new Err("Flight with this id does not exist", 404);
  }

  // Create luggage
  const result = await db.query("INSERT INTO Luggage SET ?", [luggage]) as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to add luggage");
  }
  
  const message = "Successfully added luggage";

  return {
    data: luggage,
    message,
  }
}

async function update(id: number, luggage: Luggage) {
  // Check if luggage object has all required properties
  helper.checkObject(luggage, luggageProperties);

  // Check if luggage exists
  let luggageExists = await db.query("SELECT '' FROM Luggage WHERE id=?", [id]);
  luggageExists = helper.emptyOrRows(luggageExists);

  if (luggageExists.length === 0) {
    throw new Err("Luggage with this id does not exist", 404);
  }

  // Check if user exists
  let userExists = await db.query("SELECT '' FROM Users WHERE id=?", [luggage.Users_id]);
  userExists = helper.emptyOrRows(userExists);

  if (userExists.length === 0) {
    throw new Err("User with this id does not exist", 404);
  }

  // Check if flight exists
  let flightExists = await db.query("SELECT '' FROM Flights WHERE id=?", [luggage.Flights_id]);
  flightExists = helper.emptyOrRows(flightExists);

  if (flightExists.length === 0) {
    throw new Err("Flight with this id does not exist", 404);
  }

  // Update luggage
  const result = await db.query("UPDATE Luggage SET ? WHERE id=?", [luggage, id]) as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to update luggage");
  }

  const message = "Successfully updated luggage";

  return {
    data: luggage,
    message,
  }
}

async function remove(id: number) {
  // Check if luggage exists
  let luggageExists = await db.query("SELECT '' FROM Luggage WHERE id=?", [id]);
  luggageExists = helper.emptyOrRows(luggageExists);

  if (luggageExists.length === 0) {
    throw new Err("Luggage with this id does not exist", 404);
  }

  // Delete luggage
  const result = await db.query("DELETE FROM Luggage WHERE id=?", [id]) as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to delete luggage");
  }

  const message = "Successfully deleted luggage";

  return {
    message,
  }
}

export default {
  get,
  create,
  update,
  remove,
};
