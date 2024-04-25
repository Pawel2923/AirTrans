const express = require("express");
const router = express.Router();
car = require("../services/cars");

async function getAllCars(tableName = "Cars") {
    const rows = await db.query("SELECT ?? FROM ??", [carProperties, tableName]);
    const data = helper.emptyOrRows(rows);

    return {
        data,
        response: { message: `Successfully fetched data`, statusCode: 200 },
    };
}
