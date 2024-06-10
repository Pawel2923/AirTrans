import {useEffect}from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import styles from './sumaryPage.module.css';

const SummaryPageR = () => {
    const location = useLocation();
    const contactInfo = location.state;
    const navigate = useNavigate();
    
    const reservationDates = JSON.parse(sessionStorage.getItem('reservationDates') || '{}');
    const licensePlate = sessionStorage.getItem('licensePlate') || '';
    const parkingLevel = sessionStorage.getItem('parkingLevel') || '';
    const spaceId = sessionStorage.getItem('spaceId') || '';

    const daysCount = Math.round((new Date(reservationDates.endDate).getTime() - new Date(reservationDates.startDate).getTime()) / (1000 * 3600 * 24)) + 1;
    const totalPrice = daysCount * 50;

    useEffect(() => {
        if (contactInfo && contactInfo.id) {
            sessionStorage.setItem('userId', contactInfo.id);
        }
    }, [contactInfo]);

    const handlePayment = () => {
        sessionStorage.setItem('contactInfo', JSON.stringify(contactInfo));
        navigate('/payment', { state: { totalPrice } });
    };  
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className={styles.summaryContainer}>
            <header className={styles.header}>
                <h1>Podsumowanie Rezerwacji Parkingu</h1>
            </header>
            <div className={styles.summaryContent}>
                <h2>Dane kontaktowe</h2>
                <p>Imię: {contactInfo.firstName}</p>
                <p>Nazwisko: {contactInfo.lastName}</p>
                <p>E-mail: {contactInfo.email}</p>
                <p>Nr Telefonu: {contactInfo.phone}</p>

                <h2>Szczegóły rezerwacji</h2>
                <p>Numer rejestracyjny pojazdu: {licensePlate}</p>
                <p>Poziom parkingu: {parkingLevel}</p>
                <p>Numer miejsca parkingowego: {spaceId}</p>
                <p>Daty rezerwacji: {new Date(reservationDates.startDate).toLocaleDateString()} - {new Date(reservationDates.endDate).toLocaleDateString()}</p>
                <p>Liczba dni: {daysCount}</p>
                <p>Całkowita cena: {totalPrice} PLN</p>
            </div>
            <div className={styles.nextButtonContainer}>
            <button className="btn btn-secondary" onClick={handleBack} style={{ fontWeight: 'bold' }}>
                <span >&#10229;</span> Wróć
            </button>
            <button className="btn btn-primary" onClick={handlePayment} style={{ fontWeight: 'bold' }}>
                 Potwierdź i zapłać <span>&#10230;</span>
            </button>    
            </div>
        </div>
    );
};

export default SummaryPageR;
