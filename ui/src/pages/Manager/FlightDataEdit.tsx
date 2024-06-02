import React, { useEffect, useState } from "react";
import { FlightData } from "../../assets/Data";
import { useParams } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import flightDataService from "../../services/flightData.service";

const FlightDataEdit: React.FC = () => {
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
  const [oldFlightData, setOldFlightData] = useState<FlightData>();
  const [refreshData, setRefreshData] = useState<boolean>(false);

  useEffect(() => {
    if (id === undefined) return;

    flightDataService.getByFlightId(id).then((response) => {
      if (response.status === 200) {
        setOldFlightData(response.data.data[0]);
      }
    });
  }, [id, refreshData]);

  useEffect(() => {
    if (oldFlightData === undefined) return;

    setFlightData(oldFlightData);
  }, [oldFlightData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlightData((prevFlightData) => ({
      ...prevFlightData,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id === undefined) return;

    flightDataService
      .update(flightData.id as number, flightData)
      .then((response) => {
        if (response.status === 200) {
          setRefreshData((prev) => !prev);
        }
      });
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { path: "/zarzadzanie/harmonogram", title: "Harmonogram" },
    { path: `/zarzadzanie/harmonogram/${id}`, title: "Szczegóły lotu" },
    { path: `/zarzadzanie/harmonogram/${id}/edytuj`, title: "Edytuj" },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="manager-block">
        <h3>Aktualizuj parametry lotu</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="altitude">Wysokość (n.p.m)</label>
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
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Zapisz
          </button>
        </form>
      </div>
    </>
  );
};

export default FlightDataEdit;
