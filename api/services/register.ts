import db from "./db";
import bcrypt from "bcryptjs";
import helper from "../helper";
import { ResultSetHeader } from "mysql2";
import { Err, Users } from "../Types";

async function registerClient(user: Users) {
  const checkQuery = "SELECT '' FROM Users WHERE email = ?";
  let checkResult = await db.query(checkQuery, [user.email]);
  checkResult = helper.emptyOrRows(checkResult);

  if (checkResult.length > 0) {
    await db.query("CALL Rejestracja(?, ?, FALSE)", [null, user.email]);
    throw new Err("User with this email already exists", 409);
  } else {
    await db.query("CALL Rejestracja(?, ?, TRUE)", [
      user.first_name,
      user.email,
    ]);
  }

  const salt = await bcrypt.genSalt(10); //tu tworzy sol

  const hashedPassword = await bcrypt.hash(user.password, salt); // tu hasuje

  const insertQuery =
    "INSERT INTO Users (first_name, last_name, password, email, salt) VALUES (?, ?, ?, ?, ?)";
  let insertResult = await db.query(insertQuery, [
    user.first_name ? user.first_name : null,
    user.last_name ? user.last_name : null,
    hashedPassword,
    user.email,
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
