const db = require("./db");
const helper = require("../helper");

async function getAll() {
	const rows = await db.query("SELECT * FROM Contact_info");
	const data = helper.emptyOrRows(rows);

	return {
		data,
		response: { message: `Successfully fetched data`, statusCode: 200 },
	};
}
module.exports = { getAll };
