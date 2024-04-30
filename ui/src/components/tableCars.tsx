import React from "react";
import { Car } from "../assets/Data";
import styles from "./tableCars.module.css";

type CarsTableProps = {
  cars: Car[];
  onEdit: (car: Car) => void; // Funkcja do obsługi edycji samochodu
};

const CarsTable: React.FC<CarsTableProps> = ({ cars, onEdit }) => {
  // Funkcja obsługująca naciśnięcie przycisku "Edit"
  const handleEditClick = (car: Car) => {
    onEdit(car); // Wywołanie funkcji przekazanej z komponentu nadrzędnego
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Price_per_day</th>
          <th>Production_year</th>
          <th>License_plate</th>
          <th>Fuel_type</th>
          <th>Transmission_type</th>
          <th>Actions</th> 
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
