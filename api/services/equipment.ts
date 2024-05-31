import db from "./db";
import helper from "../helper";
import config from "../config";
import { Equipment } from "../Types";
import { Err } from "../Types";
import { ResultSetHeader } from "mysql2";

async function getAll(
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
    "Equipment",
    offset,
    limit,
    filter,
    sort
  );

  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows).map((row) => ({
    ...row,
  }));

  if (data.length === 0) {
    const error = new Err("No equipment found");
    error.statusCode = 404;
    throw error;
  }

  const pages = await helper.getPages("Equipment", limit);

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
async function create(equipment: Equipment) {
  let equipmentExists = await db.query(
    "SELECT * FROM Equipment WHERE serial_no = ?",
    [equipment.serial_no]
  );
  equipmentExists = helper.emptyOrRows(equipmentExists);
  if (equipmentExists.length > 0) {
    const error = new Err("Equipment with this serial number already exists");
    error.statusCode = 409;
    throw error;
  }

  let result = await db.query(
    `INSERT INTO Equipment (serial_no, type, name, location, Employee_id) VALUES (?,?,?,?,?)`,
    [
      equipment.serial_no,
      equipment.type,
      equipment.name,
      equipment.location,
      equipment.Employee_id,
    ]
  );
  result = result as ResultSetHeader;
  if (result.affectedRows === 0) {
    throw new Err("Equipment could not be created");
  }
  return {
    data: equipment,
    message: "Successfully created equipment",
  };
}

async function getById(serial_no: string) {
  let row = await db.query("SELECT * FROM Equipment WHERE serial_no=?", [
    serial_no,
  ]);
  row = helper.emptyOrRows(row);

  if (row.length === 0) {
    const error = new Err("Equipment with this serial number does not exist");
    error.statusCode = 404;
    throw error;
  }

  return {
    data: row[0],
    message: "Successfully fetched equipment",
  };
}

async function update(serial_no: string, equipment: Equipment) {
  let equipmentExists = await db.query(
    "SELECT * FROM Equipment WHERE serial_no = ?",
    [serial_no]
  );
  equipmentExists = helper.emptyOrRows(equipmentExists);

  if (equipmentExists.length === 0) {
    const error = new Err("Equipment with this serial number does not exist");
    error.statusCode = 404;
    throw error;
  }

  if (serial_no !== equipment.serial_no) {
    const error = new Err(
      "Equipment serial number in the URL does not match the serial number in the body"
    );
    error.statusCode = 400;
    throw error;
  }

  let result = await db.query(
    `UPDATE Equipment SET type=?, name=?, location=?, Employee_id=? WHERE serial_no=?`,
    [
      equipment.type,
      equipment.name,
      equipment.location,
      equipment.Employee_id,
      serial_no,
    ]
  );
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to update equipment");
  }

  return {
    data: equipment,
    message: "Successfully updated equipment",
  };
}

async function remove(serial_no: string) {
  let equipmentExists = await db.query(
    "SELECT * FROM Equipment WHERE serial_no = ?",
    [serial_no]
  );
  equipmentExists = helper.emptyOrRows(equipmentExists);

  if (equipmentExists.length === 0) {
    const error = new Err("Equipment with this serial number does not exist");
    error.statusCode = 404;
    throw error;
  }

  let result = await db.query("DELETE FROM Equipment WHERE serial_no = ?", [
    serial_no,
  ]);
  result = result as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to delete equipment");
  }

  return {
    message: "Successfully deleted equipment",
  };
}

export default {
  getAll,
  create,
  getById,
  update,
  remove,
};
