import db from "./db";
import bcrypt from "bcryptjs";
import helper from "../helper";
import { ResultSetHeader } from "mysql2";
import { Err } from "../Types";

async function registerClient(
	firstName: string,
	lastName: string,
	login: string,
	password: string,
	email: string
) {
	const checkQuery = "SELECT '' FROM Client WHERE Email = ?";
	let checkResult = await db.query(checkQuery, [email]);
	checkResult = helper.emptyOrRows(checkResult);

	if (checkResult.length > 0) {
		throw new Err("User with this email already exists", 409);
	}

	const salt = await bcrypt.genSalt(10); //tu tworzy sol

	const hashedPassword = await bcrypt.hash(password, salt); // tu hasuje

	const insertQuery =
		"INSERT INTO Client (First_name, Last_name, Login, Password, Email, Salt) VALUES (?, ?, ?, ?, ?, ?)";
	let insertResult = await db.query(insertQuery, [
		firstName,
		lastName,
		login,
		hashedPassword,
		email,
		salt, //zapis soli
	]);
	insertResult = insertResult as ResultSetHeader;

	if (insertResult.affectedRows === 0) {
		throw new Err("Error registering user");
	}

	return "User registered successfully";
}

export default {
	registerClient,
};
