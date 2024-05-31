import React from "react";
import { Logowanie_log } from "../assets/Data";
import classes from "./tableCars.module.css";

type LogiTableProps = {
  logi: Logowanie_log[];
};

const LogiTable: React.FC<LogiTableProps> = ({ logi }) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imię</th>
          <th>Email</th>
          <th>Czas</th>
          <th>Szczegóły</th>
        </tr>
      </thead>
      <tbody>
        {logi.map((log) => (
          <tr key={log.id}>
            <td>{log.id}</td>
            <td>{log.first_name}</td>
            <td>{log.email}</td>
            <td>{log.login_date.replace("T", " ").slice(0, 19)}</td>
            <td>{log.login_details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogiTable;
