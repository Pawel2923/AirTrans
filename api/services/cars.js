const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAllCars(
    page = 1, 
    limit = config.listPerPage,
     tableName = "Cars") {
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
    // Walidacja szczegółów samochodu
    await validateCar(car);

    // Sprawdzenie, czy samochód o podanym ID już istnieje
    const carExists = await db.query("SELECT '' FROM Cars WHERE id=?", [
        car.id,
    ]);

    if (carExists.length > 0) {
        const error = new Error("Car with this id already exists");
        error.statusCode = 409;
        throw error;
    }

    // Wstawienie nowego samochodu do bazy danych
    const result = await db.query(
        "INSERT INTO Cars VALUES (?, ?, ?, ?, ?, ?)",
        [
            car.Id,
            car.Brand,
            car.Model,
            car.Price_per_day,
            car.Producer_year,
            car.License_plate,
        ]
    );

    // Jeśli wstawienie zakończyło się sukcesem, zwróć wiadomość o powodzeniu, w przeciwnym razie zgłoś błąd
    if (result.affectedRows) {
        return {
            data: car,
            message: "Car created successfully",
        };
    } else {
        throw new Error("Car could not be created");
    }
}

async function validateCar(car) {
    if (!car.Id || !car.Brand || !car.Model || !car.Price_per_day || !car.Producer_year || !car.License_plate) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;
    }
}       


module.exports = {
    getAllCars,
    create,
};
