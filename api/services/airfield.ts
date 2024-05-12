import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err, Airfield_info, Runways, Terminals, Taxiways } from "../Types";
import { ResultSetHeader } from "mysql2";

async function get(table_name?: string, page?: number, limit?: number) {
	if (table_name) {
		if (
			table_name !== "Runways" &&
			table_name !== "Terminals" &&
			table_name !== "Taxiways"
		) {
			const error = new Err("Invalid table name");
			error.statusCode = 400;
			throw error;
		}

        const offset = helper.getOffset(page, limit || config.listPerPage);
        let query = "SELECT * FROM ??";
        const queryParams: any[] = [table_name];

        if (limit) {
            query += " LIMIT ? OFFSET ?";
            queryParams.push(limit, offset);
        }

		const rows = await db.query(query, queryParams);
		const data = helper.emptyOrRows(rows);

		if (data.length === 0) {
			const error = new Err("No data found");
			error.statusCode = 404;
			throw error;
		}

		return {
			data,
			message: `Successfully fetched ${table_name} info`,
		};
	}

    const offset = helper.getOffset((page && page > 1) ? page : 1, limit || config.listPerPage);

	const runwayRows = await db.query("SELECT * FROM Runways LIMIT ? OFFSET ?", [limit || config.listPerPage, offset]);
	const runwayData = helper.emptyOrRows(runwayRows) as Runways[];

	const terminalRows = await db.query("SELECT * FROM Terminals LIMIT ? OFFSET ?", [limit || config.listPerPage, offset]);
	const terminalData = helper.emptyOrRows(terminalRows) as Terminals[];

	const taxiwayRows = await db.query("SELECT * FROM Taxiways LIMIT ? OFFSET ?", [limit || config.listPerPage, offset]);
	const taxiwayData = helper.emptyOrRows(taxiwayRows) as Taxiways[];

	if (
		runwayData.length === 0 &&
		terminalData.length === 0 &&
		taxiwayData.length === 0
	) {
		const error = new Err("No airfield info found");
		error.statusCode = 404;
		throw error;
	}

	const airfieldInfo: Airfield_info = {
		name: "Airport",
		runways: runwayData,
		terminals: terminalData,
		taxiways: taxiwayData,
	};

	return {
		data: airfieldInfo,
		message: "Successfully fetched airfield info",
	};
}

async function update(
	table_name: string,
	id: string,
	newData: Runways | Terminals | Taxiways
) {
	if (
		table_name !== "Runways" &&
		table_name !== "Terminals" &&
		table_name !== "Taxiways"
	) {
		const error = new Err("Invalid table name");
		error.statusCode = 400;
		throw error;
	}

	const checkId = await db.query("SELECT '' FROM ?? WHERE id=?", [
		table_name,
		id,
	]);
	const checkIdData = helper.emptyOrRows(checkId);
	if (checkIdData.length === 0) {
		const error = new Err(`${table_name} not found`);
		error.statusCode = 404;
		throw error;
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
