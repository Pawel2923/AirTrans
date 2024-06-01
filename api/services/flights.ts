import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Flights, Departures } from "../Types";
import { Err } from "../Types";

// Function to validate flight details
async function validateFlight(flight: Flights) {
  // Check if all required properties are present in the flight object
  helper.checkObject(flight, [
    "id",
    "status",
    "airline_name",
    "destination",
    "origin",
    "arrival",
    "departure",
    "airplane_serial_no",
  ]);

  // Regular expression to validate date and time format
  const datetimeRegex =
    /^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

  // Validate Arrival and Departure date and time format
  if (!datetimeRegex.test(flight.arrival)) {
    throw new Err("Arrival property invalid format", 400);
  }

  if (!datetimeRegex.test(flight.departure)) {
    throw new Err("Departure property invalid format", 400);
  }

  // Check if airplane with given serial number exists
  let airplaneSerialNoExists = await db.query(
    "SELECT '' FROM Airplanes WHERE serial_no=?",
    [flight.airplane_serial_no]
  );

  airplaneSerialNoExists = helper.emptyOrRows(airplaneSerialNoExists);

  if (airplaneSerialNoExists.length === 0) {
    throw new Err("Airplanes with this serial number does not exist", 404);
  }
}

// Function to get flights with optional filter and sort parameters
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
    "Flights",
    offset,
    limit,
    filter,
    sort
  );

  // Execute the query
  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows) as Flights[];

  // If no data found, throw an error
  if (data.length === 0) {
    throw new Err("No flights found", 404);
  }

  // Get total number of pages
  const pages = await helper.getPages("Flights", limit);

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

// Function to get flights by departure or arrival
async function getByDepartureOrArrival(
  page = 1,
  limit = config.listPerPage,
  filter?: string,
  sort?: string
) {
  // Get offset for pagination
  const offset = helper.getOffset(page, limit);

  // Build SQL query with filter, sort, offset and limit parameters
  let subquery1 = "SELECT * FROM Departures ";
  let subquery2 = "SELECT * FROM Departures ";
  const queryParams1: unknown[] = [];
  const queryParams2: unknown[] = [];

  // Check if filter is provided
  if (filter) {
    const filterQuery = helper.buildFilterQuery(filter);
    subquery1 += filterQuery.query + " AND is_departure=1";
    subquery2 += filterQuery.query + " AND is_departure=0";
    filterQuery.queryParams.forEach((param) => {
      queryParams1.push(param as string);
      queryParams2.push(param as string);
    });
  } else {
    // If no filter is provided, get all departures and arrivals
    subquery1 += "WHERE is_departure=1";
    subquery2 += "WHERE is_departure=0";
  }

  // Check if sort is provided
  if (sort) {
    const sortQuery = helper.buildSortQuery(sort);
    subquery1 += sortQuery.query;
    subquery2 += sortQuery.query;
    sortQuery.queryParams.forEach((param) => {
      queryParams1.push(param as string);
      queryParams2.push(param as string);
    });
  } else {
    // If no sort is provided, sort by departure and arrival
    subquery1 += " ORDER BY departure";
    subquery2 += " ORDER BY arrival";
  }

  // Add limit and offset
  subquery1 += ` LIMIT ?, ?`;
  subquery2 += ` LIMIT ?, ?`;
  queryParams1.push(offset, limit);
  queryParams2.push(offset, limit);

  // Combine subqueries
  const query = `(${subquery1}) UNION (${subquery2})`;
  const queryParams = queryParams1.concat(queryParams2);

  // Execute the query
  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows) as Departures[];

  if (data.length === 0) {
    throw new Err("No departures or arrivals found", 404);
  }

  // Build subqueries to get total number of pages
  subquery1 = `SELECT COUNT(*) count FROM Departures `;
  subquery2 = `SELECT COUNT(*) count FROM Departures `;

  // Check if filter is provided
  if (filter) {
    const filterQuery = helper.buildFilterQuery(filter);
    subquery1 += filterQuery.query + " AND is_departure=1";
    subquery2 += filterQuery.query + " AND is_departure=0";
  } else {
    // If no filter is provided, get all departures and arrivals
    subquery1 += "WHERE is_departure=1";
    subquery2 += "WHERE is_departure=0";
  }

  // Execute subqueries
  const count1 = await db.query(subquery1, queryParams1);
  const count2 = await db.query(subquery2, queryParams2);

  const countData1 = helper.emptyOrRows(count1);
  const countData2 = helper.emptyOrRows(count2);

  // If no data found, throw an error
  if (countData1.length === 0 || countData2.length === 0) {
    throw new Err("No departures or arrivals found", 404);
  }

  // Get total number of pages
  const pages = Math.ceil(
    (parseFloat(countData1[0]?.["count"] as string) + parseFloat((countData2[0]?.["count"]) as string)) / (limit * 2)
  );

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

// Function to get flight data
async function getData(column: string) {
  // Execute the query
  const rows = await db.query("SELECT DISTINCT ?? FROM Flights", [column]);
  const resultData: RowDataPacket[] = helper.emptyOrRows(rows);

  // Map the data to array
  const data: string[] = resultData.map((row: RowDataPacket) => row[column]);

  // If no data found, throw an error
  if (data.length === 0) {
    throw new Err("No flight id found", 404);
  }

  // Return data and success message
  return {
    data,
    message: "Successfully fetched data",
  };
}

// Function to create a new flight
async function create(flight: Flights) {
  // Validate flight details
  await validateFlight(flight);

  // Check if flight with given id already exists
  let flightExists = await db.query("SELECT '' FROM Flights WHERE id=?", [
    flight.id,
  ]);

  flightExists = helper.emptyOrRows(flightExists);

  if (flightExists.length > 0) {
    throw new Err("Flights with this id already exists", 409);
  }

  // Insert new flight into the database
  let result = await db.query("INSERT INTO Flights SET ?", [flight]);
  result = result as ResultSetHeader;

  // If insertion isn't successful throw an error
  if (result?.affectedRows === 0) {
    throw new Err("Flights could not be created");
  }

  return {
    data: flight,
    message: "Flights created successfully",
  };
}

// Function to update a flight
async function update(flightId: string, flight: Flights) {
  // Validate flight details
  await validateFlight(flight);

  // Check if flight with given id exists
  let flightExists = await db.query("SELECT '' FROM Flights WHERE id=?", [
    flightId,
  ]);
  flightExists = helper.emptyOrRows(flightExists);

  if (flightExists.length === 0) {
    const error = new Err("Flights with this id does not exist");
    error.statusCode = 404;
    throw error;
  }

  // Check if flightId is equal to id in the flight object
  if (flightId !== flight.id) {
    const error = new Err("Flights id does not match");
    error.statusCode = 400;
    throw error;
  }

  // Update flight in the database
  let result = await db.query("UPDATE Flights SET ? WHERE id=?", [
    flight,
    flightId,
  ]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Flights could not be updated");
  }

  return {
    data: flight,
    message: "Flights updated successfully",
  };
}

// Function to delete a flight
async function remove(id: string) {
  // Check if flight with given id exists
  let flightExists = await db.query("SELECT '' FROM Flights WHERE id=?", [id]);
  flightExists = helper.emptyOrRows(flightExists);

  if (flightExists.length === 0) {
    const error = new Err("Flights with this id does not exist");
    error.statusCode = 404;
    throw error;
  }

  // Delete flight from the database
  let result = await db.query("DELETE FROM Flights WHERE id=?", [id]);
  result = result as ResultSetHeader;

  // If deletion is successful, return success message, else throw an error
  if (result.affectedRows === 0) {
    throw new Err("Flights could not be deleted");
  }

  return "Flights deleted successfully";
}

// Search flight by term
async function search(
  term: string,
  page = 1,
  limit = config.listPerPage,
  filter?: string,
  sort?: string
) {
  // Check if search term is provided
  if (!term) {
    const error = new Err("Search term is required");
    error.statusCode = 400;
    throw error;
  }

  // Check if page and limit are valid
  if (page < 1 || limit < 1) {
    const error = new Err("Invalid page or limit number");
    error.statusCode = 400;
    throw error;
  }

  // Get offset for pagination
  const offset = helper.getOffset(page, limit);

  const search = { query: "", queryParams: [] as unknown[] };
  // Search query
  search.query =
    " WHERE (id LIKE ? OR status LIKE ? OR airline_name LIKE ? OR destination LIKE ? OR arrival LIKE ? OR departure LIKE ? OR airplane_serial_no LIKE ?)";
  // Add search term to the query parameters
  search.queryParams = Array(7).fill(`%${term}%`);

  // Build SQL query with filter, sort, offset and limit parameters
  const { query: query, queryParams } = helper.buildQuery(
    "Flights",
    offset,
    limit,
    filter,
    sort,
    search
  );

  // Execute the search query
  const result = await db.query(query, queryParams);
  const data = helper.emptyOrRows(result);

  // If no data found, throw an error
  if (data.length === 0) {
    const error = new Err("No flights found");
    error.statusCode = 404;
    throw error;
  }

  // Get pages count from the data length
  const pages = Math.ceil(data.length / limit);

  // Prepare meta data for response
  const meta = {
    page,
    pages,
    total: data.length,
  };

  // Return data and success message
  return {
    data,
    meta,
    message: "Successfully fetched data",
  };
}

// Exporting functions for external use
export const flight = {
  get,
  getByDepartureOrArrival,
  getData,
  create,
  update,
  remove,
  search,
};
