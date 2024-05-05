import React from "react";
import { ParkingReservation } from "../assets/Data";
import styles from "./tableCars.module.css";

type ParkingTableProps = {
    parking: ParkingReservation[];
    onEdit: (parki: ParkingReservation) => void;
};

const ParkingTable: React.FC<ParkingTableProps> = ({ parking, onEdit }) => {
    const handleEditClick = (parki: ParkingReservation) => {
        onEdit(parki);
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Id_Klienta</th>
                    <th>Poziom</th>
                    <th>Miejsce</th>
                    <th>Od</th>
                    <th>Do</th>
                    <th>Cana za dzień</th>
                    <th>Nr rejestacji</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {parking.map((parki) => (
                    <tr key={parki.Id}>
                        <td>{parki.Id}</td>
                        <td>{parki.Client_id}</td>
                        <td>{parki.Parking_level}</td>
                        <td>{parki.Space_id}</td>
                        <td>{parki.Since}</td>
                        <td>{parki.Until}</td>
                        <td>{parki.Price_per_day}</td>
                        <td>{parki.License_plate}</td>
                        <td>
                            <button onClick={() => handleEditClick(parki)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ParkingTable;