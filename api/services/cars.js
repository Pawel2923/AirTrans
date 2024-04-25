const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const carProperties = [
    "Id",
    "Brand",
    "Model",
    "Price_per_day",
    "Production_year",
    "Licence_plate",
];

async function getAllCars(
    page = 1,
    limit = config.listPerPage,
    tableName = "Cars"
) {
    limit = parseInt(limit);
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query("SELECT ?? FROM ?? LIMIT ?, ?", [
        carProperties,
        tableName,
        offset,
        limit,
    ]);
    const data = helper.emptyOrRows(rows);

    const pages = await helper.getPages(tableName, limit);

    const meta = {
        page,
        pages,
    };

    return {
        data,
        meta,
        response: { message: `Successfully fetched data`, statusCode: 200 },
    };
}

module.exports = {
    getAllCars,
};