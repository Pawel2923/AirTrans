import React, { useState, useEffect } from "react";
import ButtonAdd from "../components/AddButton";
import ButtonEdit from "../components/EditButton";
import ButtonDelete from "../components/DeleteButton";
import carService from "../services/car.service";
import rentService from "../services/rental.service";
import TableCars from "../components/tableCars";
import { Car } from "../assets/Data";
import tablestyle from "../components/tableCars.module.css";
import CarRentaTable from "../components/CarRentaTable";
import { CarRental } from "../assets/Data";

const ManageCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [rentals, setRentals] = useState<CarRental[]>([]);
  const [newCarData, setNewCarData] = useState<Car>({
    Id: 5,
    Brand: "",
    Model: "",
    Price_per_day: 0,
    Production_year: 0,
    License_plate: "",
    Fuel_type: "",
    Transmission_type: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCarData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitNewCar = async () => {
    if (!newCarData.Brand || !newCarData.Model || !newCarData.License_plate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await carService.create(newCarData);
      console.log("New Car Data:", response);
      setCars([...cars, response]);
      setNewCarData({
        Id: 5,
        Brand: "",
        Model: "",
        Price_per_day: 0,
        Production_year: 0,
        License_plate: "",
        Fuel_type: "",
        Transmission_type: ""
      });
      alert("Car added successfully!");
    } catch (error) {
      console.error("Error creating car:", error);
      alert("Error creating car. Please try again.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const carsResponse = await carService.getAll();
        setCars(carsResponse.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const rentalsResponse = await rentService.getAll();
        setRentals(rentalsResponse.data);
      } catch (error) {
        console.error("Error fetching rental data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Manage Cars</h1>
      <div className={tablestyle.tableContainer}>
        <h2>Rental List</h2>
        <CarRentaTable rent={rentals} />
      </div>
      <div className={tablestyle.tableContainer}>
        <h2>Car List</h2>
        <TableCars cars={cars} />
      </div>
      <div className={tablestyle.tableContainer}>
        <h2>Add New Car</h2>
        <input
          type="text"
          name="Brand"
          placeholder="Brand"
          value={newCarData.Brand}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Model"
          placeholder="Model"
          value={newCarData.Model}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Price_per_day"
          placeholder="Price per day"
          value={newCarData.Price_per_day}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Production_year"
          placeholder="Production year"
          value={newCarData.Production_year}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="License_plate"
          placeholder="License plate"
          value={newCarData.License_plate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Fuel_type"
          placeholder="Fuel type"
          value={newCarData.Fuel_type}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Transmission_type"
          placeholder="Transmission type"
          value={newCarData.Transmission_type}
          onChange={handleInputChange}
        />
        <button onClick={submitNewCar}>Add</button>
      </div>
      <ButtonAdd onClick={() => console.log("Add")} />
      <ButtonEdit onClick={() => console.log("Edit")} />
      <ButtonDelete onClick={() => console.log("Delete")} />
    </div>
  );
};

export default ManageCars;
