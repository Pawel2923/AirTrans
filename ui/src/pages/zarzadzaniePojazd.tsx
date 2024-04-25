import React, { useState, useEffect } from "react";
import TableCar from "../components/tableCars";
import ButtonAdd from "../components/AddButton";
import ButtonEdit from "../components/EditButton";
import ButtonDelete from "../components/DeleteButton";
import { Car } from "../assets/Data"; 

const ZarzadzanieP = () => {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        fetch("/api/cars")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data: Car[]) => setCars(data))
            .catch(error => console.error("Error fetching cars:", error));
    }, []);
   
    return (
        <div>
            <h1>Zarządzanie pojazdami</h1>
            <h2>Lista pojazdów</h2>
            <ButtonAdd onClick={() => console.log("Dodaj")} />
            <ButtonEdit onClick={() => console.log("Edytuj")} />
            <ButtonDelete onClick={() => console.log("Usuń")} />
            <TableCar cars={cars} />
        </div>
    );
};

export default ZarzadzanieP;
