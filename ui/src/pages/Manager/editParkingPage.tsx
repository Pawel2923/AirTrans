import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parkingService from "../../services/parking.service";
import userService from "../../services/users.service";
import { ParkingReservations, Users } from "../../assets/Data";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";


const emptyParking: ParkingReservations = {
  pid: 0,
  Users_id: 0,
  since: "",
  until: "",
  parking_level: "",
  space_id: "",
  license_plate: "",
  status: undefined,
};

const EditParkingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [parking, setParking] = useState<ParkingReservations>(emptyParking);
  const [users, setUsers] = useState<Users[]>([]);
  const { createToast, createConfirmModal } = useContext(ToastModalContext);

  useEffect(() => {
    if (id === undefined) return;

    const parkingId = parseInt(id);

    parkingService.getById(parkingId).then((response) => {
      if (response.status === 200) {
        setParking(response.data.data[0]);
      }
    }).catch((error) => {
      console.error("Error fetching parking data:", error);
    });

    userService.getAll().then((response) => {
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    }).catch((error) => {
      console.error("Error fetching users data:", error);
    });
  }
  , [id]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConfirmModal({
      message: "Czy na pewno chcesz zaktualizować rezerwację parkingu?",
      confirmBtnClass: "btn-primary",
      confirmBtnText: "Aktualizuj",

      onConfirm: async () => {
    try {
      const response = await parkingService.updateParking(parking);
      if (response.status === 200) {
        createToast({
          message: "Rezerwacja parkingu  została zaktualizowana",
          icon: faCircleCheck,
          type: "primary",
          timeout:10000,
        }
        );
        navigate("/zarzadzanie/parking");
      }
    } catch (error) {
      console.error("Error updating parking:", error);
      createToast({
        message: "Błąd podczas aktualizacji parkingu",
        icon: faCircleCheck,
        type: "danger",
        timeout: 10000,
      });
    }
  },
});
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setParking({
    ...parking,
    [e.target.name]: e.target.value,
  });
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setParking({
    ...parking,
    [e.target.name]: e.target.value,
  });
  };


return (
  <div className="container">
    <h1>Edytuj rezerwację parkingu</h1>
    <h2> Numer rezerwacji: #{parking.pid}</h2>
    <form onSubmit={formSubmitHandler}>
      <div className="form-group">
        <label htmlFor="Users_id">Klient</label>
        <select
          className="form-control"
          name="Users_id"
          id="Users_id"
          value={parking.Users_id}
          onChange={handleSelectChange}
        >
          <option value="">Wybierz klineta</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="since">Data rozpoczęcia</label>
        <input
          type="datetime-local"
          className="form-control"
          name="since"
          id="since"
          value={parking.since}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="until">Data zakończenia</label>
        <input
          type="datetime-local"
          className="form-control"
          name="until"
          id="until"
          value={parking.until}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="parking_level">Poziom parkingu</label>
        <select
          className="form-control"
          name="parking_level"
          id="parking_level"
          value={parking.parking_level}
          onChange={handleSelectChange}
        >
          <option value="">Wybierz poziom parkingu</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="space_id">Numer miejsca</label>
        <input
          type="number"
          className="form-control"
          name="space_id"
          id="space_id"
          value={parking.space_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="license_plate">Numer rejestracyjny</label>
        <input
          type="text"
          className="form-control"
          name="license_plate"
          id="license_plate"
          maxLength={8}
          value={parking.license_plate}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          className="form-control"
          name="status"
          id="status"
          value={parking.status}
          onChange={handleSelectChange}
        >
          <option value="">Wybierz status</option>
          <option value="PENDING">Zarezerwowane</option>
          <option value="RESERVED">Zarezerwowane</option>
          <option value="CANCELLED">Anulowane</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Zapisz
      </button>
    </form>
  </div>
);
};


export default EditParkingPage;
