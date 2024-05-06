
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
async function getOneCar(carId, tableName = "Cars") {
    const row = await db.query("SELECT * FROM ?? WHERE Id = ?", [
        tableName,
        carId,
    ]);

    const data = helper.emptyOrRows(row);

    if (!data) {
        return {
            data: null,
            response: { message: `Car with ID ${carId} not found`, statusCode: 404 },
        };
    }

    return {
        data,
        response: { message: `Successfully fetched car with ID ${carId}`, statusCode: 200 },
    };
}
async function getById(carId, tableName = "Cars") {
    const row = await db.query("SELECT * FROM ?? WHERE Id = ?", [
        tableName,
        carId,
    ]);

    const data = helper.emptyOrRows(row);

    if (!data) {
        return {
            data: null,
            response: { message: `Car with ID ${carId} not found`, statusCode: 404 },
        };
    }
}

async function create(car) {
    const { Id, ...carWithoutId } = car; 

    try {
        await validateCar(carWithoutId);

        const carExists = await db.query("SELECT * FROM Cars WHERE License_plate=?", [carWithoutId.License_plate]);

        if (carExists.length > 0) {
            const error = new Error("Auto o podanym numerze rejestracyjnym już istnieje!");
            error.statusCode = 409;
            throw error;
        }

        // Insert the new car into the database
        const result = await db.query(
            "INSERT INTO Cars (Brand, Model, Price_per_day, Production_year, License_plate, Fuel_type, Transmission_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                carWithoutId.Brand,
                carWithoutId.Model,
                carWithoutId.Price_per_day,
                carWithoutId.Production_year,
                carWithoutId.License_plate,
                carWithoutId.Fuel_type,
                carWithoutId.Transmission_type,
            ]
        );

        if (result.affectedRows) {
            return {
                data: carWithoutId,
                statusCode: 201,
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
async function update(carId, car) {
    try {
      
      car.Id = carId;
  
      await validateCar(car);
  
      
      const carExists = await db.query("SELECT * FROM Cars WHERE Id=?", [car.Id]);
  
      if (carExists.length === 0) {
        const error = new Error("Samochód o podanym Id nie istnieje");
        error.statusCode = 404;
        throw error;
      }
  
      const result = await db.query(
        "UPDATE Cars SET Brand=?, Model=?, Price_per_day=?, Production_year=?, License_plate=?, Fuel_type=?, Transmission_type=? WHERE Id=?",
        [
          car.Brand,
          car.Model,
          car.Price_per_day,
          car.Production_year,
          car.License_plate,
          car.Fuel_type,
          car.Transmission_type,
          car.Id,
        ]
      );
  
     
      if (result.affectedRows) {
        return {
          data: car,
          statusCode: 200,
          message: "Samochód zaktualizowany pomyślnie",
        };
      } else {
        throw new Error("Samochód nie mógł zostać zaktualizowany");
      }
    } catch (error) {
      throw error;
    }
  }
  
  async function remove(id) {
    
        const carExists = await db.query("SELECT * FROM Cars WHERE Id=?",
         [id]);

        if (carExists.length === 0) {
            const error = new Error("Samochód o podanym Id nie istnieje");
            error.statusCode = 404;
            throw error;
        }

        const rows = await db.query("DELETE FROM Cars WHERE Id=?", [id]);

        if (rows.affectedRows === 0) {
            throw new Error("Samochód nie został usunięty");
        }

        return {
            message: "Samochód usunięty pomyślnie",
            statusCode: 201
        };
   
}

module.exports = {
    getAllCars,
    getOneCar,
    create,
    update,
    remove,
    getById,
};
