import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import carService from "../services/car.service";
import { Car } from "../assets/Data";

const emptyCar: Car = {
  Id: 0,
  Brand: "",
  Model: "",
  Price_per_day: 0,
  Production_year: 0,
  License_plate: "",
  Fuel_type: "",
  Transmission_type: "",
};

const EditCarPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<Car>(emptyCar);

  useEffect(() => {
    if (id === undefined) return;

    const carId = parseInt(id); 

    carService.getById(carId).then((response) => {
        if (response.status === 200) {
            setCarData(response.data.data[0]);
        }
    });
}, [id]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const response = await carService.update(carData);
      if (response.status === 200) {
        alert("Car updated successfully!");
        navigate("/zarzadzaniePojazd");
      }
    } catch (error) {
      console.error("Error while updating car:", error);
      alert("An error occurred while updating the car. Please try again");
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Edit Car</h1>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          name="Brand"
          placeholder="Brand"
          onChange={inputChangeHandler}
          value={carData.Brand}
        />
        <input
          type="text"
          name="Model"
          placeholder="Model"
          onChange={inputChangeHandler}
          value={carData.Model}
        />
        <input
          type="number"
          name="Price_per_day"
          placeholder="Price per day"
          onChange={inputChangeHandler}
          value={carData.Price_per_day}
        />
        <input
          type="number"
          name="Production_year"
          placeholder="Production year"
          onChange={inputChangeHandler}
          value={carData.Production_year}
        />
        <input
          type="text"
          name="License_plate"
          placeholder="License plate"
          onChange={inputChangeHandler}
          value={carData.License_plate}
        />
        <input
          type="text"
          name="Fuel_type"
          placeholder="Fuel type"
          onChange={inputChangeHandler}
          value={carData.Fuel_type}
        />
        <input
          type="text"
          name="Transmission_type"
          placeholder="Transmission type"
          onChange={inputChangeHandler}
          value={carData.Transmission_type}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCarPage;