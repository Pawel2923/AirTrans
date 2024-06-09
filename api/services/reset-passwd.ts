import db from "./db";
import { Err } from "../Types";
import bcrypt from "bcryptjs";
import helper from "../helper";
import { ResultSetHeader } from "mysql2";

// save token in db
async function saveToken(token: string, email: string) {
  // check if user exists if exists get user id
  const user = await db.query("SELECT id FROM Users WHERE email = ?", [email]);
  const userData = helper.emptyOrRows(user);

  if (userData.length === 0) {
    throw new Err("User not found", 404);
  }
  const userId = userData[0]?.["id"] as number;

  const result = (await db.query(
    "INSERT INTO Reset_password (id, token, Users_id) VALUES (DEFAULT, ?, ?)",
    [token, userId]
  )) as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to save token");
  }

  return {
    message: "Token saved",
    statusCode: 200,
  };
}

// check if token exists in db and if it's not expired
async function verifyToken(token: string) {
  const tokenQueryResult = await db.query(
    "SELECT created_at, used_at FROM Reset_password WHERE token = ?",
    [token]
  );
  const tokenExist = helper.emptyOrRows(tokenQueryResult);

  if (tokenExist.length === 0) {
    throw new Err("Token not found", 404);
  }

  if (tokenExist[0]?.["used_at"] !== null) {
    throw new Err("Token already used", 409);
  }

  const createdAt = new Date(tokenExist[0]?.["created_at"] as string);
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const diffInHours = diff / (1000 * 3600);

  if (diffInHours > 24) {
    throw new Err("Token expired", 410);
  }

  return {
    message: "Token found",
    statusCode: 200,
  };
}

// reset user password
async function resetPasswd(token: string, password: string) {
  const tokenQueryResult = await db.query(
    "SELECT Users_id FROM Reset_password WHERE token = ?",
    [token]
  );
  const tokenExist = helper.emptyOrRows(tokenQueryResult);

  if (tokenExist.length === 0) {
    throw new Err("Token not found", 404);
  }

  const userId = tokenExist[0]?.["Users_id"] as number;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = (await db.query(
    "UPDATE Users SET password = ?, salt = ? WHERE id = ?",
    [hashedPassword, salt, userId]
  )) as ResultSetHeader;

  if (result.affectedRows === 0) {
    throw new Err("Failed to reset password");
  }

  const updateToken = (await db.query(
    "UPDATE Reset_password SET used_at = CURRENT_TIMESTAMP WHERE token = ?",
    [token]
  )) as ResultSetHeader;

  if (updateToken.affectedRows === 0) {
    throw new Err("Failed to update token");
  }

  return {
    message: "Password reset",
    statusCode: 200,
  };
}

export default {
  saveToken,
  verifyToken,
  resetPasswd,
};
