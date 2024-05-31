import { useState, useEffect } from "react";
import styles from "./dataPagek.module.css";
import { Link, useParams } from "react-router-dom";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Cars } from "../assets/Data";
import carService from "../services/car.service";

const emptyCar: Cars = {
  id: 0,
  brand: "",
  model: "",
  production_year: 0,
  license_plate: "",
  transmission_type: undefined,
  fuel_type: "",
  price_per_day: 0,
  img: "",
};

const DatePagek = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCar, setSelectedCar] = useState<Cars>(emptyCar);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelectionRange((prevRange) => ({
      ...prevRange,
      startDate: ranges.selection.startDate || prevRange.startDate,
      endDate: ranges.selection.endDate || prevRange.endDate,
    }));
  };

  useEffect(() => {
    if (id === undefined) return;
    const fetchData = async () => {
      try {
        const response = await carService.getById(parseInt(id));
        if (response.status === 200) {
          const data = response.data.data[0];
          setSelectedCar(data);
          sessionStorage.setItem("selectedCar", JSON.stringify(data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    sessionStorage.setItem("rentalDates", JSON.stringify(selectionRange));
  }, [selectionRange]);

  const daysCount =
    Math.round(
      (selectionRange.endDate.getTime() - selectionRange.startDate.getTime()) /
        (1000 * 3600 * 24)
    ) + 1;
  const totalPrice = daysCount * selectedCar.price_per_day;

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>WYBIERZ DATY WYPOŻYCZENIA</h1>
      </header>
      <div className="row">
        <div className="col-md-6">
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
          <div className={styles.dateInfo}>
            {`${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`}
          </div>
          <div className={styles.totalPrice}>
            Cena wypożyczenia za {daysCount} dni: {totalPrice} PLN
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.carDetails}>
            <img
              src={selectedCar.img}
              alt={`${selectedCar.brand} ${selectedCar.model}`}
              className={styles.carImage}
            />
            <div>
              <h2>
                {selectedCar.brand} {selectedCar.model}
              </h2>
              <p>Rok produkcji: {selectedCar.production_year}</p>
              <p>Typ skrzyni biegów: {selectedCar.transmission_type}</p>
              <p>Rodzaj paliwa: {selectedCar.fuel_type}</p>
              <p>Numer rejestracyjny: {selectedCar.license_plate}</p>
              <p>Cena za dzień: {selectedCar.price_per_day} PLN</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.nextButtonContainer}>
        <Link to="form" className="btn btn-primary py-2 px-5">
          Wprowadź dane
          <span>&#10132;</span>
        </Link>
      </div>
    </div>
  );
};

export default DatePagek;
