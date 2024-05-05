const db = require("./db");
const helper = require("../helper");
const config = require("../config");

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
        "SELECT * FROM Parking_reservations WHERE Parking_id = ? AND Until > NOW()",
        [parkingData.Parking_id]
      );
      if (parkingAvailability.length > 0) {
        const error = new Error(
          "Parking is already reserved for the given time period"
        );
        error.statusCode = 409;
        throw error;
      }
  
      const result = await db.query(
        "INSERT INTO Parking_reservations (Client_id, Since, Until,Parking_level,Space_id,License_plate,Price_per_day) VALUES (?, ?, ?, ?, ?, ?, ?)",
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
  
     if(result.affectedRows) {
        return { 
        data: parkingData, 
        statusCode: 201,
        message: "Parking reserved successfully" 
    };
      }else{
        throw new Error("Failed to reserve parking");
      }
    }catch(error){
        throw error;
    }
    }
  

module.exports = {
    getAllParking,
    createParking,
    };

