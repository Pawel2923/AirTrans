import React, { useState, useEffect } from "react";
import carService from "../services/car.service";
import rentService from "../services/rental.service";
import CarsTable from "../components/tableCars";
import TableRent from "../components/CarRentaTable";
import { Car, CarRental } from "../assets/Data";
import tableStyle from "../components/tableCars.module.css";
import { useNavigate } from "react-router-dom";

const ZarzadzanieP = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [rentals, setRentals] = useState<CarRental[]>([]);
    const [newCarData, setNewCarData] = useState<Omit<Car, "Id">>({
        Brand: "",
        Model: "",
        Price_per_day: 0,
        Production_year: 0,
        License_plate: "",
        Fuel_type: "",
        Transmission_type: "",
    });
    const [newRentalData, setNewRentalData] = useState<CarRental>({
      Id: 0,
      Rental_date: new Date(), // Data i czas w bieżącej dacie i czasie
      Return_date: new Date(), // Data i czas w bieżącej dacie i czasie
      Status: "",
      Client_id: 0,
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

    const handleRentalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewRentalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitNewCar = async () => {
        try {
            const response = await carService.create({ ...newCarData, Id: 0 });
            console.log("New Car Data:", response);
            setCars([...cars, response.data]);
            setNewCarData({
                Brand: "",
                Model: "",
                Price_per_day: 0,
                Production_year: 0,
                License_plate: "",
                Fuel_type: "",
                Transmission_type: "",
            });
            alert("Car added successfully!");
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
              Id: 0,
                Rental_date: new Date(),
                Return_date: new Date(),
                Status: "",
                Client_id: 0,
                Cars_id: 0,
            });
            alert("Rental added successfully!");
        } catch (error) {
            console.error("Error while adding rental:", error);
            alert("An error occurred while adding the rental. Please try again");
        }
    };

    const deleteCar = async (id: number) => {
        try {
            const response = await carService.delete(id);
            console.log("Car deleted:", response);
            setCars(cars.filter((car) => car.Id !== id));
            alert("Car deleted successfully!");
        } catch (error) {
            console.error("Error while deleting car:", error);
            alert("An error occurred while deleting the car. Please try again");
        }
    };

    const editCar = async (car: Car) => {
        navigate(`/edit-car/${car.Id}`);
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
        <TableRent rent={rentals} />
      </div>
      <div className={tableStyle.tableContainer}>
        <h2>Lista Aut</h2>
        <CarsTable cars={cars} onEdit={editCar} />
      </div>
      <div className={tableStyle.tableContainer}>
        <h2>Dodaj nowe auto</h2>
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
        <button onClick={submitNewCar}>Dodaj</button>
      </div>
      <div>
        <h2>Usuń auto</h2>
        <input type="number" id="deleteCarId" placeholder="Car ID" />
        <button
          onClick={() =>
            deleteCar(
              Number(
                (document.getElementById("deleteCarId") as HTMLInputElement)
                  .value
              )
            )
          }
        >
          Delete
        </button>
      </div>
      <div className={tableStyle.tableContainer}>
                <h2>Dodaj nowe wypożyczenie</h2>
                <input
    type="datetime-local" // Użyj datetime-local, aby pozwolić użytkownikowi wprowadzać datę i czas
    name="Rental_date"
    placeholder="Rental date"
    value={newRentalData.Rental_date.toISOString().substring(0, 16)} // Przekonwertuj Date na string w formacie ISO i wytnij tylko pierwsze 16 znaków
    onChange={handleRentalInputChange}
/>
<input
    type="datetime-local" // Użyj datetime-local, aby pozwolić użytkownikowi wprowadzać datę i czas
    name="Return_date"
    placeholder="Return date"
    value={newRentalData.Return_date.toISOString().substring(0, 16)} // Przekonwertuj Date na string w formacie ISO i wytnij tylko pierwsze 16 znaków
    onChange={handleRentalInputChange}
/>

                <input
                    type="text"
                    name="Status"
                    placeholder="Status"
                    value={newRentalData.Status}
                    onChange={handleRentalInputChange}
                />
                <input
                    type="number"
                    name="Client_id"
                    placeholder="Client ID"
                    value={newRentalData.Client_id}
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
    </div>
  );
};

export default ZarzadzanieP;
