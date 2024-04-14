const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const flightProperties = ["id", "status", "airlineName", "destination", "arrival", "departure", "airplaneSerialNo"];

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`SELECT * FROM ArrDepTable ORDER BY departure, arrival LIMIT ${offset},${config.listPerPage}`);
    const data = helper.emptyOrRows(rows);

    const allFlights = await db.query("SELECT COUNT(*) flightCount FROM ArrDepTable");

    const meta = { page, pages: Math.round(allFlights[0].flightCount / config.listPerPage) };

    return {
        data,
        meta
    };
}

async function getById(id) {
    if (typeof id === "string" && id.length === 0) {
        throw new Error("Id is empty");
    }
    if (id === null) {
        throw new TypeError("Id is null");
    }

    const rows = await db.query("SELECT * FROM ArrDepTable WHERE id=?", [id]);
    const data = helper.emptyOrRows(rows);

    return data;
}

async function create(flight) {
    flightProperties.forEach(property => {
        if (property in flight === false) {
            throw new Error(`${property} property is missing`);
        }
    });
    
    for (const [key, value] of Object.entries(flight)) {
        if (value === null || value === "") {
            throw new Error(`${key} is empty`);
        }
    }

    const datetimeRegex = /^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

    if (!datetimeRegex.test(flight.arrival)) {
        throw new Error("Arrival property invalid format");
    }

    if (!datetimeRegex.test(flight.departure)) {
        throw new Error("Departure property invalid format");
    }

    const rows = await db.query("SELECT Serial_no FROM Airplane");
    const data = helper.emptyOrRows(rows);
    const airplaneSerialNumbers = [];
    data.forEach(row => {
        airplaneSerialNumbers.push(row.Serial_no);
    });

    if (!airplaneSerialNumbers.includes(flight.airplaneSerialNo)) {
        throw new Error("Provided airplane serial number does not exist");
    }
    
    const result = await db.query(`INSERT INTO Flight VALUES (
        "${flight.id}", 
        "${flight.status}", 
        "${flight.airlineName}", 
        "${flight.destination}", 
        "${flight.arrival}", 
        "${flight.departure}", 
        "${flight.airplaneSerialNo}"
    )`);

    let message = "Flight could not be created";

    if (result.affectedRows) {
        message = "Flight created";
    }

    return { message };
}

module.exports = {
    getAll,
    getById,
    create,
};