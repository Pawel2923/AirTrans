import React from "react";
import { EventLogs } from "../assets/Data";
import classes from "./tableCars.module.css";

type Event_logsTableProps = {
  event_logs: EventLogs[];
};

const Event_logsTable: React.FC<Event_logsTableProps> = ({ event_logs }) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nazwa Tabeli</th>       
          <th>Użytkownik</th>
          <th>Czas</th>
          <th>Akcja</th>
          <th>Szczegóły</th>
        </tr>
      </thead>
      <tbody>
        {event_logs.map((event_log) => (
          <tr key={event_log.id}>
            <td>{event_log.id}</td>
            <td>{event_log.table_name}</td>
            <td>{event_log.by_user}</td>
            <td>{event_log.timestamp_log.replace("T", " ").slice(0,19)}</td>
            <td>{event_log.action}</td>
            <td>{event_log.log_details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Event_logsTable;