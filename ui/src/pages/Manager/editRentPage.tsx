import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rentalService from "../../services/rental.service";
import { Rentals } from "../../assets/Data";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ToastModalContext from "../../store/toast-modal-context";

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
  const { createAlertModal, createConfirmModal } = useContext(ToastModalContext);

  useEffect(() => {
    if (id === undefined) return;

    const rentId = parseInt(id);

    rentalService.getById(rentId).then((response) => {
      if (response.status === 200) {
        setCarRent(response.data.data[0]);
      }
    });
  }, [id]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createConfirmModal({
      message: "Czy na pewno chcesz zaktualizować te dane?",
      onConfirm: async () => {
        try {
          const response = await rentalService.updateRent(carRental);
          if (response.status === 200) {
            createAlertModal({ message: "Edycja zakończona sukcesem!" });
            navigate("/zarzadzanie/pojazd");
          }
        } catch (error) {
          console.error("Error while updating rent:", error);
          createAlertModal({
            message:
              "Wystąpił błąd podczas aktualizacji wypożyczenia. Spróbuj ponownie",
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
              <Form.Label>ID Klienta</Form.Label>
              <Form.Control
                type="number"
                name="Users_id"
                placeholder="ID Klienta"
                value={carRental.Users_id}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ID Samochodu</Form.Label>
              <Form.Control
                type="number"
                name="Cars_id"
                placeholder="ID Samochodu"
                value={carRental.Cars_id}
                onChange={inputChangeHandler}
              />
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
