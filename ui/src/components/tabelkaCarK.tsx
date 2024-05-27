import React, { useState } from "react";
import { Cars } from "../assets/Data";
import styles from "./tabelkaCarsk.module.css";

type CarsTableProps = {
    cars: Cars[];
    onSelect: (car: Cars) => void;
};

const TabelkaCarsk: React.FC<CarsTableProps> = ({ cars, onSelect }) => {
    const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

    const handleSelectClick = (car: Cars) => {
        setSelectedCarId(car.id ?? null);
        onSelect(car);
    };

    return (
        <div className={styles.container}>
            {cars.map((car) => (
                <div 
                    key={car.id} 
                    className={`${styles.carCard} ${selectedCarId === car.id ? styles.selected : ''}`}>
                    {car.img && <img src={car.img} alt={`${car.brand} ${car.model}`} className={styles.carImage} />}
                    <div className={styles.carDetails}>
                        <div className={styles.carName}>{car.brand} {car.model}</div>
                        <div className={styles.carId}>ID: {car.id}</div>
                        <div className={styles.carYear}>Year: {car.production_year}</div>
                        <div className={styles.carPlate}>Plate: {car.license_plate}</div>
                        <div className={styles.carPrice}>Price: {car.price_per_day} PLN/day</div>
                        <div className={styles.carFuel}>Fuel: {car.fuel_type}</div>
                        <div className={styles.carTransmission}>Transmission: {car.transmission_type}</div>
                    </div>
                    <hr className={styles.separator} />
                    <button 
                        className="btn btn-primary"
                        onClick={() => handleSelectClick(car)}>Wybierz</button>
                </div>
            ))}
        </div>
    );
};

export default TabelkaCarsk;
