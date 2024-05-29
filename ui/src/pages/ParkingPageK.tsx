import React, { useState, useEffect } from 'react';
import styles from './parkingPagek.module.css';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface RangeType {
    selection: {
        startDate: Date;
        endDate: Date;
        key: string;
    };
}

const ParkingReservation = () => {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleSelect = (ranges: RangeType) => {
        setSelectionRange(ranges.selection);
    };

    useEffect(() => {
        sessionStorage.setItem('reservationDates', JSON.stringify(selectionRange));
    }, [selectionRange]);

    const daysCount = Math.round((selectionRange.endDate.getTime() - selectionRange.startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1>ZAREZERWUJ MIEJSCE PARKINGOWE</h1>
            </header>
            <div className="row">
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
                <div className={styles.dateInfo}>
                    {`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`}
                </div>
                <div className={styles.totalPrice}>
                    Cena rezerwacji za {daysCount} dni: {daysCount * 50} PLN
                </div>
            </div>
            <div className={styles.nextButtonContainer}>
                <Link to="form" className="btn btn-primary py-2 px-5">
                    Przejdź dalej
                    <span>&#10132;</span>
                </Link>
            </div>
        </div>
    );
};

export default ParkingReservation;
