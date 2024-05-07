import db from "./db";
import helper from "../helper";
import { Err, Airfield_info, Runway, Terminal, Taxiway } from "../Types";
import { ResultSetHeader } from "mysql2";

async function get(table_name?: string) {
    if (table_name) {
        if (table_name !== "Runway" && table_name !== "Terminal" && table_name !== "Taxiway") {
            const error = new Err("Invalid table name");
            error.statusCode = 400;
            throw error;
        }

        const rows = await db.query("SELECT * FROM ??", [table_name]);
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

    const runwayRows = await db.query(
        "SELECT * FROM Runway"
    );
    const runwayData = helper.emptyOrRows(runwayRows) as Runway[];

    const terminalRows = await db.query(
        "SELECT * FROM Terminal"
    );
    const terminalData = helper.emptyOrRows(terminalRows) as Terminal[];

    const taxiwayRows = await db.query(
        "SELECT * FROM Taxiway"
    );
    const taxiwayData = helper.emptyOrRows(taxiwayRows) as Taxiway[];

    if (runwayData.length === 0 && terminalData.length === 0 && taxiwayData.length === 0) {
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
};

async function update(table_name: string, id: string, newData: Runway | Terminal | Taxiway) {
    if (table_name !== "Runway" && table_name !== "Terminal" && table_name !== "Taxiway") {
        const error = new Err("Invalid table name");
        error.statusCode = 400;
        throw error;
    }

    const checkId = await db.query("SELECT '' FROM ?? WHERE id=?", [table_name, id]);
    const checkIdData = helper.emptyOrRows(checkId);
    if (checkIdData.length === 0) {
        const error = new Err(`${table_name} not found`);
        error.statusCode = 404;
        throw error;
    }

    let result = await db.query("UPDATE ?? SET ? WHERE id=?", [table_name, newData, id]);
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