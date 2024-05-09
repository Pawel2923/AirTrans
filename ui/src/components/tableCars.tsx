import React from "react";
import { Cars } from "../assets/Data";
import styles from "./tableCars.module.css";

type CarsTableProps = {
  cars: Cars[];
  onEdit: (car: Cars) => void; 
  onDelete: (id: number) => void;
};

const CarsTable: React.FC<CarsTableProps> = ({ cars, onEdit,onDelete }) => {
 
  const handleEditClick = (car: Cars) => {
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
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.price_per_day}</td>
            <td>{car.production_year}</td>
            <td>{car.license_plate}</td>
            <td>{car.fuel_type}</td>
            <td>{car.transmission_type}</td>
            <td>
              <button 
              className="btn btn-primary me-3"
              onClick={() => handleEditClick(car)}>EDYTUJ</button>
              <button 
              className="btn btn-danger"
              onClick={() => onDelete(car.id ?? 0)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarsTable;
