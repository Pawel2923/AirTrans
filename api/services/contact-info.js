const db = require("./db");
const helper = require("../helper");

async function getContactInfo() {
    const rows = await db.query("SELECT * FROM Contact_info");
    const data = helper.emptyOrRows(rows);

    return { data };
}
module.exports = { getContactInfo };