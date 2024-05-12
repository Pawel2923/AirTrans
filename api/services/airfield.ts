import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err, Airfield_info, Runways, Terminals, Taxiways } from "../Types";
import { ResultSetHeader } from "mysql2";

const tableNames = ["Runways", "Terminals", "Taxiways"];

const runwaysProperties = ["id", "length", "is_available"];
const terminalsProperties = ["id", "is_available", "num_of_stations"];
const taxiwaysProperties = ["id", "is_available"];

async function get(
	table_name?: string,
	page = 1,
	limit = config.listPerPage,
	filter?: string,
	sort?: string
) {
	// Check if page and limit are valid
	if (page < 1 || limit < 1) {
		throw new Err("Invalid page or limit number", 400);
	}
	const offset = helper.getOffset(page, limit);
	let data: any[] | Airfield_info = [];

	if (table_name) {
		if (!tableNames.includes(table_name)) {
			throw new Err("Invalid table name", 400);
		}

		const { query, queryParams } = helper.buildQuery(
			table_name,
			offset,
			limit,
			filter,
			sort
		);

		const rows = await db.query(query, queryParams);
		data = helper.emptyOrRows(rows);

		if (data.length === 0) {
			throw new Err("No data found", 400);
		}
	} else {
		const runwayRows = await db.query(
			"SELECT * FROM Runways LIMIT ? OFFSET ?",
			[limit, offset]
		);
		const runwayData = helper.emptyOrRows(runwayRows) as Runways[];

		const terminalRows = await db.query(
			"SELECT * FROM Terminals LIMIT ? OFFSET ?",
			[limit, offset]
		);
		const terminalData = helper.emptyOrRows(terminalRows) as Terminals[];

		const taxiwayRows = await db.query(
			"SELECT * FROM Taxiways LIMIT ? OFFSET ?",
			[limit, offset]
		);
		const taxiwayData = helper.emptyOrRows(taxiwayRows) as Taxiways[];

		if (
			runwayData.length === 0 &&
			terminalData.length === 0 &&
			taxiwayData.length === 0
		) {
			throw new Err("No airfield info found", 400);
		}

		const airfieldInfo: Airfield_info = {
			name: "Airport",
			runways: runwayData,
			terminals: terminalData,
			taxiways: taxiwayData,
		};

		data = airfieldInfo;
	}

	return {
		data,
		message: `Successfully fetched airfield info`,
	};
}

async function update(
	table_name: string,
	id: string,
	newData: Runways | Terminals | Taxiways
) {
	if (!tableNames.includes(table_name)) {
		throw new Err("Invalid table name", 400);
	}

	if (table_name === "Runways") {
		helper.checkObject(newData, runwaysProperties);
	} else if (table_name === "Terminals") {
		helper.checkObject(newData, terminalsProperties);
	} else {
		helper.checkObject(newData, taxiwaysProperties);
	}

	if (newData.id !== id) {
		throw new Err("Id does not match", 400);
	}

	const checkId = await db.query("SELECT '' FROM ?? WHERE id=?", [
		table_name,
		id,
	]);
	const checkIdData = helper.emptyOrRows(checkId);
	if (checkIdData.length === 0) {
		throw new Err(`${table_name} not found`, 404);
	}

	let result = await db.query("UPDATE ?? SET ? WHERE id=?", [
		table_name,
		newData,
		id,
	]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err(`${table_name} could not be updated`);
	}

	return {
		data: newData,
		message: `${table_name} updated successfully`,
	};
}

export default {
	get,
	update,
};
