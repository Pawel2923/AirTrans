import React, { useState, useEffect } from "react";
import parkingService from "../services/parking.service";
import TableParking from "../components/tableParking";
import styles from '../components/tableCars.module.css';
import { ParkingZ } from "../assets/Data";
import { useNavigate } from "react-router-dom";


const Parking = () => {
    const [parkings, setParkings] = useState<ParkingZ[]>([]);
    const navigate = useNavigate();
    const [newParking, setNewParking] = useState<ParkingZ>({
        Id: 0,
        Client_id: 0,
        Since: "",
        Until: "",
        Parking_level: "",
        Space_id: 0,
        License_plate: "",
        Price_per_day: 0,
    });
    const retrieveParkings = () => {
        parkingService.getAllParking()
            .then(response => {
                setParkings(response.data);
            })
            .catch(error => {
                console.log("Error while retrieving parkings:", error);
            });
    };
useEffect(() => {
        retrieveParkings();
    }, []);
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        
        if (name === "Since" || name === "Until") {
            setNewParking((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setNewParking((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const submitNewParking = async () => {
        try {
            const response = await parkingService.createParking(newParking);
            console.log(response)
            setParkings([...parkings, response.data]);
            setNewParking({
                Id: 0,
                Client_id: 0,
                Since: "",
                Until: "",
                Parking_level: "",
                Space_id: 0,
                License_plate: "",
                Price_per_day: 0,
            });
            alert("Dodano nowy parking");
            navigate(0)
        } catch (error) {
            console.error(error);
        }
    }
     const deleteParking = async (id: number) => {
        try {
            await parkingService.delete(id);
            setParkings(parkings.filter((park) => park.Id !== id));
            alert("Usunięto parking");
            navigate(0)
        } catch (error) {
            console.error(error);
        }
    };
    const editParking = async (parking:ParkingZ) => {
        navigate(`/edit-parking/${parking.Id}`);
    }
    return (
        <div>
            <h1>Zarządzanie Parkingami</h1>
            <div className={styles.tableContainer}>
                <h2>Lista Parkingów</h2>
                <TableParking parkings={parkings} onEdit={editParking} />
            </div>
            <div className={styles.tableContainer}>
                <h2>Dodaj nowy parking</h2>
                <input
                    type="number"
                    name="Client_id"
                    placeholder="Client ID"
                    value={newParking.Client_id}
                    onChange={handleInputChange}
                />
                <input
                    type="datetime-local"
                    name="Since"
                    placeholder="Since"
                    value={newParking.Since.toString()}
                    onChange={handleInputChange}
                />
                <input
                    type="datetime-local"
                    name="Until"
                    placeholder="Until"
                    value={newParking.Until.toString()}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="Parking_level"
                    placeholder="Parking level"
                    value={newParking.Parking_level}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="Space_id"
                    placeholder="Space ID"
                    value={newParking.Space_id}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="License_plate"
                    placeholder="License plate"
                    value={newParking.License_plate}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="Price_per_day"
                    placeholder="Price per day"
                    value={newParking.Price_per_day}
                    onChange={handleInputChange}
                />
                <button onClick={submitNewParking}>Dodaj</button>
            </div>
            <div>
                <h2>Usuń parking</h2>
                <input type="number" id="deleteParkingID" placeholder="Parking ID" />
                <button
                    onClick={() =>
                        deleteParking(Number((document.getElementById("deleteParkingID") as HTMLInputElement).value))
                    }
                >
                    Usuń
                </button>
            </div>
        </div>

    );
}


export default Parking;