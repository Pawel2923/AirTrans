import { CarRental} from "../assets/Data";
import styles from '../components/tableCars.module.css';
import React from "react";

type TableRentProps={
  rents: CarRental[];
  onEdit: (rent: CarRental) => void;
  onDelete: (id: number) => void;
};

const TableRent:React.FC<TableRentProps>= ({ rents, onEdit,onDelete }) => {

  const handleEditRentClick = (rent: CarRental) => {
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
        
            <tr key={rent.Id}>
              <td>{rent.Id}</td>
              <td>{rent.Client_id}</td>
              <td>{rent.Cars_id}</td>
              <td>{rent.Rental_date}</td>
              <td>{rent.Return_date}</td>
              <td>{rent.Status}</td>
              <td>
                <button 
                className="btn btn-primary me-3"
                onClick={()=> handleEditRentClick(rent)}>EDYTUJ</button>
                <button 
                className="btn btn-danger"
                onClick={() => onDelete(rent.Id)}>Delete</button>
              </td>
             
            </tr>
          
        ))}
      </tbody>
    </table>
  );
};

export default TableRent;