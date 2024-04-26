import React, { useState, useEffect } from "react";
import ButtonAdd from "../components/AddButton";
import ButtonEdit from "../components/EditButton";
import ButtonDelete from "../components/DeleteButton";
import carService from "../services/car.service";
import TableCars from "../components/tableCars";
import { Car } from "../assets/Data";
import tablestyle from "../components/tableCars.module.css"

const ZarzadzanieP = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const carsData = (carData: Car[]) => {
    const cars: Car[] = [];
    carData.forEach(car => {
      cars.push({
        Id: car.Id,
        Brand: car.Brand,
        Model: car.Model,
        Price_per_day: car.Price_per_day,
        Production_year: car.Production_year,
        License_plate: car.License_plate
      });
    });
    return cars;
  };

  useEffect(() => {
    carService.getAll()
      .then((response: { data: Car[] }) => {
        const convertedCars = carsData(response.data);
        setCars(convertedCars);
      })
      .catch(error => console.error("Błąd podczas pobierania danych o pojazdach:", error));
  }, []); 

  return (
    <div>
      <h1>Zarządzanie pojazdami</h1>
      <h2>Lista pojazdów</h2>
      <ButtonAdd onClick={() => console.log("Dodaj")} />
      <ButtonEdit onClick={() => console.log("Edytuj")} />
      <ButtonDelete onClick={() => console.log("Usuń")} />
      <div className={tablestyle.tableContainer}>
        <TableCars cars={cars} />
      </div>
    </div>
  );
};

export default ZarzadzanieP;