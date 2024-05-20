
import db from "./db";
import helper from "../helper";
import config from "../config";
import { Err } from "../Types";
import { ResultSetHeader } from "mysql2";

async function getAllRentals(
  page = 1,
  limit = config.listPerPage,
  tableName = "Rentals"
) {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
      "SELECT Rentals.*, Users.first_name AS user_first_name FROM ?? AS Rentals LEFT JOIN Users ON Rentals.Users_uid = Users.uid LIMIT ?, ?",
      [tableName, offset, limit]
  );

  const data = helper.emptyOrRows(rows).map((row) => ({
      ...row,
      since: formatDate(row.since),
      until: formatDate(row.until),
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




function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  async function createRental(rentalData: any) {
    try {
        const carAvailability = await db.query(
        "SELECT '' FROM Rentals WHERE Cars_id = ? AND until > NOW()",
        [rentalData.Cars_id,rentalData.until]
      );

      if (helper.emptyOrRows(carAvailability).length > 0) {
        const error = new Err(
          "Ten samochód jest już wypożyczony w podanym terminie."
        );
        error.statusCode = 409;
        throw error;
      }
  
      let result = await db.query(
        "INSERT INTO Rentals (since,until, status,Users_uid, Cars_id) VALUES (?, ?, ?, ?, ?)",
        [
          rentalData.since,
          rentalData.until,
          rentalData.status,
          rentalData.Users_uid,
          rentalData.Cars_id,
        ]
      );
      result = result as ResultSetHeader;
  
      if (result.affectedRows) {
        return {
          data: rentalData,
          statusCode: 201,
          message: "Wypożyczenie zostało dodane pomyślnie.",
        };
      } else {
        throw new Err("Wypożyczenie nie zostało dodane.");
      }
    } catch (error) {
      throw error;
    }
  }
  
  async function removeRent(Id: number) {
    try {
      const rentExists = await db.query("SELECT * FROM Rentals WHERE id=?", [
        Id,
      ]);
  
      if (helper.emptyOrRows(rentExists).length === 0) {
        const error = new Err("Wypożyczenie nie istnieje!");
        error.statusCode = 404;
        throw error;
      }
  
      let result = await db.query("DELETE FROM Rentals WHERE id=?", [Id]);
      result = result as ResultSetHeader;
  
      if (result.affectedRows === 0) {
        throw new Err("Wypożyczenie nie zostało usunięte!");
      }
      return {
        message: "Wypożyczenie zostało usunięte!",
        statusCode: 201,
      };
    } catch (error) {
      throw error;
    }
  }
  
  async function getById(rentId: number, tableName = "Rentals") {
    try {
      const rows = await db.query("SELECT * FROM ?? WHERE id = ?", [
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
  
  async function updateRent(rentId: number, rent: any) {
    try {
        rent.Id = rentId;
  
        
        const rentExists = await db.query("SELECT * FROM Rentals WHERE id=?", [rent.Id]);

        if (helper.emptyOrRows(rentExists).length === 0) {
            const error = new Err("Wypożyczenie nie istnieje!");
            error.statusCode = 404;
            throw error;
        }
  
       
        let result = await db.query(
            "UPDATE Rentals SET since=?, until=?, status=?, Users_uid=?, Cars_id=? WHERE id=?",
            [rent.since,
            rent.until,
            rent.status, 
            rent.Users_uid,
            rent.Cars_id,
            rent.id]
        );
        result = result as ResultSetHeader;
        
        if (result.affectedRows) {
            return {
                data: rent,
                statusCode: 200,
                message: "Wypożyczenie zostało zaktualizowane!",
            };
        } else {
            throw new Err("Wypożyczenie nie zostało zaktualizowane!");
        }
    } catch (error) {
        throw error;
    }
  }

export default {
    getAllRentals,
    removeRent,
    createRental,
    updateRent,
    getById,
};
