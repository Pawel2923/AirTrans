import helper from "../helper";
import config from "../config";
import db from "./db";
import { Err } from "../Types";

async function get(page = 1, limit = config.listPerPage) {
  const offset = helper.getOffset(page, limit);

  const query =
    "SELECT l.id, l.type, l.size, l.weight, u.email, u.phone_number, u.first_name, u.last_name, Flights_id FROM Luggage l JOIN Users u ON l.Users_id = u.id LIMIT ? OFFSET ?;";
  const queryParams = [limit, offset];

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

export default {
  get,
};
