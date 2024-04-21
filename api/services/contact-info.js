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

async function update(name, info) {
	const contactInfoExists = await db.query(
		"SELECT IF(COUNT(*)=0,0,1) result FROM Contact_info WHERE name = ?",
		[name]
	);

	if (!contactInfoExists[0].result) {
		throw new Error(
			JSON.stringify({
				statusMessage: "Contact info not found",
				statusCode: 404,
			})
		);
	}

	const result = await db.query(
		"UPDATE Contact_info SET info = ? WHERE name = ?",
		[info, name]
	);

	if (result.affectedRows) {
		return {
			data: { name, info },
			response: {
				message: `Successfully updated contact info`,
				statusCode: 200,
			},
		};
	} else {
		throw new Error(
			JSON.stringify({
				statusMessage: "Could not update contact info",
				statusCode: 500,
			})
		);
	}
}

module.exports = {
	getAll,
	update,
};
