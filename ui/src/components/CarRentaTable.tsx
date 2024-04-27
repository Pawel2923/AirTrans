import { CarRental} from "../assets/Data";
import styles from '../components/tableCars.module.css';

interface TableRentProps {
  rent: CarRental[];
}

const TableRent = ({ rent }:TableRentProps ) => {
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
        </tr>
      </thead>
      <tbody>
        {rent.map(rents => {
          return (
            <tr key={rents.Id}>
              <td>{rents.Id}</td>
              <td>{rents.Client_id}</td>
              <td>{rents.Car_id}</td>
              <td>{rents.Rental_date.toString()}</td>
              <td>{rents.Return_date.toString()}</td>
              <td>{rents.Status}</td>
             
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableRent;