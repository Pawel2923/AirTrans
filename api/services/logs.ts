import db from "./db";
import helper from "../helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Event_logs,Err } from "../Types";

const event_logsProperties = [
    "id",
    "table_name",
    "by_user",
    "timestamp",
    "action",
    "log_details",
];

async function get(
    page=1,
    limit=config.listPerPage,

){
    if(page<1 || limit<1){
        const error = new Err("Invalid page or limit number");
        error.statusCode = 400;
        throw error;
    }
    const offset = helper.getOffset(page,limit);

    const {query,queryParams} = helper.buildQuery("Event_logs",offset,limit);

    const rows = await db.query(query,queryParams);
    const data = helper.emptyOrRows(rows) as Event_logs[];

    if(data.length === 0){
        const error = new Err("No event_logs found");
        error.statusCode = 404;
        throw error;
    }

    const pages = await helper.getPages("Event_logs",limit);

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

export default
{ 
    get,
 };
