const db = require("./db");
const helper = require("../helper");

async function getData () {
    let rows = await db.query("SELECT brand, model, production_year, transmission_type, fuel_type, price_per_day, path_to_img FROM Cars LIMIT 3");
    const cars = helper.emptyOrRows(rows);

    rows = await db.query("SELECT name, capacity, price_per_day, path_to_img FROM Parking_info");
    const parkingInfo = helper.emptyOrRows(rows);

    const data = { cars, parkingInfo };

    return {
        data,
        response: { message: `Successfully fetched data`, statusCode: 200 },
    };
}

module.exports = {
    getData,
};