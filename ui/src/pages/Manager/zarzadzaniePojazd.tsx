import React, { useState, useEffect } from "react";
import carService from "../../services/car.service";
import rentService from "../../services/rental.service";
import CarsTable from "../../components/tableCars";
import TableRent from "../../components/CarRentalTable";
import { Cars, Rentals } from "../../assets/Data";
import tableStyle from "../../components/tableCars.module.css";
import { useNavigate } from "react-router-dom";

const ZarzadzanieP = () => {
  const [cars, setCars] = useState<Cars[]>([]);
  const [rentals, setRentals] = useState<Rentals[]>([]);
  const [newCarData, setNewCarData] = useState<Cars>({
    brand: "",
    model: "",
    price_per_day: 0,
    production_year: 0,
    license_plate: "",
    fuel_type: "",
    transmission_type: "MANUAL",
  });
  const [newRentalData, setNewRentalData] = useState<Rentals>({
    id: 0,
    since: "", 
    until: "", 
    status: undefined,
    Users_uid: 0,
    Cars_id: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRentalInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    
    if (name === "Rental_date" || name === "Return_date") {
      setNewRentalData((prevData) => ({
        ...prevData,
        [name]: value, 
      }));
    } else {
      setNewRentalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const submitNewCar = async () => {
    try {
      const response = await carService.create({ ...newCarData, Id: 0 });
      console.log("New Car Data:", response);
      setCars([...cars, response.data]);
      setNewCarData({
        brand: "",
        model: "",
        price_per_day: 0,
        production_year: 0,
        license_plate: "",
        fuel_type: "",
        transmission_type: "MANUAL",
      });
      alert("Car added successfully!");
      navigate(0);
    } catch (error) {
      console.error("Error while adding car:", error);
      alert("An error occurred while adding the car. Please try again");
    }
  };

  const submitNewRental = async () => {
    try {
      const response = await rentService.createRental(newRentalData);
      console.log("New Rental Data:", response);
      setRentals([...rentals, response.data]);
      setNewRentalData({
        id: 0,
        since: "",
        until: "",
        status: undefined,
        Users_uid: 0,
        Cars_id: 0,
      });
      alert("Rental added successfully!");
      navigate(0);
    } catch (error) {
      console.error("Error while adding rental:", error);
      alert("An error occurred while adding the rental. Please try again");
    }
  };

  const deleteCar = async (id: number) => {
    try {
      await carService.delete(id);
      setCars(cars.filter((car) => car.id !== id));
      alert("Auto usunięte!");
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRental = async (id: number) => {
    try {
      await rentService.removeRent(id);
      setRentals(rentals.filter((rental) => rental.id !== id));
      alert("Wypożyczenie usunięte!");
      navigate(0);
    } catch (error) {
      console.error(error);
     
    }
  };

  const editCar = async (car: Cars) => {
    navigate(`edit-car/${car.id}`);
  };

  const editRent = async (rent: Rentals) => {
    navigate(`edit-rent/${rent.id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const carsResponse = await carService.getAll();
        setCars(carsResponse.data);
      } catch (error) {
        console.error("Error while fetching car data:", error);
      }

      try {
        const rentalsResponse = await rentService.getAll();
        setRentals(rentalsResponse.data);
      } catch (error) {
        console.error("Error while fetching rental data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Zarzadzanie Autami i Wypożyczeń</h1>
      <div className={tableStyle.tableContainer}>
        <h2>Lista Wypożyczeń</h2>
        <TableRent rents={rentals} onEdit={editRent} onDelete={deleteRental}/>
      </div>
      <div className={tableStyle.tableContainer}>
        <h2>Dodaj nowe wypożyczenie</h2>
        <input
          type="datetime-local"
          name="Rental_date"
          placeholder="Rental date"
          value={newRentalData.since.toString()}
          onChange={handleRentalInputChange}
        />
        <input
          type="datetime-local"
          name="Return_date"
          placeholder="Return date"
          value={newRentalData.until.toString()}
          onChange={handleRentalInputChange}
        />
        <input
          type="text"
          name="Status"
          placeholder="Status"
          value={newRentalData.status}
          onChange={handleRentalInputChange}
        />
        <input
          type="number"
          name="Client_id"
          placeholder="Client ID"
          value={newRentalData.Users_uid}
          onChange={handleRentalInputChange}
        />
        <input
          type="number"
          name="Cars_id"
          placeholder="Car ID"
          value={newRentalData.Cars_id}
          onChange={handleRentalInputChange}
        />
        <button onClick={submitNewRental}>Dodaj</button>
      </div>
      <br></br>
      <div className={tableStyle.tableContainer}>
        <h2>Lista Aut</h2>
        <CarsTable cars={cars} onEdit={editCar} onDelete={deleteCar}/>
      </div>
      <div className={tableStyle.tableContainer}>
        <h2>Dodaj nowe auto</h2>
        <input
          type="text"
          name="Brand"
          placeholder="Brand"
          value={newCarData.brand}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Model"
          placeholder="Model"
          value={newCarData.model}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Price_per_day"
          placeholder="Price per day"
          value={newCarData.price_per_day}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Production_year"
          placeholder="Production year"
          value={newCarData.production_year}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="License_plate"
          placeholder="License plate"
          value={newCarData.license_plate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Fuel_type"
          placeholder="Fuel type"
          value={newCarData.fuel_type}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Transmission_type"
          placeholder="Transmission type"
          value={newCarData.transmission_type}
          onChange={handleInputChange}
        />
        <button onClick={submitNewCar}>Dodaj</button>
      </div>
      
    </div>
  );
};

export default ZarzadzanieP;