const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { response } = require("express");

async function getAllParking(
  page = 1,
  limit = config.listPerPage,
  tableName = "Parking_reservations"
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
    Since: formatDate(row.Since),
    Until: formatDate(row.Until),
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

  async function createParking(parkingData) {
    try {
        const parkingAvailability = await db.query(
            "SELECT * FROM Parking_reservations WHERE Parking_level = ? AND Space_id = ? AND ((Since <= ? AND Until >= ?) OR (Since <= ? AND Until >= ?) OR (Since >= ? AND Until <= ?))",
            [
                parkingData.Parking_level,
                parkingData.Space_id,
                parkingData.Since,
                parkingData.Since,
                parkingData.Until,
                parkingData.Until,
                parkingData.Since,
                parkingData.Until
            ]
        );
        if (parkingAvailability.length > 0) {
            const error = new Error(
                "Parking is already reserved for the given time period"
            );
            error.statusCode = 409;
            throw error;
        }

        const result = await db.query(
            "INSERT INTO Parking_reservations (Client_id, Since, Until, Parking_level, Space_id, License_plate, Price_per_day) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                parkingData.Client_id,
                parkingData.Since,
                parkingData.Until,
                parkingData.Parking_level,
                parkingData.Space_id,
                parkingData.License_plate,
                parkingData.Price_per_day
            ]
        );

        if (result.affectedRows) {
            return {
                data: parkingData,
                statusCode: 201,
                message: "Parking reserved successfully"
            };
        } else {
            throw new Error("Failed to reserve parking");
        }
    } catch (error) {
        throw error;
    }
}
async function removeParking(id) {
    
      const parkingExist = await db.query(
        "SELECT * FROM Parking_reservations WHERE id = ?",
        [id]
      );
      if (parkingExist.length === 0) {
        const error = new Error("Parking not found");
        error.statusCode = 404;
        throw error;
      }
      const rows = await db.query("DELETE FROM Parking_reservations WHERE id = ?", [
        id,
      ]);
      if(rows.affectedRows===0){
        throw new Error("Failed to delete parking");
      }
      return {
        message: "Parking deleted successfully",
        statusCode: 200,
      };
  
}
async function getById(parkingId, tableName = "Parking_reservations") {
    try {
        const rows = await db.query("SELECT * FROM ?? WHERE id = ?", [
            tableName,
            parkingId
        ]);
        const data=helper.emptyOrRows(rows);
        if(!data){
          return {
            data:null,
            response:{
              message: `Parking with ID ${parkingId} not found`,
              statusCode: 404
            }
          };
       }
        return {
          data,
          response:{
            message: `Successfully fetched data for parking with ID ${parkingId}`,
            statusCode: 200
          }
        };
    } catch (error) {
        throw error;
    }
}

async function updateParking(id, parkingId) {
  try{
    parking.id = parkingId;

    const parkingExist = await db.query("SELECT * FROM Parking_reservations WHERE id = ?", [id]);
    if(parkingExist.length===0){
      const error = new Error("Parking not found");
      error.statusCode = 404;
      throw error;
    }

    const result = await db.query("UPDATE Parking_reservations SET Client_id=?, Since=?, Until=?, Parking_level=?, Space_id=?, License_plate=?, Price_per_day=? WHERE id=?",
    [
        parkingId.Client_id,
        parkingId.Since,
        parkingId.Until,
        parkingId.Parking_level,
        parkingId.Space_id,
        parkingId.License_plate,
        parkingId.Price_per_day,
        parkingId.id
    ]
    );

    if(result.affectedRows){
      return{
        data: parkingId,
        message: "Parking updated successfully",
        statusCode: 200
      };
    }else{
      throw new Error("Failed to update parking");
    }
  }
  catch(error){
    throw error;
  
  }
}
module.exports = {
    getAllParking,
    createParking,
    removeParking,
    getById,
    updateParking,
    };

