import { useState, useEffect } from 'react';
import styles from './parkingPagek.module.css';
import { Link } from 'react-router-dom';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Nav from '../components/Nav/Nav';
import { ParkingReservations } from '../assets/Data';
import parkingService from '../services/parking.service';
import { useNavigate } from 'react-router-dom';


const ParkingReservation = () => {

    const navigate = useNavigate();
    const [occupiedSpaces, setOccupiedSpaces] = useState<{ [key: string]: boolean }>({});
    const [spaceOptions, setSpaceOptions] = useState<number[]>([]);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [licensePlate, setLicensePlate] = useState('');
    const [parkingLevel, setParkingLevel] = useState('A');
    const [spaceId, setSpaceId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await parkingService.getAllParking(1, 1000);
                const occupied = response.data.data.reduce((acc: { [key: string]: boolean }, parking: ParkingReservations) => {
                    if (parking.status === "PENDING" || parking.status === "RESERVED") {
                        acc[parking.space_id] = true;
                    }
                    return acc;
                }, {});
                setOccupiedSpaces(occupied);
            } catch (error) {
                console.error("Error fetching parkings data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        updateSpaceOptions(parkingLevel);
    }, [parkingLevel]);

    const handleSelect = (ranges: RangeKeyDict) => {
        setSelectionRange((prevRange) => ({
          ...prevRange,
          startDate: ranges.selection.startDate || prevRange.startDate,
          endDate: ranges.selection.endDate || prevRange.endDate,
        }));
      };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        if (name === "parking_level") {
            updateSpaceOptions(value);
            setParkingLevel(value);
            setSpaceId('');
        } else if (name === "space_id") {
            setSpaceId(value);
        } else if (name === "licensePlate") {
            setLicensePlate(value);
        }
    };

    const updateSpaceOptions = (level: string) => {
        let options: number[] = [];
        if (level === "A") {
            options = Array.from({ length: 51 }, (_, i) => i);
        } else if (level === "B") {
            options = Array.from({ length: 50 }, (_, i) => i + 51);
        }
        setSpaceOptions(options);
    };

    useEffect(() => {
        sessionStorage.setItem('reservationDates', JSON.stringify(selectionRange));
        sessionStorage.setItem('licensePlate', licensePlate);
        sessionStorage.setItem('parkingLevel', parkingLevel);
        sessionStorage.setItem('spaceId', spaceId);
    }, [selectionRange, licensePlate, parkingLevel, spaceId]);

    const daysCount = Math.round((selectionRange.endDate.getTime() - selectionRange.startDate.getTime()) / (1000 * 3600 * 24)) + 1;
    const handleBack = () => {
    navigate(-1);   
}
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
                            minDate={new Date()}
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
                            name="licensePlate"
                            maxLength={8}
                            value={licensePlate}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="parking_level">Poziom parkingu</label>
                        <select
                            name="parking_level"
                            className="form-control"
                            value={parkingLevel}
                            onChange={handleInputChange}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>

                        <label htmlFor="space_id">Wybierz miejsce</label>
                        <select
                            name="space_id"
                            className="form-control"
                            value={spaceId}
                            onChange={handleInputChange}
                        >
                            <option value="">Wybierz miejsce</option>
                            {spaceOptions.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                    disabled={occupiedSpaces[option]}
                                    style={occupiedSpaces[option] ? { color: "red" } : {}}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                        Liczba wolnych miejsc: {spaceOptions.filter((option) => !occupiedSpaces[option]).length}
                        
                    </div>
                </div>
                <div className={styles.nextButtonContainer}>

                <button className="btn btn-secondary" onClick={handleBack}>
                    <span>&#10229;</span> Wróć
                </button>
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
