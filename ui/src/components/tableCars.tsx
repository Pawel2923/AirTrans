import React from "react";
import { Car } from "../assets/Data"; 

interface TableCarProps {
  cars: Car[];
}

const TableCar: React.FC<TableCarProps> = ({ cars }: TableCarProps) => {
  // Sprawdzenie, czy cars jest tablicą
  if (!Array.isArray(cars)) {
    return <div>No cars data</div>; // Jeśli nie jest tablicą, wyświetl komunikat
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Marka</th>
          <th>Model</th>
          <th>Cena za dzień</th>
          <th>Rok produkcji</th>
          <th>Numer rejestracyjny</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car: Car) => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.price_per_day}</td>
            <td>{car.production_year}</td>
            <td>{car.license_plate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCar;
