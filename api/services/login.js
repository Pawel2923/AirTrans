const db = require("./db");
const bcrypt = require("bcryptjs");

async function fetchClient(email, userInputPassword) {
	if (!email || !userInputPassword) {
		return {
			response: { message: "Invalid arguments: email and userInputPassword are required", statusCode: 400 },
		};
	}

	const queryCheckUser = "SELECT IF(COUNT(*) = 0, 0, 1) AS user_exists  FROM Client WHERE Email = ?";
	const rows = await db.query(queryCheckUser, [email]);

	if (rows.length === 0 || rows[0].user_exists === 0) {
		return {
			response: { message: "User not found", statusCode: 404 },
		};
	}

	const storedHashedPassword = rows[0].Password;

	// Compare the user input password with the hashed password stored in the database
	const passwordMatch = await bcrypt.compare(userInputPassword, storedHashedPassword);

	if (!passwordMatch) {
		return {
			response: { message: "Invalid password", statusCode: 401 },
		};
	}

	// Password is correct, so return a response with status code 200
	return { response: { statusCode: 200 }, id: email };
}

module.exports = {
	fetchClient,
};

