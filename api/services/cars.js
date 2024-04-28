const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllCars(page = 1, limit = config.listPerPage, tableName = "Cars") {
    limit = parseInt(limit);

    const offset = helper.getOffset(page, config.listPerPage);

    const rows = await db.query("SELECT * FROM ?? LIMIT ?,?", [
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

async function create(car) {
    try {
        await validateCar(car);

        
        const carExists = await db.query("SELECT * FROM Cars WHERE Id=?", [car.Id]);

        if (carExists.length > 0) {
            const error = new Error("Auto o podanym Id już istnieje");
            error.statusCode = 409;
            throw error;
        }

        // Wstaw nowy samochód do bazy danych
        const result = await db.query(
            "INSERT INTO Cars (Id, Brand, Model, Price_per_day, Production_year, License_plate, Fuel_type, Transmission_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                car.Id,
                car.Brand,
                car.Model,
                car.Price_per_day,
                car.Production_year,
                car.License_plate,
                car.Fuel_type,
                car.Transmission_type,
            ]
        );

        
        if (result.affectedRows) {
            return {
                data: car,
                message: "Auto zostało dodane!",
            };
        } else {
            throw new Error("Auto nie zostało dodane!");
        }
    } catch (error) {
        throw error;
    }
}

async function validateCar(car) {
    if (!car.Brand || !car.Model || !car.Price_per_day || !car.Production_year || !car.License_plate || !car.Fuel_type || !car.Transmission_type) {
        const error = new Error("Brak wymaganych pól!");
        error.statusCode = 400;
        throw error;
    }
}

module.exports = {
    getAllCars,
    create,
};
