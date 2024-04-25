import React, { useState, useEffect } from "react";
import TableCar from "../components/tableCars";
import ButtonAdd from "../components/AddButton";
import ButtonEdit from "../components/EditButton";
import ButtonDelete from "../components/DeleteButton";
import carService from "../services/car.service";
import { Car } from "../assets/Data"; 

const ZarzadzanieP = () => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        // Pobranie danych z usługi CarService
        carService.getAll()
            .then(response => {
                setCars(response.data); // Ustawienie danych w stanie cars
            })
            .catch(error => console.error("Error fetching cars:", error));
    }, []);
   
    return (
        <div>
            <h1>Zarządzanie pojazdami</h1>
            <h2>Lista pojazdów</h2>
            <ButtonAdd onClick={() => console.log("Dodaj")} />
            <ButtonEdit onClick={() => console.log("Edytuj")} />
            <ButtonDelete onClick={() => console.log("Usuń")} />
            {/* Przekazanie danych do komponentu TableCar */}
            <TableCar cars={cars} />
        </div>
    );
};

export default ZarzadzanieP;