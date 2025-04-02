import React, { useState, useEffect, useContext } from "react";
import carService from "../../services/car.service";
import rentService from "../../services/rental.service";
import userService from "../../services/users.service";
import CarsTable from "../../components/tableCars";
import TableRent from "../../components/CarRentalTable";
import { Cars, Rentals, Users, PageData } from "../../assets/Data";
import tableStyle from "../../components/tableCars.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ZarzadzanieP = () => {
  const [searchParams] = useSearchParams();
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const [pageData2, setPageData2] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const [cars, setCars] = useState<Cars[]>([]);
  const [rentals, setRentals] = useState<Rentals[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
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
  const { createConfirmModal, createToast } = useContext(ToastModalContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCarData((prevData) => ({
      ...prevData,
      [name]:
        name === "price_per_day" || name === "production_year"
          ? parseInt(value)
          : value,
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
      [name]:
        name === "Users_id" || name === "Cars_id" ? parseInt(value) : value,
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
      createToast({
        message: "Auto zostało dodane!",
        type: "primary",
        icon: faCircleCheck,
        timeout: 10000,
      });
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
    } catch (error) {
      console.error("Error while adding car:", error);
      createToast({
        message: "Błąd dodawania auta",
        type: "danger",
        icon: faCircleCheck,
        timeout: 10000,
      });
    }
  };

  const submitNewRental = async () => {
    const sinceDate = new Date(newRentalData.since);
    const untilDate = new Date(newRentalData.until);
    const formattedSince = sinceDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedUntil = untilDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    try {
      const response = await rentService.createRental({
        ...newRentalData,
        since: formattedSince,
        until: formattedUntil,
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
      createToast({
        message: "Wypożyczenie zostało dodane!",
        type: "primary",
        icon: faCircleCheck,
        timeout: 10000,
      });
    } catch (error) {
      console.error("Error while adding rental:", error);
      createToast({
        message: "Błąd dodawania wypożyczenia",
        type: "danger",
        icon: faCircleCheck,
        timeout: 10000,
      });
    }
  };

  const deleteCar = async (id: number) => {
    createConfirmModal({
      message: "Czy na pewno chcesz usunąć to auto?",
      onConfirm: async () => {
        try {
          await carService.delete(id);
          setCars((prevCars) => prevCars.filter((car) => car.id !== id));
          createToast({
            message: "Auto usunięte!",
            type: "primary",
            icon: faCircleCheck,
            timeout: 10000,
          });
        } catch (error) {
          console.error(error);
          createToast({
            message: "Błąd usuwania auta",
            type: "danger",
            icon: faCircleCheck,
            timeout: 10000,
          });
        }
      },
    });
  };

  const deleteRental = async (id: number) => {
    createConfirmModal({
      message: "Czy na pewno chcesz usunąć to wypożyczenie?",
      onConfirm: async () => {
        try {
          await rentService.removeRent(id);
          setRentals((prevRentals) =>
            prevRentals.filter((rental) => rental.id !== id)
          );
          createToast({
            message: "Wypożyczenie usunięte!",
            type: "primary",
            icon: faCircleCheck,
            timeout: 10000,
          });
        } catch (error) {
          console.error(error);
          createToast({
            message: "Błąd usuwania wypożyczenia",
            type: "danger",
            icon: faCircleCheck,
            timeout: 10000,
          });
        }
      },
    });
  };

  const editCar = async (car: Cars) => {
    navigate(`edit-car/${car.id}`);
  };

  const editRent = async (rent: Rentals) => {
    navigate(`edit-rent/${rent.id}`);
  };

  useEffect(() => {
    carService.getAll(pageData.page, 5).then((response) => {
      if (response.status === 200) {
        setCars(response.data.data);
        setPageData(response.data.meta);
      }
    });
  }, [pageData.page]);

  useEffect(() => {
    rentService.getAll(pageData2.page, 2).then((response) => {
      if (response.status === 200) {
        setRentals(response.data.data);
        setPageData2(response.data.meta);
      }
    });
  }, [pageData2.page]);

  useEffect(() => {
    userService.getAll().then((response) => {
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Zarządzanie Autami i Wypożyczeń</h1>
      <div className={tableStyle.tableContainer}>
        <h2>Lista Wypożyczeń</h2>
        <TableRent rents={rentals} onEdit={editRent} onDelete={deleteRental} />
        <Pagination
          pageData={pageData2}
          setPageData={setPageData2}
          className="mt-3"
        />
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
                <select
                  name="Users_id"
                  className="form-control"
                  value={newRentalData.Users_id}
                  onChange={createSelectChangeHandler}
                >
                  <option value="">Wybierz klienta</option>
                  {Array.isArray(users) &&
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Cars_id">ID samochodu</label>
                <select
                  name="Cars_id"
                  className="form-control"
                  value={newRentalData.Cars_id}
                  onChange={createSelectChangeHandler}
                >
                  <option value="">Wybierz auto</option>
                  {Array.isArray(cars) &&
                    cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.brand}
                      </option>
                    ))}
                </select>
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
        <Pagination
          pageData={pageData}
          setPageData={setPageData}
          className="mt-3"
        />
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
                <label htmlFor="license_plate">Tablica rejestracyjna</label>
                <input
                  type="text"
                  name="license_plate"
                  className="form-control"
                  value={newCarData.license_plate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fuel_type">Typ paliwa</label>
                <select
                  name="fuel_type"
                  className="form-control"
                  value={newCarData.fuel_type}
                  onChange={createCarSelectChangeHandler}
                >
                  <option value="">Wybierz typ paliwa</option>
                  <option value="PETROL">Benzyna</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="ELECTRIC">Elektryczny</option>
                  <option value="HYBRID">Hybrydowy</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="transmission_type">Typ skrzyni biegów</label>
                <select
                  name="transmission_type"
                  className="form-control"
                  value={newCarData.transmission_type}
                  onChange={createCarSelectChangeHandler}
                >
                  <option value="">Wybierz typ skrzyni biegów</option>
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
