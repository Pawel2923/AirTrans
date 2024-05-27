import React, { useState } from 'react';
import styles from './dataPagek.module.css'
import { Link } from 'react-router-dom';
import { DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';


interface RangeType {
    selection: {
        startDate: Date;
        endDate: Date;
        key: string;
    };
}

const DatePagek: React.FC = () => {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleSelect = (ranges: RangeType) => {
        setSelectionRange(prevRange => (
            {
                ...prevRange,
                startDate: ranges.selection.startDate,
                endDate: ranges.selection.endDate
            }
        ));
    };

    const selectedCar = {
        img: "https://example.com/car.jpg",
        brand: "Toyota",
        model: "Corolla",
        productionYear: 2020,
        seats: 5,
        transmission: "AUTOMATIC",
        fuel: "Petrol",
        pricePerDay: 150,
    };

    const daysCount = Math.round((selectionRange.endDate.getTime() - selectionRange.startDate.getTime()) / (1000 * 3600 * 24)) + 1;
    const totalPrice = daysCount * selectedCar.pricePerDay;

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1>WYBIERZ DATY WYPOŻYCZENIA</h1>
            </header>
            <div className="row">
                <div className="col-md-6">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    />
                    <div className={styles.dateInfo}>
                        {`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`}
                    </div>
                    <div className={styles.totalPrice}>
                        Cena wypożyczenia za {daysCount} dni: {totalPrice} PLN
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={styles.carDetails}>
                        <img src={selectedCar.img} alt={`${selectedCar.brand} ${selectedCar.model}`} className={styles.carImage} />
                        <div>
                            <h2>{selectedCar.brand} {selectedCar.model}</h2>
                            <p>Rok produkcji: {selectedCar.productionYear}</p>
                            <p>Liczba miejsc: {selectedCar.seats}</p>
                            <p>Skrzynia: {selectedCar.transmission}</p>
                            <p>Rodzaj paliwa: {selectedCar.fuel}</p>
                            <p>Cena za dobę: {selectedCar.pricePerDay} PLN</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.nextButtonContainer}>
                <Link to="form" 
                className="btn btn-primary py-2 px-5">
                    Wprowadź dane
                    <span>&#10132;</span>
                </Link>
            </div>
        </div>
    );
};

export default DatePagek;
