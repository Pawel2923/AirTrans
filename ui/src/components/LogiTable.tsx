import React from "react";
import { Event_logs } from "../assets/Data";
import "./tableCars.module.css";

type Event_logsTableProps = {
  event_logs: Event_logs[];
};

const Event_logsTable: React.FC<Event_logsTableProps> = ({ event_logs }) => {
  return (
    <table >
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
            <td>{event_log.timestamp}</td>
            <td>{event_log.action}</td>
            <td>{event_log.log_details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Event_logsTable;