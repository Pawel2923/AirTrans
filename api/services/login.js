const db = require("./db");

async function fetchClient(email, userInputPassword) {
	const query = "SELECT Email, Password FROM Client WHERE Email = ?";

	const rows = await db.query(query, [email]);

	if (rows.length === 0) {
		return {
			response: { message: "User not found", statusCode: 404 },
		};
	}

	const storedHashedPassword = rows[0].Password;

	return { response: { statusCode: 200 }, id: rows[0].Email, storedHashedPassword, userInputPassword };
}

module.exports = {
	fetchClient,
};
