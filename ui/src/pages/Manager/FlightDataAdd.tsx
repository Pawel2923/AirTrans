import React, { useContext, useEffect, useState } from "react";
import { FlightData } from "../../assets/Data";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import flightDataService from "../../services/flightData.service";
import ToastModalContext from "../../store/toast-modal-context";
import useErrorHandler from "../../hooks/useErrorHandler";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const FlightDataAdd: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flightData, setFlightData] = useState<FlightData>({
    id: 0,
    altitude: 0,
    track: 0,
    ground_speed: 0,
    vertical_speed: 0,
    latitude: 0,
    longitude: 0,
    Flight_id: "",
  });
  const { createToast } = useContext(ToastModalContext);
  const { handleError } = useErrorHandler();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlightData((prevFlightData) => ({
      ...prevFlightData,
      [name]: parseFloat(value),
    }));
  };

  useEffect(() => {
    if (id === undefined) return;

    flightDataService.getByFlightId(id).then((response) => {
      if (response.status === 200) {
        if (response.data.data.length > 0) {
          navigate(`/zarzadzanie/harmonogram/${id}`);
        }
      }
    });
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id === undefined) return;

    if (flightData.latitude === 0 || flightData.longitude === 0) {
      createToast({
        icon: faCheckCircle,
        type: "danger",
        message: "Współrzędne geograficzne nie mogą być puste",
      });
      return;
    }

    flightData.Flight_id = id;

    flightDataService
      .create(flightData)
      .then((response) => {
        if (response.status === 201) {
          createToast({
            icon: faCheckCircle,
            type: "primary",
            message: "Parametry lotu zostały dodane pomyślnie",
            action: {
              label: "Zobacz",
              onClick: () => {
                navigate(`/zarzadzanie/harmonogram/${id}`);
              },
            },
          });

          setTimeout(() => {
            navigate(`/zarzadzanie/harmonogram/${id}`);
          }, 5000);
        }
      })
      .catch((error) => {
        handleError({ error });
      });
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { path: "/zarzadzanie/harmonogram", title: "Harmonogram" },
    { path: `/zarzadzanie/harmonogram/${id}`, title: "Szczegóły lotu" },
    {
      path: `/zarzadzanie/harmonogram/${id}/dodaj-parametry`,
      title: "Dodaj parametry",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="manager-block">
        <h3>Aktualizuj parametry lotu</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="altitude">Wysokość (ft n.p.m)</label>
            <input
              type="number"
              name="altitude"
              value={flightData.altitude}
              onChange={handleChange}
              className="form-control"
              min={0}
            />
          </div>
          <div className="form-group">
            <label htmlFor="track">Kurs (&deg;)</label>
            <input
              type="number"
              name="track"
              value={flightData.track}
              onChange={handleChange}
              className="form-control"
              min={0}
              max={360}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ground_speed">Prędkość (kt)</label>
            <input
              type="number"
              name="ground_speed"
              value={flightData.ground_speed}
              onChange={handleChange}
              className="form-control"
              min={0}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vertical_speed">Prędkość wznoszenia (m/s)</label>
            <input
              type="number"
              name="vertical_speed"
              value={flightData.vertical_speed}
              onChange={handleChange}
              className="form-control"
              min={0}
            />
          </div>
          <div className="form-group">
            <label htmlFor="latitude">Szerokość geograficzna</label>
            <input
              type="number"
              step={0.00001}
              name="latitude"
              value={flightData.latitude}
              onChange={handleChange}
              className="form-control"
              min={0}
              required={true}
              aria-required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="longitude">Długość geograficzna</label>
            <input
              type="number"
              step={0.00001}
              name="longitude"
              value={flightData.longitude}
              onChange={handleChange}
              className="form-control"
              min={0}
              required={true}
              aria-required={true}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Dodaj
          </button>
        </form>
      </div>
    </>
  );
};

export default FlightDataAdd;
