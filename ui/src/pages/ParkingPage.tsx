import React, { useState, useEffect } from "react";
import parkingService from "../services/parking.service";   
import { ParkingReservation } from "../assets/Data";
import ParkingTable from "../components/tableParking";

const ParkingPage = () => {
    const [parking, setParking] = useState<ParkingReservation[]>([]);

    useEffect(() => {
        try {
            async function fetchData() {
        }
    }, []);

    const editParking = (parki: ParkingReservation) => {
        console.log(parki);
    };

    return (
        <div>
            <h1>Parking</h1>
            <ParkingTable parking={parking} onEdit={editParking} />
        </div>
    );
};

export default ParkingPage;