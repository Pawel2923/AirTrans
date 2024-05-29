import React, { useState, useEffect } from 'react';
import styles from './parkingPagek.module.css';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Nav from '../components/Nav';

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

    const [licensePlate, setLicensePlate] = useState('');
    const [parkingLevel, setParkingLevel] = useState('-1');

    const handleSelect = (ranges: RangeType) => {
        setSelectionRange(ranges.selection);
    };

    useEffect(() => {
        sessionStorage.setItem('reservationDates', JSON.stringify(selectionRange));
        sessionStorage.setItem('licensePlate', licensePlate);
        sessionStorage.setItem('parkingLevel', parkingLevel);
    }, [selectionRange, licensePlate, parkingLevel]);

    const daysCount = Math.round((selectionRange.endDate.getTime() - selectionRange.startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    return (
        <div>
            <Nav />
            <div className={styles.pageContainer}>
                <header className={styles.header}>
                    <h1>ZAREZERWUJ MIEJSCE PARKINGOWE</h1>
                </header>
                <div className={styles.row}>
                    <div className={styles.datePickerContainer}>
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
                    <div className={styles.inputContainer}>
                        <label htmlFor="licensePlate">Numer rejestracyjny pojazdu</label>
                        <input 
                            type="text" 
                            id="licensePlate" 
                            value={licensePlate} 
                            onChange={(e) => setLicensePlate(e.target.value)} 
                        />
                        <label htmlFor="parkingLevel">Wybierz poziom</label>
                        <select 
                            id="parkingLevel" 
                            value={parkingLevel} 
                            onChange={(e) => setParkingLevel(e.target.value)}
                        >
                            <option value="-1">-1</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div className={styles.nextButtonContainer}>
                    <Link to="formR" className="btn btn-primary py-2 px-5">
                        Przejdź dalej
                        <span>&#10132;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ParkingReservation;
