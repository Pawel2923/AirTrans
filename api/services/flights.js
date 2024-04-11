const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`SELECT arrival, departure, CONVERT(CAST(CONVERT(Destination USING LATIN1) AS BINARY) USING UTF8) destination, id FROM Flight LIMIT ${offset},${config.listPerPage}`);

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    };
}

module.exports = {
    getAll
};