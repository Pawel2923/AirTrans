import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./sumaryPage.module.css";
import { useNavigate } from "react-router-dom";

const SummaryPage: React.FC = () => {
  const location = useLocation();
  const contactInfo = location.state;

  const carInfo = JSON.parse(sessionStorage.getItem("selectedCar") || "{}");
  const rentalDates = JSON.parse(sessionStorage.getItem("rentalDates") || "{}");

  const daysCount =
    Math.round(
      (new Date(rentalDates.endDate).getTime() -
        new Date(rentalDates.startDate).getTime()) /
        (1000 * 3600 * 24)
    ) + 1;
  const totalPrice = daysCount * carInfo.price_per_day;

  const navigate = useNavigate();
  useEffect(() => {
    if (contactInfo && contactInfo.id) {
      sessionStorage.setItem("userId", contactInfo.id);
    }
  }, [contactInfo]);

  useEffect(() => {
    if (carInfo && carInfo.id) {
      sessionStorage.setItem("carId", carInfo.id);
    }
  }, [carInfo]);

  const handlePayment = () => {
    sessionStorage.setItem("contactInfo", JSON.stringify(contactInfo));
    navigate("/payment", { state: { totalPrice } });
  };

  return (
    <div className={styles.summaryContainer}>
      <header className={styles.header}>
        <h1>Podsumowanie Wypożyczenia</h1>
      </header>
      <div className={styles.summaryContent}>
        <h2>Dane kontaktowe</h2>
        <p>Imię: {contactInfo.firstName}</p>
        <p>Nazwisko: {contactInfo.lastName}</p>
        <p>E-mail: {contactInfo.email}</p>
        <p>Nr Telefonu: {contactInfo.phone}</p>

        <div className={styles.carInfoContainer}>
          <div className={styles.carDetails}>
            <h2>Dane samochodu</h2>
            <p>Marka: {carInfo.brand}</p>
            <p>Model: {carInfo.model}</p>
            <p>Rok produkcji: {carInfo.production_year}</p>
            <p>Typ skrzyni biegów: {carInfo.transmission_type}</p>
            <p>Rodzaj paliwa: {carInfo.fuel_type}</p>
            <p>Numer rejestracyjny: {carInfo.license_plate}</p>
            <p>Cena za dzień: {carInfo.price_per_day} PLN</p>
          </div>
        </div>

        <h2>Szczegóły wynajmu</h2>
        <p>
          Daty wynajmu: {new Date(rentalDates.startDate).toLocaleDateString()} -{" "}
          {new Date(rentalDates.endDate).toLocaleDateString()}
        </p>
        <p>Liczba dni: {daysCount}</p>
        <p>Całkowita cena: {totalPrice} PLN</p>
      </div>
      <div className={styles.nextButtonContainer}>
        <button className="btn btn-primary" onClick={handlePayment}>
          Potwierdź i zapłać <span>&#10132;</span>
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
