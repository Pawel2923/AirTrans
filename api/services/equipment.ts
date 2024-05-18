import db from "./db";
import helper from "../helper";
import config from "../config";
import { Equipment ,Err} from "../Types";
import { ResultSetHeader } from "mysql2";

const equipmentProperties = [
    "serial_no",
    "type",
    "name",
    "location",
    "Employee_id",

];

async function getAll(
    page =1,
    limit = config.listPerPage,
    filter?: string,
    sort?: string
) {
    if (page < 1 || limit < 1) {
        const error = new Err("Invalid page or limit number");
        error.statusCode = 400;
        throw error;
    }
    const offset = helper.getOffset(page, limit);

    const { query, queryParams } = helper.buildQuery("Equipment", offset, limit, filter, sort);

    const rows=await db.query(query,queryParams);
    const data = helper.emptyOrRows(rows).map((row) => ({
        ...row,
    }));

    if (data.length === 0) {
        const error = new Err("No equipment found");
        error.statusCode = 404;
        throw error;
    }

    const pages = await helper.getPages("Equipment", limit);

    const meta = {
        page,
        pages,
    };

    return {
        data,
        meta,
        message: "Successfully fetched data",
    };
   
}
async function create(equipment: Equipment) {

    let equipmentExists = await db.query(
        "SELECT * FROM Equipment WHERE serial_no = ?",
        [equipment.serial_no]
    );
    equipmentExists = helper.emptyOrRows(equipmentExists);
    if (equipmentExists.length > 0) {
        const error = new Err("Equipment with this serial number already exists");
        error.statusCode = 409;
        throw error;
    }

    let result = await db.query(
        `INSERT INTO Equipment (serial_no, type, name, location, Employee_id) VALUES (?,?,?,?,?)`,
        [
            equipment.serial_no,
            equipment.type,
            equipment.name,
            equipment.location,
            equipment.Employee_id,      
        ]
    );
    result = result as ResultSetHeader;
     if(result.affectedRows === 0){
        const error = new Err("Equipment could not be created");
     }
     return {
        data:equipment,
        message: "Successfully created equipment",
     }
}

export default {
    getAll,
    create,
};

