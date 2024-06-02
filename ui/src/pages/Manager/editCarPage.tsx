import React, { useState, useEffect ,useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import carService from "../../services/car.service";
import { Cars } from "../../assets/Data";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const emptyCar: Cars = {
  id: 0,
  brand: "",
  model: "",
  price_per_day: 0,
  production_year: 0,
  license_plate: "",
  fuel_type: "",
  transmission_type: undefined,
};

const EditCarPage = () => {
  const {createConfirmModal,createToast} = useContext(ToastModalContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<Cars>(emptyCar);

  useEffect(() => {
    if (id === undefined) return;

    const carId = parseInt(id);

    carService.getById(carId).then((response) => {
      if (response.status === 200) {
        setCarData(response.data.data[0]);
      }
    });
  }, [id]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConfirmModal({
      message:"Czy na pewno chcesz zaktualizować ten samochód?",
      confirmBtnText:"Aktualizuj",
      confirmBtnClass:"btn-primary",
      onConfirm: async () => {
    try {
      const response = await carService.update(carData);
      if (response.status === 200) {
        createToast({
          message: "Dane samochodu zostały zaktualizowane",
          type: "primary",
          icon: faCircleCheck,
          timeout: 10000,
        });
        navigate("/zarzadzanie/pojazd");
      }
    } catch (error) {
      console.error("Error while updating car:", error);
      createToast({
        message: "Wystąpił błąd podczas aktualizacji samochodu",
        type: "danger",
        icon: faCircleCheck,
        timeout: 10000,
      });
    }
  }
});
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h1 className="text-center">Edytuj Samochód</h1>
      <Form onSubmit={formSubmitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Marka</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Brand"
                value={carData.brand}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                placeholder="Model"
                value={carData.model}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cena za dzień</Form.Label>
              <Form.Control
                type="number"
                name="price_per_day"
                placeholder="Price per day"
                value={carData.price_per_day}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Rok produkcji</Form.Label>
              <Form.Control
                type="number"
                name="production_year"
                placeholder="Production year"
                value={carData.production_year}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Numer rejestracyjny</Form.Label>
              <Form.Control
                type="text"
                name="license_plate"
                placeholder="License plate"
                value={carData.license_plate}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Rodzaj paliwa</Form.Label>
              <Form.Control
                type="text"
                name="fuel_type"
                placeholder="Fuel type"
                value={carData.fuel_type}
                onChange={inputChangeHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Skrzynia biegów</Form.Label>
              <Form.Select
                name="transmission_type"
                value={carData.transmission_type}
                onChange={selectChangeHandler}
              >
                <option value="MANUAL">Manualna</option>
                <option value="AUTOMATIC">Automatyczna</option>
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

export default EditCarPage;
