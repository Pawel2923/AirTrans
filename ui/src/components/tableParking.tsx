import { ParkingZ } from "../assets/Data";
import styles from '../components/tableCars.module.css';
import React from "react";

type TableParkingProps={
  parkings: ParkingZ[];
  onEdit: (park: ParkingZ) => void;

};

const TableParking:React.FC<TableParkingProps>= ({ parkings, onEdit }) => {

  const handleEditParkClick = (park: ParkingZ) => {
    onEdit(park);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
            <th>ID_Clienta</th>
            <th>Numer_rejestracyjny</th>
            <th>Poziom_parkingu</th>
            <th>Cena_dzienna</th>
            <th>Od</th>
            <th>Do</th>
            <th>ID_Miejsca</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {parkings.map((park) => (
        
            <tr key={park.Id}>
              <td>{park.Id}</td>
              <td>{park.Client_id}</td>
              <td>{park.License_plate}</td>
              <td>{park.Parking_level}</td>
                <td>{park.Price_per_day}</td>
                <td>{park.Since}</td>
                <td>{park.Until}</td>
                <td>{park.Space_id}</td>

              <td>
                <button onClick={()=> handleEditParkClick(park)}>Edit</button>
              </td>
             
            </tr>
          
        ))}
      </tbody>
    </table>
  );
};


export default TableParking;
