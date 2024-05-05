const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { update } = require("./flights");

async function getAllRentals(
  page = 1,
  limit = config.listPerPage,
  tableName = "Rentals"
) {
  limit = parseInt(limit);

  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query("SELECT * FROM ?? LIMIT ?, ?", [
    tableName,
    offset,
    limit,
  ]);

  const data = rows.map((row) => ({
    ...row,
    Rental_date: formatDate(row.Rental_date),
    Return_date: formatDate(row.Return_date),
  }));

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

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function createRental(rentalData) {
  try {
    const carAvailability = await db.query(
      "SELECT * FROM Rentals WHERE Cars_id = ? AND Return_date > NOW()",
      [rentalData.Cars_id]
    );
    if (carAvailability.length > 0) {
      const error = new Error(
        "Ten samochód jest już wypożyczony w podanym terminie."
      );
      error.statusCode = 409;
      throw error;
    }

    const result = await db.query(
      "INSERT INTO Rentals (Rental_date, Return_date, Status, Client_id, Cars_id) VALUES (?, ?, ?, ?, ?)",
      [
        rentalData.Rental_date,
        rentalData.Return_date,
        rentalData.Status,
        rentalData.Client_id,
        rentalData.Cars_id,
      ]
    );

    if (result.affectedRows) {
      return {
        data: rentalData,
        statusCode: 201,
        message: "Wypożyczenie zostało dodane pomyślnie.",
      };
    } else {
      throw new Error("Wypożyczenie nie zostało dodane.");
    }
  } catch (error) {
    throw error;
  }
}

async function removeRent(Id) {
  try {
    const rentExists = await db.query("SELECT * FROM Rentals WHERE Id=?", [
      Id,
    ]);

    if (rentExists.length === 0) {
      const error = new Error("Wypożyczenie nie istnieje!");
      error.statusCode = 404;
      throw error;
    }

    const result = await db.query("DELETE FROM Rentals WHERE Id=?", [Id]);

    if (result.affectedRows === 0) {
      throw new Error("Wypożyczenie nie zostało usunięte!");
    }
    return {
      message: "Wypożyczenie zostało usunięte!",
      statusCode: 201,
    };
  } catch (error) {
    throw error;
  }
}

async function getById(rentId, tableName = "Rentals") {
  try {
    const rows = await db.query("SELECT * FROM ?? WHERE Id = ?", [
      tableName,
      rentId,
    ]);
    const data = helper.emptyOrRows(rows);

    if (!data) {
      return {
        data: null,
        response: {
          message: `Wypożyczenie o ID ${rentId} nie istnieje`,
          statusCode: 404,
        },
      };
    }

    return {
      data,
      response: {
        message: `Successfully fetched data for rental with ID ${rentId}`,
        statusCode: 200,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function updateRent(rentId, rent) {
  try {
      rent.Id = rentId;

      
      const rentExists = await db.query("SELECT * FROM Rentals WHERE Id=?", [rent.Id]);
      if (rentExists.length === 0) {
          const error = new Error("Wypożyczenie nie istnieje!");
          error.statusCode = 404;
          throw error;
      }

     
      const result = await db.query(
          "UPDATE Rentals SET Rental_date=?, Return_date=?, Status=?, Client_id=?, Cars_id=? WHERE Id=?",
          [rent.Rental_date,
          rent.Return_date,
          rent.Status, 
          rent.Client_id,
          rent.Cars_id,
          rent.Id]
      );

      
      if (result.affectedRows) {
          return {
              data: rent,
              statusCode: 200,
              message: "Wypożyczenie zostało zaktualizowane!",
          };
      } else {
          throw new Error("Wypożyczenie nie zostało zaktualizowane!");
      }
  } catch (error) {
      throw error;
  }
}


module.exports = {
  getAllRentals,
  removeRent,
  createRental,
  updateRent,
  getById,
};