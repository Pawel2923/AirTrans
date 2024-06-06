import { useState, useEffect } from "react";
import carService from "../services/car.service";
import { Cars } from "../assets/Data";
import TabelkaCarsk from "../components/tabelkaCarK";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import styles from "./RentCar.module.css";
import Nav from "../components/Nav";

const RentCar = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    carService.getAllC().then((response) => {
      setCars(response.data.data);
    });
  }, []);

  const chooseCar = (car: Cars) => {
    navigate(`data/${car.id}`);
  };

  return (
    <div>
      <Nav />
      <div className={styles.rentCarContainer}>
        <div className={styles.header}>
          <h1>Wypożycz Auto</h1>
        </div>
        <div className={styles.carSelection}>
          <TabelkaCarsk cars={cars} onSelect={chooseCar} />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default RentCar;
