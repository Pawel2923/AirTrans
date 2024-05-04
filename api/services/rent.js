const db = require("./db");
const helper = require("../helper");
const config = require("../config");

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

  
  const data = rows.map(row => ({
      ...row,
      Rental_date: formatDate(row.Rental_date),
      Return_date: formatDate(row.Return_date)
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
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


async function createRental(rentalData) {
    try {
      
      await validateRental(rentalData);
  
     
      const carAvailability = await db.query("SELECT * FROM Rentals WHERE Cars_id = ? AND Return_date > NOW()", [rentalData.cars_id]);
      if (carAvailability.length > 0) {
        const error = new Error("Ten samochód jest już wypożyczony w podanym terminie.");
        error.statusCode = 409;
        throw error;
      }
  
      
      const result = await db.query(
        "INSERT INTO Rentals (Rental_date, Return_date, Status, Client_id, Cars_id) VALUES (?, ?, ?, ?, ?)",
        [
            rentalData.rental_date, 
            rentalData.return_date, 
            rentalData.status, 
            rentalData.client_id, 
            rentalData.cars_id]
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
  
module.exports = {
    getAllRentals,
    createRental,
};