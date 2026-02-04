import React, { useState, useEffect, useCallback, useContext } from "react";
import parkingService from "../../services/parking.service";
import userService from "../../services/users.service";
import TableParking from "../../components/tableParking";
import { PageData, ParkingReservations, Users } from "../../assets/Data";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Parking = () => {
  const { createConfirmModal, createToast } = useContext(ToastModalContext);
  const [parkings, setParkings] = useState<ParkingReservations[]>([]);
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<PageData>({
    page: 1,
    pages: 1,
  });
  const [users, setUsers] = useState<Users[]>([]);
  const [occupiedSpaces, setOccupiedSpaces] = useState<{
    [key: string]: boolean;
  }>({});
  const [spaceOptions, setSpaceOptions] = useState<number[]>([]);
  const [newParking, setNewParking] = useState<ParkingReservations>({
    id: 0,
    Users_id: 0,
    since: "",
    until: "",
    parking_level: "",
    space_id: "",
    license_plate: "",
    status: undefined,
  });

  const retrieveParkings = useCallback(async () => {
    try {
      const response = await parkingService.getAllParking(pageData.page, 5);
      setParkings(response.data.data);
      setPageData(response.data.meta);
      const occupied = response.data.data.reduce(
        (acc: { [key: string]: boolean }, parking: ParkingReservations) => {
          if (parking.status === "PENDING" || parking.status === "RESERVED") {
            acc[parking.space_id] = true;
          }
          return acc;
        },
        {}
      );
      setOccupiedSpaces(occupied);
    } catch (error) {
      console.error("Error fetching parkings data:", error);
    }
  }, [pageData.page]);

  useEffect(() => {
    retrieveParkings();
  }, [retrieveParkings]);

  const retrieveUsers = useCallback(() => {
    userService
      .getAll()
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, []);

  useEffect(() => {
    retrieveUsers();
  }, [retrieveUsers]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewParking((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "parking_level") {
      updateSpaceOptions(value);
    }
  };

  const updateSpaceOptions = (level: string) => {
    let options: number[] = [];
    if (level === "A") {
      options = Array.from({ length: 51 }, (_, i) => i);
    } else if (level === "B") {
      options = Array.from({ length: 50 }, (_, i) => i + 51);
    }
    setSpaceOptions(options);
    setNewParking((prevData) => ({
      ...prevData,
      space_id: options[0].toString(),
    }));
  };

  const submitNewParking = async () => {
    try {
      const response = await parkingService.createParking(newParking);
      setParkings([...parkings, response.data]);
      setNewParking({
        id: 0,
        Users_id: 0,
        since: "",
        until: "",
        parking_level: "",
        space_id: "",
        license_plate: "",
        status: undefined,
      });
      createToast({
        message: "Dodano nowy parking",
        type: "primary",
        icon: faCircleCheck,
        timeout: 10000,
      });
      retrieveParkings();
    } catch (error) {
      console.error(error);
      createToast({
        message: "Wystąpił błąd podczas dodawania parkingu",
        type: "danger",
        icon: faCircleCheck,
        timeout: 10000,
      });
    }
  };

  const deleteParking = async (id: number) => {
    createConfirmModal({
      message: "Czy na pewno chcesz usunąć ten rezerwacje parkingu?",
      onConfirm: async () => {
        try {
          await parkingService.delete(id);
          setParkings(parkings.filter((park) => park.id !== id));
          createToast({
            message: "Usunięto parking",
            type: "primary",
            icon: faCircleCheck,
            timeout: 10000,
          });
          retrieveParkings();
        } catch (error) {
          console.error(error);
          createToast({
            message:
              "Wystąpił błąd podczas usuwania parkingu. Spróbuj ponownie.",
            type: "danger",
            icon: faCircleCheck,
            timeout: 10000,
          });
        }
      },
    });
  };

  const editParking = async (parking: ParkingReservations) => {
    navigate(`edit-parking/${parking.id}`);
  };

  return (
    <div className="container">
      <h1 className="text-center">Zarządzanie Parkingami</h1>
      <div className="row">
        <div className="col-12">
          <TableParking
            parkings={parkings}
            onEdit={editParking}
            onDelete={deleteParking}
          />
          <Pagination
            className="mt-3"
            pageData={pageData}
            setPageData={setPageData}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Dodaj nowy parking</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="Users_id">Klient</label>
                <select
                  name="Users_id"
                  className="form-control"
                  value={newParking.Users_id}
                  onChange={handleInputChange}
                >
                  <option value="">Wybierz klienta</option>
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
                  name="since"
                  className="form-control"
                  value={newParking.since}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="until">Data zakończenia</label>
                <input
                  type="datetime-local"
                  name="until"
                  className="form-control"
                  value={newParking.until}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="parking_level">Poziom parkingu</label>
                <select
                  name="parking_level"
                  className="form-control"
                  value={newParking.parking_level}
                  onChange={handleInputChange}
                >
                  <option value="">Wybierz poziom parkingu</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="space_id">Numer miejsca</label>
                <select
                  name="space_id"
                  className="form-control"
                  value={newParking.space_id}
                  onChange={handleInputChange}
                >
                  <option value="">Wybierz miejsce</option>
                  {spaceOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      disabled={occupiedSpaces[option]}
                      style={occupiedSpaces[option] ? { color: "red" } : {}}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="license_plate">Numer rejestracyjny</label>
                <input
                  type="text"
                  name="license_plate"
                  className="form-control"
                  maxLength={8}
                  value={newParking.license_plate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={newParking.status}
                  onChange={handleInputChange}
                >
                  <option value="">Wybierz status</option>
                  <option value="PENDING">W toku</option>
                  <option value="RESERVED">Zarezerwowany</option>
                  <option value="CANCELLED">Anulowany</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={submitNewParking}>
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parking;
