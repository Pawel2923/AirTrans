import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rentalService from "../../services/rental.service";
import userService from "../../services/users.service";
import carService from "../../services/car.service";
import { Rentals, Users, Cars } from "../../assets/Data";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const emptyRental: Rentals = {
  id: 0,
  since: "",
  until: "",
  Users_id: 0,
  Cars_id: 0,
  status: undefined,
};

const EditRentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [carRental, setCarRent] = useState<Rentals>(emptyRental);
  const [users, setUsers] = useState<Users[]>([]);
  const [cars, setCars] = useState<Cars[]>([]);
  const { createToast, createConfirmModal } = useContext(ToastModalContext);

  useEffect(() => {
    if (id === undefined) return;

    const rentId = parseInt(id);

    rentalService
      .getById(rentId)
      .then((response) => {
        if (response.status === 200) {
          setCarRent(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching rental data:", error);
      });

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

    carService
      .getAllC()
      .then((response) => {
        if (response.status === 200) {
          setCars(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  }, [id]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createConfirmModal({
      message: "Czy na pewno chcesz zaktualizować te dane?",
      confirmBtnText: "Aktualizuj",
      confirmBtnClass: "btn-primary",
      onConfirm: async () => {
        try {
          const response = await rentalService.updateRent(carRental);
          if (response.status === 200) {
            createToast({
              message: "Dane wypożyczenia zostały zaktualizowane",
              type: "primary",
              icon: faCircleCheck,
              timeout: 10000,
            });
            navigate("/zarzadzanie/pojazd");
          }
        } catch (error) {
          console.error("Error while updating rent:", error);
          createToast({
            message: "Wystąpił błąd podczas aktualizacji wypożyczenia",
            type: "danger",
            icon: faCircleCheck,
            timeout: 10000,
          });
        }
      },
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarRent({
      ...carRental,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarRent({
      ...carRental,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h1 className="text-center">Edytuj Wypożyczenie</h1>
      <Form onSubmit={formSubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data wypożyczenia</Form.Label>
              <Form.Control
                type="datetime-local"
                name="since"
                placeholder="Data wypożyczenia"
                value={carRental.since?.toString()}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data zwrotu</Form.Label>
              <Form.Control
                type="datetime-local"
                name="until"
                placeholder="Data zwrotu"
                value={carRental.until?.toString()}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={carRental.status}
                onChange={selectChangeHandler}
              >
                <option value="PENDING">Zarezerwowane</option>
                <option value="RENTED">Wypożyczone</option>
                <option value="RETURNED">Zwrócone</option>
                <option value="CANCELLED">Anulowane</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Klient</Form.Label>
              <Form.Select
                name="Users_id"
                value={carRental.Users_id}
                onChange={selectChangeHandler}
              >
                <option value="">Wybierz klienta</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Samochód</Form.Label>
              <Form.Select
                name="Cars_id"
                value={carRental.Cars_id}
                onChange={selectChangeHandler}
              >
                <option value="">Wybierz auto</option>
                {Array.isArray(cars) &&
                  cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.brand}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Zapisz zmiany
        </Button>
      </Form>
    </Container>
  );
};

export default EditRentPage;
