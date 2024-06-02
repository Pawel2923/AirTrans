import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import flightService from "../../services/flight.service";
import { FlightData, Flights } from "../../assets/Data";
import { flightsDataParser } from "../../utils/data-parser";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import { useDeleteFlight } from "../../hooks/flight/useDeleteFlight";
import flightDataService from "../../services/flightData.service";

const ScheduleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState<Flights[]>([]);
  const [flightParams, setFlightParams] = useState<FlightData>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { deleteFlight } = useDeleteFlight(undefined, true);

  useEffect(() => {
    if (id === undefined) return;

    flightService.getById(id).then((response) => {
      if (response.status === 200) {
        setFlightData(flightsDataParser([response.data.data][0]));
        flightDataService.getByFlightId(id).then((response) => {
          if (response.status === 200) {
            setFlightParams(response.data.data[0]);
          }
        });
      }
    });
  }, [id]);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      path: "/zarzadzanie/harmonogram",
      title: "Harmonogram",
    },
    {
      path: `/zarzadzanie/harmonogram/${id}`,
      title: "Szczegóły lotu",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="manager-block d-flex gap-5 justify-content-between">
        <div style={{ width: "100%" }}>
          <h3>Szczegóły lotu</h3>
          {flightData.map((flight: Flights, index) => (
            <ul key={index}>
              <li>
                <span className="fw-bold">Numer lotu:</span> {flight.id}
              </li>
              <li>
                <span className="fw-bold">Status:</span> {flight.status}
              </li>
              <li>
                <span className="fw-bold">Linia lotnicza:</span>{" "}
                {flight.airline_name}
              </li>
              <li>
                <span className="fw-bold">Miejsce docelowe:</span>{" "}
                {flight.destination}
              </li>
              <li>
                <span className="fw-bold">Miejsce starut:</span> {flight.origin}
              </li>
              <li>
                <span className="fw-bold">Przylot:</span> {flight.arrival}
              </li>
              <li>
                <span className="fw-bold">Odlot:</span> {flight.departure}
              </li>
              <li>
                <span className="fw-bold">Nr. seryjny samolotu:</span>{" "}
                {flight.airplane_serial_no}
              </li>
            </ul>
          ))}
          <Link
            to={`/zarzadzanie/harmonogram/${id}/edytuj`}
            className="btn btn-primary me-3"
          >
            Edytuj
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => setOpenConfirm(true)}
          >
            Usuń
          </button>
        </div>
        {flightParams ? (
          <div style={{ width: "100%" }}>
            <h3>Parametry lotu</h3>
            <ul>
              <li>
                <span className="fw-bold">Wysokość (n.p.m.):</span> {flightParams.altitude}ft
              </li>
              <li>
                <span className="fw-bold">Kurs:</span> {flightParams.track}&deg;
              </li>
              <li>
                <span className="fw-bold">Prędkość:</span> {flightParams.ground_speed}
                kt
              </li>
              <li>
                <span className="fw-bold">Prędkość wznoszenia:</span>{" "}
                {flightParams.vertical_speed}m/s
              </li>
              <li>
                <span className="fw-bold">Szerokość geograficzna:</span>{" "}
                {flightParams.latitude}
              </li>
              <li>
                <span className="fw-bold">Długość geograficzna:</span>{" "}
                {flightParams.longitude}
              </li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigate(`/zarzadzanie/harmonogram/${id}/edytuj-parametry`)}>Aktualizuj parametry</button>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <h3>Parametry lotu</h3>
            <p>Brak danych</p>
            <button className="btn btn-primary">Dodaj parametry</button>
          </div>
        )}
      </div>
      {openConfirm && (
        <ConfirmModal
          onClose={() => setOpenConfirm(false)}
          onConfirm={() => {
            deleteFlight(id || "null");
            setOpenConfirm(false);
          }}
          title="Potwierdź usunięcie"
          message="Czy na pewno chcesz usunąć lot?"
        />
      )}
    </>
  );
};

export default ScheduleDetails;
