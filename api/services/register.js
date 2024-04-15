const db = require("./db");

async function registerClient(First_name, Last_name, Login, Password, Email) {
	const checkQuery = "SELECT COUNT(*) as count FROM Client WHERE Email = ?";

	const checkResult = await db.query(checkQuery, [Email]);
	if (checkResult[0].count > 0) {
		return {
			message: "User with this email already exists",
			statusCode: 409,
		};
	}

	const insertQuery =
		"INSERT INTO Client (First_name, Last_name, Login, Password, Email) VALUES (?, ?, ?, ?, ?)";
	const insertResult = await db.query(insertQuery, [
		First_name,
		Last_name,
		Login,
		Password,
		Email,
	]);

	if (insertResult.affectedRows === 1) {
		return { message: "User registered successfully", statusCode: 201 };
	}

	return { message: "Error registering user", statusCode: 500 };
}

module.exports = {
	registerClient,
};
