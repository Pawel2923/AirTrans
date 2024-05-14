import { ParkingReservations } from "../assets/Data";
import styles from "./tableCars.module.css";
import React from "react";

type TableParkingProps={
  parkings: ParkingReservations[];
  onEdit: (park: ParkingReservations) => void;
  onDelete: (id: number) => void;

};

const TableParking:React.FC<TableParkingProps>= ({ parkings, onEdit, onDelete}) => {

  const handleEditParkClick = (park: ParkingReservations) => {
    onEdit(park);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr >
          <th>ID</th>
            <th>ID_Clienta</th>
            <th>Numer_rejestracyjny</th>
            <th>Poziom_parkingu</th>
            <th>Od</th>
            <th>Do</th>
            <th>ID_Miejsca</th>
            <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {parkings.map((park) => (
          <tr key={park.pid}>
              <td>{park.pid}</td>
              <td>{park.Users_uid}</td>
              <td>{park.license_plate}</td>
              <td>{park.parking_level}</td>
                <td>{park.since}</td>
                <td>{park.until}</td>
                <td>{park.space_id}</td>
                <td>{park.status}</td>
                <td>
                <button 
                className="btn btn-primary me-3"
                onClick={()=> handleEditParkClick(park)}>EDYTUJ</button>
                <button
                className="btn btn-danger" 
                onClick={() => onDelete(park.pid ?? 0)}>USUŃ</button>
              </td>
             
            </tr>
          
        ))}
      </tbody>
    </table>
  );
};


export default TableParking;
