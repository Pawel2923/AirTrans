import db from "./db";
import helper from "../helper";
import { Cars, Err, Parking_info } from "../Types";

// Get cars and parking info to display on the home page
async function get(offset = 0, limit = 3) {
  // Check if offset and limit are valid
  if (offset < 0 || limit < 1) {
    const error = new Err("Invalid offset or limit number");
    error.statusCode = 400;
    throw error;
  }

  // Get cars
  const carsQuery = "SELECT * FROM Cars LIMIT ?, ?";
  const carsRows = await db.query(carsQuery, [offset, limit]);
  const cars = helper.emptyOrRows(carsRows) as Cars[];

  // Check if no cars found
  if (cars.length === 0) {
    const error = new Err("No cars found");
    error.statusCode = 404;
    throw error;
  }

  // Get parking info
  const parkingInfoRows = await db.query("SELECT * FROM Parking_info");
  const parkingInfo = helper.emptyOrRows(parkingInfoRows) as Parking_info[];

  // Check if no parking info found
  if (parkingInfo.length === 0) {
    const error = new Err("No parking info found");
    error.statusCode = 404;
    throw error;
  }

  // Prepare meta data for response
  const meta = {
    offset,
    limit,
  };

  // Prepare data for response
  const data = { cars, parkingInfo };

  // Return data, meta data and success message
  return {
    data,
    meta,
    message: "Successfully fetched data",
  };
}

export default {
  get,
};
