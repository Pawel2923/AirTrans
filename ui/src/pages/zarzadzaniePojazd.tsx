import React,{ useState, useEffect } from "react";
import ButtonAdd from "../components/AddButton";
import ButtonEdit from "../components/EditButton";
import ButtonDelete from "../components/DeleteButton";
import carService from "../services/car.service";
import rentService from "../services/rental.service";
import TableCars from "../components/tableCars";
import { Car } from "../assets/Data";
import tablestyle from "../components/tableCars.module.css"
import CarRentaTable from "../components/CarRentaTable";
import { CarRental } from "../assets/Data";

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

  const [rentals, setRentals] = useState<CarRental[]>([]); 
  const rentalData = (rentData: CarRental[]) => { 
    const rentals: CarRental[] = [];
    rentData.forEach(rental => { 
      rentals.push({
        Id: rental.Id,
        Rental_date: rental.Rental_date,
        Return_date: rental.Return_date,
        Status: rental.Status,
        Client_id: rental.Client_id,
        Cars_id: rental.Cars_id
      });
    });
    return rentals;
  };
  
  useEffect(() => {
    rentService.getAll()
      .then((response: { data: CarRental[] }) => {
        const convertedRentals = rentalData(response.data); 
        setRentals(convertedRentals); 
      })
      .catch(error => console.error("Błąd podczas pobierania danych o wypożyczeniach:", error)); // Zmiana komunikatu błędu
  }, []);
  
  return (
    <div>
      <h1>Zarządzanie pojazdami</h1>
      <div className={tablestyle.tableContainer}>
        <h2>Lista wypożyczeń</h2>
        <CarRentaTable rent={rentals} />
        </div>
      <ButtonAdd onClick={() => console.log("Dodaj")} />
      <ButtonEdit onClick={() => console.log("Edytuj")} />
      <ButtonDelete onClick={() => console.log("Usuń")} />
      <div className={tablestyle.tableContainer}>
       <h2>Lista pojazdów</h2> 
       <TableCars cars={cars} />
        <ButtonAdd onClick={() => console.log("Dodaj")} />
      <ButtonEdit onClick={() => console.log("Edytuj")} />
      <ButtonDelete onClick={() => console.log("Usuń")} />
      </div>

    </div>
  );
};

export default ZarzadzanieP;