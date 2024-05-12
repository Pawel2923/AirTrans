import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import carService from "../../services/car.service";
import { Cars } from "../../assets/Data";

const emptyCar: Cars = {
  id: 0,
  brand: "",
  model: "",
  price_per_day: 0,
  production_year: 0,
  license_plate: "",
  fuel_type: "",
  transmission_type: "MANUAL",
};

const EditCarPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<Cars>(emptyCar);

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
        navigate("/zarzadzanie/pojazd");
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
          name="brand"
          placeholder="Brand"
          onChange={inputChangeHandler}
          value={carData.brand}
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          onChange={inputChangeHandler}
          value={carData.model}
        />
        <input
          type="number"
          name="price_per_day"
          placeholder="Price per day"
          onChange={inputChangeHandler}
          value={carData.price_per_day}
        />
        <input
          type="number"
          name="production_year"
          placeholder="Production year"
          onChange={inputChangeHandler}
          value={carData.production_year}
        />
        <input
          type="text"
          name="license_plate"
          placeholder="License plate"
          onChange={inputChangeHandler}
          value={carData.license_plate}
        />
        <input
          type="text"
          name="fuel_type"
          placeholder="Fuel type"
          onChange={inputChangeHandler}
          value={carData.fuel_type}
        />
        <input
          type="text"
          name="transmission_type"
          placeholder="Transmission type"
          onChange={inputChangeHandler}
          value={carData.transmission_type}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCarPage;
