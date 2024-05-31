import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err, Logowanie_log } from "../Types";

async function get(page = 1, limit = config.listPerPage) {
  if (page < 1 || limit < 1) {
    const error = new Err("Invalid page or limit number");
    error.statusCode = 400;
    throw error;
  }
  const offset = helper.getOffset(page, limit);

  const { query, queryParams } = helper.buildQuery(
    "Logowanie_log",
    offset,
    limit
  );

  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows) as Logowanie_log[];

  if (data.length === 0) {
    const error = new Err("No logowanie_log found");
    error.statusCode = 404;
    throw error;
  }

  const pages = await helper.getPages("Logowanie_log", limit);

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
