import React, { useState, useEffect } from "react";
import parkingService from "../../services/parking.service";
import TableParking from "../../components/tableParking";

import { PageData, ParkingZ } from "../../assets/Data";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
// import '../pages/parking.module.css';

const Parking = () => {
    const [searchParams] = useSearchParams();
    const [parkings, setParkings] = useState<ParkingZ[]>([]);
    const navigate = useNavigate();
    const [pageData, setPageData] = useState<PageData>({
        page: parseInt(searchParams.get("page") || "1"),
        pages: 1,
    });
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
        parkingService.getAllParking(pageData.page, 5)
            .then(response => {
                setParkings(response.data);
                setPageData(response.meta);
            })
            .catch(error => {
                console.log("Error while retrieving parkings:", error);
            });
    };

    useEffect(() => {
        retrieveParkings();
    }, [pageData.page]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setNewParking(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitNewParking = async () => {
        try {
            const response = await parkingService.createParking(newParking);
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
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteParking = async (id: number) => {
        try {
            await parkingService.delete(id);
            setParkings(parkings.filter(park => park.Id !== id));
            alert("Usunięto parking");
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    };

    const editParking = async (parking: ParkingZ) => {
        navigate(`edit-parking/${parking.Id}`);
    };

    return (
        <div>
            <div className="parking-header"> 
                <h1>Zarządzanie Parkingami</h1>
            </div>
            <div className="parking-content-wrapper"> 
                <TableParking parkings={parkings} onEdit={editParking} onDelete={deleteParking} />
                <Pagination
                    className="mt-3"
                    pageData={pageData}
                    setPageData={setPageData}
                />
                <div className="tableContainer">
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
            </div>
        </div>
    );
};
export default Parking;
