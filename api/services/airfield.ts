import db from "./db";
import helper from "../helper";
import { Err, Airfield_info, Runway, Terminal, Taxiway } from "../Types";

async function get() {
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

    if (runwayData.length === 0) {
        const error = new Err("No runway info found");
        error.statusCode = 404;
        throw error;
    }

    if (terminalData.length === 0) {
        const error = new Err("No terminal info found");
        error.statusCode = 404;
        throw error;
    }

    if (taxiwayData.length === 0) {
        const error = new Err("No taxiway info found");
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

export default {
    get,
};