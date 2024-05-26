import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err, User } from "../Types";
import { ResultSetHeader } from "mysql2";

async function get(
	page = 1,
	limit = config.listPerPage,
	filter?: string,
	sort?: string
) {
	const offset = helper.getOffset(page, limit);

	// Build query
	let query = "SELECT u.id, u.email, u.first_name, u.last_name, u.phone_number, u.address, u.gender, u.birth_date,u.create_time, u.img, e.role FROM Employees e RIGHT JOIN Users u ON e.Users_id=u.id";
	let queryParams = [];

	// Check if filter is provided
	if (filter) {
		const filterQuery = helper.buildFilterQuery(filter);
		query += filterQuery.query;
		filterQuery.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	// Check if sort is provided
	if (sort) {
		const sortQuery = helper.buildSortQuery(sort);
		query += sortQuery.query;
		sortQuery.queryParams.forEach((param) => {
			queryParams.push(param);
		});
	}

	// Add limit and offset
	query += ` LIMIT ? OFFSET ?`;
	queryParams.push(limit, offset);

	// Execute query
	const result = await db.query(query, queryParams);
	const data = helper.emptyOrRows(result);

	// check if data is empty
	if (data.length === 0) {
		throw new Err("No users found", 404);
	}

	// Get total pages
	const pages = await helper.getPages("Users", limit);

	// Generate meta data
	const meta = { page, pages, limit, total: data.length };

    return {
		data,
		meta,
		message: "Successfully fetched users",
	};
}

async function getRoles() {
	const query = "SELECT DISTINCT role FROM Employees";
	const result = await db.query(query);
	const data = helper.emptyOrRows(result);

	const roles: string[] = data.map((role) => role.role);
	roles.push("client");

	return {
		data: roles,
		message: "Successfully fetched roles",
	};
};

async function update(id: number, user: User) {
	if (id !== user.id) {
		throw new Err("Invalid user ID", 400);
	}

	const checkResult = await db.query("SELECT '' FROM Users WHERE id = ?", [id]);
	const checkRows = helper.emptyOrRows(checkResult);

	if (checkRows.length === 0) {
		throw new Err("User not found", 404);
	}

	const result = await db.query("UPDATE Users SET ? WHERE id = ?", [user, id]);
	const affectedRows = (result as ResultSetHeader).affectedRows;

	if (affectedRows === 0) {
		throw new Err("Could not update user");
	}

	return {
		data: user,
		message: "User updated successfully",
	};
}

async function updateRole(id: number, role: string) {
	// check if new role is valid
	if (role !== "admin" && role !== "client" && role !== "parking") {
		throw new Err("Invalid role", 400);
	}
	
	const checkResult = await db.query("SELECT role FROM Users u LEFT JOIN Employees e ON e.Users_id=u.id WHERE id = 9;", [id]);
	const checkRows = helper.emptyOrRows(checkResult);

	if (checkRows.length === 0) {
		throw new Err("User not found", 404);
	}

	if (checkRows[0].role === null) {
		// if new role isn't client add new row in Employees table
		if (role !== "client") {
			const result = await db.query("INSERT INTO Employees (Users_id, role) VALUES (?, ?)", [id, role]);
			if ((result as ResultSetHeader).affectedRows === 0) {
				throw new Err("Could not update role");
			}

			return {
				message: "Role updated successfully",
			};
		} else {
			throw new Err("User is already a client", 400);
		}
	}

	// if new role is the same as the old one throw 400 error
	if (checkRows[0].role === role) {
		throw new Err("User is already a " + role, 400);
	}
	

	// Remove row from Employees table if new role is client
	if (role === "client") {
		const result = await db.query("DELETE FROM Employees WHERE Users_id = ?", [id]);
		if ((result as ResultSetHeader).affectedRows === 0) {
			throw new Err("Could not update role");
		}

		return {
			message: "Role updated successfully",
		};
	}

	let result = await db.query("UPDATE Employees SET role = ? WHERE Users_id = ?", [role, id]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Could not update role");
	}

	return {
		message: "Role updated successfully",
	};
}

async function addImg(id: number, path: string) {
	const checkResult = await db.query("SELECT '' FROM Users WHERE id = ?", [id]);

	if (helper.emptyOrRows(checkResult).length === 0) {
		throw new Err("User not found", 404);
	}

	if (!path) {
		throw new Err("Invalid path", 400);
	}

	const result = await db.query("UPDATE Users SET img = ? WHERE id = ?", [path, id]);
	const affectedRows = (result as ResultSetHeader).affectedRows;

	if (affectedRows === 0) {
		throw new Err("Could not update img");
	}

	return {
		message: "Image uploaded successfully",
	};
}

async function remove(id: number) {
	const checkResult = await db.query("SELECT '' FROM Users WHERE id = ?", [id]);

	if (helper.emptyOrRows(checkResult).length === 0) {
		throw new Err("User not found", 404);
	}
	
	let result = await db.query("DELETE FROM Users WHERE id = ?", [id]);
	result = result as ResultSetHeader;

	if (result.affectedRows === 0) {
		throw new Err("Could not delete user");
	}

	return {
		message: "User deleted successfully",
	};
}

export default {
	get,
	getRoles,
	update,
	updateRole,
	addImg,
	remove,
};
