import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err, Tickets } from "../Types";
import { ResultSetHeader } from "mysql2";

async function get(
  page = 1,
  limit = config.listPerPage,
  filter?: string,
  sort?: string
) {
  const offset = helper.getOffset(page, limit);
  let query =
    "SELECT t.id, u.email, u.first_name, u.last_name, u.phone_number, u.address, t.class, t.seat_number, t.status, f.id Flight_id, f.airline_name, f.destination, f.origin, f.departure, g.name gate_name, t.purchase_time, t.update_time, t.price FROM Tickets t LEFT JOIN Users u ON t.Users_id = u.id LEFT JOIN Gates g ON t.Gates_id = g.id LEFT JOIN Flights f on t.Flight_id = f.id";
  const queryParams = [];

  // Check if filter is provided
  if (filter) {
    const filterQuery = helper.buildFilterQuery(filter);
    query += filterQuery.query;
    filterQuery.queryParams.forEach((param) => {
      queryParams.push(param);
    });
  }

  // Check if sort is provided
  if (sort) {
    const sortQuery = helper.buildSortQuery(sort);
    query += sortQuery.query;
    sortQuery.queryParams.forEach((param) => {
      queryParams.push(param);
    });
  }

  // Add limit and offset
  query += ` LIMIT ? OFFSET ?`;
  queryParams.push(limit, offset);

  // Execute query
  const result = await db.query(query, queryParams);
  const data = helper.emptyOrRows(result) as Tickets[];

  // check if data is empty
  if (data.length === 0) {
    throw new Err("No tickets found", 404);
  }

  // Get total pages
  const pages = await helper.getPages("Tickets", limit);

  // Generate meta data
  const meta = { page, pages, limit };

  return {
    data,
    meta,
    message: "Successfully fetched tickets",
  };
}

async function getIds() {
  const query = "SELECT id FROM Tickets;";
  const result = await db.query(query);
  const data = helper.emptyOrRows(result);

  const ids: string[] = data.map((ticketId) => ticketId["id"]);

  return {
    data: ids,
    message: "Successfully fetched ticket ids",
  };
}

async function updateStatus(id: number, status: string) {
  if (
    status !== "PURCHASED" &&
    status !== "EXPIRED" &&
    status !== "USED" &&
    status !== "REFUNDED" &&
    status !== "CANCELLED"
  ) {
    throw new Err("Invalid status", 400);
  }

  const oldStatus = await db.query(
    "SELECT status, purchase_time FROM Tickets WHERE id = ?",
    [id]
  );
  if ((oldStatus as Tickets[]).length === 0) {
    throw new Err("Ticket not found", 404);
  }

  if ((oldStatus as Tickets[])[0]?.status === "EXPIRED") {
    throw new Err("Ticket has expired", 400);
  }

  if (
    status === "USED" &&
    (oldStatus as Tickets[])[0]?.status !== "PURCHASED"
  ) {
    throw new Err("Ticket must be purchased first", 400);
  }

  if (
    status === "REFUNDED" &&
    (oldStatus as Tickets[])[0]?.status !== "PURCHASED"
  ) {
    throw new Err("Ticket must be purchased first", 400);
  }

  if (
    status === "REFUNDED" &&
    new Date() > new Date((oldStatus as Tickets[])[0]?.purchase_time as string)
  ) {
    throw new Err("Cannot refund after 24 hours", 400);
  }

  if ((oldStatus as Tickets[])[0]?.status === status) {
    throw new Err("Status is already the same", 400);
  }

  const query = "UPDATE Tickets SET status = ? WHERE id = ?";
  const result = await db.query(query, [status, id]);

  if ((result as ResultSetHeader).affectedRows === 0) {
    throw new Err("Could not update ticket status");
  }

  const newData = { ...(oldStatus as Tickets[])[0] } as Tickets;
  newData.status = status;

  return { data: newData, message: "Ticket status updated" };
}

export default { get, getIds, updateStatus };
