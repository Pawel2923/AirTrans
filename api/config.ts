import mysql from "mysql2/promise";

const config = {
	db: {
		host: process.env.DB_HOST,
		user: "client",
		password: process.env.DB_CLIENT_PASSWORD,
		database: process.env.DB_NAME,
		connectTimeout: 60000,
	},
	listPerPage: 10,
	getDbUser,
	employeeRoles: [
		"admin",
		"atc",
		"ground_crew",
		"airport_staff",
		"parking_staff",
		"rental_staff",
	],
};

export default config;

function getDbUser(role: string) {
	if (role === "admin") {
		config.db.password = process.env.DB_ADMIN_PASSWORD;
	} else if (role === "atc") {
		config.db.password = process.env.DB_ATC_PASSWORD;
	} else if (role === "ground_crew") {
		config.db.password = process.env.DB_GROUND_CREW_PASSWORD;
	} else if (role === "aiport_staff") {
		config.db.password = process.env.DB_AIRPORT_STAFF_PASSWORD;
	} else if (role === "parking_staff") {
		config.db.password = process.env.DB_PARKING_STAFF_PASSWORD;
	} else if (role === "rental_staff") {
		config.db.password = process.env.DB_RENTAL_STAFF_PASSWORD;
	} else {
		config.db.password = process.env.DB_CLIENT_PASSWORD;
		config.db.user = "client";
		return;
	}

	config.db.user = role;
}
