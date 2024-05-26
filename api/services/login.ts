import db from "./db";
import helper from "../helper";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import { Err } from "../Types";

async function fetchClient(email: string, userInputPassword: string) {
	if (!email || !userInputPassword) {
		const error = new Err(
			"Invalid arguments: email and userInputPassword are required"
		);
		error.statusCode = 400;
		throw error;
	}

	//tu pobranie jest soli
	const queryGetSalt = "SELECT salt FROM Users WHERE email = ?";
	let saltResult = await db.query(queryGetSalt, [email]);
	saltResult = helper.emptyOrRows(saltResult) as RowDataPacket[];

	if (saltResult.length === 0) {
		const error = new Err("User not found");
		error.statusCode = 404;
		throw error;
	}

	const salt = saltResult[0].salt;

	//tu haszujes haslo od uzytkowniak
	const hashedPassword = await bcrypt.hash(userInputPassword, salt);
	const queryCheckUser =
	"SELECT uid, first_name FROM Users WHERE email = ? AND password = ?";
	const userExistsRows = await db.query(queryCheckUser, [
	email,
	hashedPassword,
	]);
	const userExistsData = helper.emptyOrRows(userExistsRows);
	if (userExistsData.length > 0) {
		await db.query("CALL Logowanie(?, ?, TRUE)", [userExistsData[0].first_name, email]);
	} else {
		await db.query("CALL Logowanie(?, ?, FALSE)", [null, email]);
		const error = new Err("Incorrect email or password");
		error.statusCode = 401;
		throw error;
		
	}
	

	//pobranie roli uzytkownika przy uzyciu endpointa employees
	const queryGetRole = "SELECT role FROM Employees WHERE Users_uid = ?";
	let roleResult = await db.query(queryGetRole, [userExistsData[0].uid]);
	let userRole = helper.emptyOrRows(roleResult);

	if (userRole.length === 0) {
		userRole = [{ role: "client" }];
		console.log(userRole);
	}
	console.log(userRole[0].role);

	return { response: { statusCode: 200 }, email, userRole: userRole[0].role };
}

export default {
	fetchClient,
};
