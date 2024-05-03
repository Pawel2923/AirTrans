import React from "react";
import { Car } from "../assets/Data";
import styles from "./tableCars.module.css";

type CarsTableProps = {
  cars: Car[];
  onEdit: (car: Car) => void; 
};

const CarsTable: React.FC<CarsTableProps> = ({ cars, onEdit }) => {
 
  const handleEditClick = (car: Car) => {
    onEdit(car); 
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Marka</th>
          <th>Model</th>
          <th>Cena za dzień</th>
          <th>Rok produkcji</th>
          <th>Nr rejestacji</th>
          <th>Paliwo</th>
          <th>Skrzynia biegów</th>
          <th></th> 
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.Id}>
            <td>{car.Id}</td>
            <td>{car.Brand}</td>
            <td>{car.Model}</td>
            <td>{car.Price_per_day}</td>
            <td>{car.Production_year}</td>
            <td>{car.License_plate}</td>
            <td>{car.Fuel_type}</td>
            <td>{car.Transmission_type}</td>
            <td>
              <button onClick={() => handleEditClick(car)}>Edit</button> {/* Wywołanie funkcji obsługującej edycję */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarsTable;
