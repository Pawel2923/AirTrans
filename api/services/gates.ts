import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Gates } from "../Types";
import { Err } from "../Types";

async function get(
  page = 1,
  limit = config.listPerPage,
  filter?: string,
  sort?: string
) {
  if (page < 1 || limit < 1) {
    const error = new Err("Invalid page or limit number");
    error.statusCode = 400;
    throw error;
  }
  const offset = helper.getOffset(page, limit);

  const { query, queryParams } = helper.buildQuery(
    "Gates",
    offset,
    limit,
    filter,
    sort
  );

  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows) as Gates[];


  if (data.length === 0) {
    const error = new Err("No gates found");
    error.statusCode = 404;
    throw error;
  }

  const pages = await helper.getPages("Gates", limit);

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
async function create(gate: Gates) {
  let gatesExists = await db.query("SELECT * FROM Gates WHERE id=?", [gate.id]);
  gatesExists = helper.emptyOrRows(gatesExists);
  if (gatesExists.length > 0) {
    const error = new Err("Gates with this id already exists");
    error.statusCode = 409;
    throw error;
  }
  let result = await db.query("INSERT INTO Gates (name,status) VALUES (?,?)", [
    gate.name,
    gate.status,
  ]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Gates could not be created");
  }

  return {
    data: gate,
    message: "Gates created successfully",
  };
}

async function remove(id: number) {
  let gatesExists = await db.query("SELECT * FROM Gates WHERE id=?", [id]);
  gatesExists = helper.emptyOrRows(gatesExists);
  if (gatesExists.length === 0) {
    const error = new Err("Gates with this id does not exist");
    error.statusCode = 404;
    throw error;
  }
  let result = await db.query("DELETE FROM Gates WHERE id=?", [id]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Gates could not be deleted");
  }
  return "Successfully deleted gates";
}

async function getById(id: number) {
  let row = await db.query("SELECT * FROM Gates WHERE id=?", [id]);
  row = helper.emptyOrRows(row);

  if (row.length === 0) {
    const error = new Err("Gates with this id does not exist");
    error.statusCode = 404;
    throw error;
  }

  return {
    data: row[0],
    message: "Successfully fetched gates",
  };
}

async function updateG(id: number, gate: Gates) {
  let gatesExists = await db.query("SELECT * FROM Gates WHERE id=?", [id]);
  gatesExists = helper.emptyOrRows(gatesExists);

  if (gatesExists.length === 0) {
    const error = new Err("Gates with this id does not exist");
    error.statusCode = 404;
    throw error;
  }

  let result = await db.query("UPDATE Gates SET name=?, status=? WHERE id=?", [
    gate.name,
    gate.status,
    id,
  ]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to update gates");
  }

  return {
    data: gate,
    message: "Successfully updated gates",
  };
}
export default {
  get,
  create,
  remove,
  getById,
  updateG,
};
