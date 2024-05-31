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
    transmission_type: undefined,
  });
  const [newRentalData, setNewRentalData] = useState<Rentals>({
    id: 0,
    since: "",
    until: "",
    status: undefined,
    Users_id: 0,
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

  const createCarSelectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewCarData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRentalInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewRentalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createSelectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewRentalData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitNewCar = async () => {
    try {
      const response = await carService.create({ ...newCarData, id: 0 });

      setCars([...cars, response.data]);
      setNewCarData({
        brand: "",
        model: "",
        price_per_day: 0,
        production_year: 0,
        license_plate: "",
        fuel_type: "",
        transmission_type: undefined,
      });
      alert("Car added successfully!");
      navigate(0);
    } catch (error) {
      console.error("Error while adding car:", error);
      alert("An error occurred while adding the car. Please try again");
    }
  };

  const submitNewRental = async () => {
    const sinceDate = new Date(newRentalData.since);
    const untilDate = new Date(newRentalData.until);
    const formatedSince = sinceDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formatedUntil = untilDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    try {
      const response = await rentService.createRental({
        ...newRentalData,
        since: formatedSince,
        until: formatedUntil,
      });

      setRentals([...rentals, response.data]);
      setNewRentalData({
        id: 0,
        since: "",
        until: "",
        status: undefined,
        Users_id: 0,
        Cars_id: 0,
      });
      alert("Rental added successfully!");
      navigate(0);
    } catch (error) {
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
    <div className="container">
      <h1 className="text-center">Zarządzanie Autami i Wypożyczeń</h1>
      <div className={tableStyle.tableContainer}>
        <h2>Lista Wypożyczeń</h2>
        <TableRent rents={rentals} onEdit={editRent} onDelete={deleteRental} />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Dodaj nowe wypożyczenie</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="since">Data wypożyczenia</label>
                <input
                  type="datetime-local"
                  name="since"
                  className="form-control"
                  value={newRentalData.since}
                  onChange={handleRentalInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="until">Data zwrotu</label>
                <input
                  type="datetime-local"
                  name="until"
                  className="form-control"
                  value={newRentalData.until}
                  onChange={handleRentalInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={newRentalData.status}
                  onChange={createSelectChangeHandler}
                >
                  <option value="">Wybierz status</option>
                  <option value="PENDING">Zarezerwowane</option>
                  <option value="RENTED">Wypożyczone</option>
                  <option value="RETURNED">Zwrócone</option>
                  <option value="CANCELLED">Anulowane</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Users_id">ID klienta</label>
                <input
                  type="number"
                  name="Users_id"
                  className="form-control"
                  value={newRentalData.Users_id}
                  onChange={handleRentalInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Cars_id">ID samochodu</label>
                <input
                  type="number"
                  name="Cars_id"
                  className="form-control"
                  value={newRentalData.Cars_id}
                  onChange={handleRentalInputChange}
                />
              </div>
              <button className="btn btn-primary" onClick={submitNewRental}>
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={tableStyle.tableContainer}>
        <h2>Lista Aut</h2>
        <CarsTable cars={cars} onEdit={editCar} onDelete={deleteCar} />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Dodaj nowe auto</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="brand">Marka</label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={newCarData.brand}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  name="model"
                  className="form-control"
                  value={newCarData.model}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price_per_day">Cena za dzień</label>
                <input
                  type="number"
                  name="price_per_day"
                  className="form-control"
                  value={newCarData.price_per_day}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="production_year">Rok produkcji</label>
                <input
                  type="number"
                  name="production_year"
                  className="form-control"
                  value={newCarData.production_year}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="license_plate">Numer rejestracyjny</label>
                <input
                  type="text"
                  name="license_plate"
                  className="form-control"
                  value={newCarData.license_plate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fuel_type">Rodzaj paliwa</label>
                <input
                  type="text"
                  name="fuel_type"
                  className="form-control"
                  value={newCarData.fuel_type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="transmission_type">Typ skrzyni biegów</label>
                <select
                  name="transmission_type"
                  className="form-control"
                  value={newCarData.transmission_type}
                  onChange={createCarSelectChangeHandler}
                >
                  <option value="">Wybierz typ skrzyni</option>
                  <option value="MANUAL">Manualna</option>
                  <option value="AUTOMATIC">Automatyczna</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={submitNewCar}>
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZarzadzanieP;
