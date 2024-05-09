import { Rentals } from "../assets/Data";
import styles from '../components/tableCars.module.css';
import React from "react";

type TableRentProps={
  rents: Rentals[];
  onEdit: (rent: Rentals) => void;
  onDelete: (id: number) => void;
};

const TableRent:React.FC<TableRentProps>= ({ rents, onEdit,onDelete }) => {

  const handleEditRentClick = (rent: Rentals) => {
    onEdit(rent);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>ID_Clienta</th>
          <th>ID_Pojazdu</th>
          <th>Data_wypozyczenia</th>
          <th>Data_zwrotu</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rents.map((rent) => (
        
            <tr key={rent.id}>
              <td>{rent.id}</td>
              <td>{rent.Users_uid}</td>
              <td>{rent.Cars_id}</td>
              <td>{rent.since}</td>
              <td>{rent.until}</td>
              <td>{rent.status}</td>
              <td>
                <button 
                className="btn btn-primary me-3"
                onClick={()=> handleEditRentClick(rent)}>EDYTUJ</button>
                <button 
                className="btn btn-danger"
                onClick={() => onDelete(rent.id ?? 0)}>Delete</button>
              </td>
             
            </tr>
          
        ))}
      </tbody>
    </table>
  );
};

export default TableRent;