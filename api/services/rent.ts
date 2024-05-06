import db from "./db";
import helper from "../helper";
import config from "../config";

async function getAllRentals(
    page = 1,
    limit = config.listPerPage,
    tableName = "Rentals"
) {
    const offset = helper.getOffset(page, config.listPerPage);

    const rows = await db.query("SELECT * FROM ?? LIMIT ?, ?", [
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

export default {
    getAllRentals,
};