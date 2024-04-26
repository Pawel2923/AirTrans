import React from "react";
import { Car } from "../assets/Data";
import styles from '../components/tableCars.module.css';

interface TableCarsProps {
  cars: Car[];
}

const TableCars = ({ cars }: TableCarsProps) => {
  return (
    <table className={styles.table}> {/* Dodaj klasę do tabeli */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Marka</th>
          <th>Model</th>
          <th>Cena za dzień</th>
          <th>Rok produkcji</th>
          <th>Nr rejestracji</th>
        </tr>
      </thead>
      <tbody>
        {cars.map(car => {
          return (
            <tr key={car.Id}>
              <td>{car.Id}</td>
              <td>{car.Brand}</td>
              <td>{car.Model}</td>
              <td>{car.Price_per_day}</td>
              <td>{car.Production_year}</td>
              <td>{car.License_plate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableCars;