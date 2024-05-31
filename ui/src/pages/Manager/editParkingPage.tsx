import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parkingService from "../../services/parking.service";
import { ParkingReservations } from "../../assets/Data";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

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
  const { pid } = useParams<{ pid: string }>();
  const [parking, setParking] = useState<ParkingReservations>(emptyParking);

  useEffect(() => {
    if (pid === undefined) return;

    const parkingId = parseInt(pid);

    parkingService.getById(parkingId).then((response) => {
      if (response.status === 200) {
        setParking(response.data.data[0]);
      }
    });
  }, [pid]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await parkingService.updateParking(parking);
      if (response.status === 200) {
        alert("Edycja zakończona sukcesem!");
        navigate("/zarzadzanie/parking");
      }
    } catch (error) {
      console.error("Error while updating parking:", error);
      alert("Wystąpił błąd podczas aktualizacji parkingu. Spróbuj ponownie");
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParking({
      ...parking,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h1 className="text-center">Edytuj Parking</h1>
      <Form onSubmit={formSubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ID Klienta</Form.Label>
              <Form.Control
                type="number"
                name="Users_id"
                placeholder="ID Klienta"
                value={parking.Users_id}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data początkowa</Form.Label>
              <Form.Control
                type="datetime-local"
                name="since"
                placeholder="Data początkowa"
                value={parking.since}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data końcowa</Form.Label>
              <Form.Control
                type="datetime-local"
                name="until"
                placeholder="Data końcowa"
                value={parking.until}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Poziom parkingu</Form.Label>
              <Form.Control
                type="text"
                name="parking_level"
                placeholder="Poziom parkingu"
                value={parking.parking_level}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ID Miejsca</Form.Label>
              <Form.Control
                type="number"
                name="space_id"
                placeholder="ID Miejsca"
                value={parking.space_id}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Numer rejestracyjny</Form.Label>
              <Form.Control
                type="text"
                name="license_plate"
                placeholder="Numer rejestracyjny"
                value={parking.license_plate}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                placeholder="Status"
                value={parking.status}
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

export default EditParkingPage;
