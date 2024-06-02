import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Flight_data } from "../Types";
import { Err } from "../Types";

// Function to get Flight_data with optional filter and sort parameters
async function get(
  page = 1,
  limit = config.listPerPage,
  filter?: string,
  sort?: string
) {
  // Check if page and limit are valid
  if (page < 1 || limit < 1) {
    throw new Err("Invalid page or limit number", 400);
  }

  // Get offset for pagination
  const offset = helper.getOffset(page, config.listPerPage);

  // Build SQL query with filter, sort, offset and limit parameters
  const { query, queryParams } = helper.buildQuery(
    "Flight_data",
    offset,
    limit,
    filter,
    sort
  );

  // Execute the query
  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows) as Flight_data[];

  // If no data found, throw an error
  if (data.length === 0) {
    throw new Err("No Flight_data found", 404);
  }

  // Get total number of pages
  const pages = await helper.getPages("Flight_data", limit);

  // Prepare meta data for response
  const meta = {
    page,
    pages,
  };

  // Return data, meta data and success message
  return {
    data,
    meta,
    message: "Successfully fetched data",
  };
}

// Function to create a new flight
async function create(flight: Flight_data) {
  // Check if flight with given id already exists
  let flightExists = await db.query("SELECT '' FROM Flight_data WHERE id=?", [
    flight.id,
  ]);

  flightExists = helper.emptyOrRows(flightExists);

  if (flightExists.length > 0) {
    throw new Err("Flight_data entry with this id already exists", 409);
  }

  // Insert new flight into the database
  let result = await db.query("INSERT INTO Flight_data SET ?", [flight]);
  result = result as ResultSetHeader;

  // If insertion isn't successful throw an error
  if (result?.affectedRows === 0) {
    throw new Err("Flight_data entry could not be created");
  }

  return {
    data: flight,
    message: "Flight_data entry created successfully",
  };
}

// Function to update a flight
async function update(id: number, flight: Flight_data) {
  // Check if flight with given id exists
  let flightExists = await db.query("SELECT '' FROM Flight_data WHERE id=?", [
    id,
  ]);
  flightExists = helper.emptyOrRows(flightExists);

  if (flightExists.length === 0) {
    const error = new Err("Flight_data entry with this id does not exist");
    error.statusCode = 404;
    throw error;
  }

  // Check if flightId is equal to id in the flight object
  if (id !== flight.id) {
    const error = new Err("Flight_data entry id does not match");
    error.statusCode = 400;
    throw error;
  }

  // Update flight in the database
  let result = await db.query("UPDATE Flight_data SET ? WHERE id=?", [
    flight,
    id,
  ]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Flight_data entry could not be updated");
  }

  return {
    data: flight,
    message: "Flight_data entry updated successfully",
  };
}

// Exporting functions for external use
export default {
  get,
  create,
  update,
};
