import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import useGetFlight from "../../hooks/flight/useGetFlight";
import useGetAirfield from "../../hooks/airfield/useGetAirfield";
import useUpdateAirfield from "../../hooks/airfield/useUpdateAirfield";
import ToastModalContext from "../../store/toast-modal-context";

type Status = "EMPTY" | "OCCUPIED" | "CLOSED" | "READY" | "FULL";

const AirfieldEdit = () => {
  const { table, id } = useParams();
  const { createToast } = useContext(ToastModalContext);
  const { flightIds, getFlightIds } = useGetFlight();
  const { runwayData, taxiwayData, terminalData, getAirfieldTable } =
    useGetAirfield();
  const { updateAirfield } = useUpdateAirfield();

  const [status, setStatus] = useState<Status>("CLOSED");
  const [selectedFlightId, setSelectedFlightId] = useState<string>("");
  const [runwayLength, setRunwayLength] = useState<number>(3000);
  const [numOfStations, setNumOfStations] = useState<number>(1);

  const tableName =
    table === "droga-kolowania"
      ? "Taxiways"
      : table === "pas-startowy"
        ? "Runways"
        : "Terminals";

  // Fetch data based on table name
  useEffect(() => {
    getAirfieldTable(tableName, id as string);
  }, [getAirfieldTable, id, tableName]);

  // Set initial values
  useEffect(() => {
    switch (tableName) {
      case "Terminals":
        if (terminalData) {
          setStatus(terminalData[0].status || "EMPTY");
          setNumOfStations(terminalData[0].num_of_stations);
          setSelectedFlightId(terminalData[0].Flight_id || "");
        }
        break;
      case "Taxiways":
        if (taxiwayData) {
          setStatus(taxiwayData[0].status || "READY");
          setSelectedFlightId(taxiwayData[0].Flight_id || "");
        }
        break;
      case "Runways":
        if (runwayData) {
          setStatus(runwayData[0].status || "READY");
          setRunwayLength(runwayData[0].length);
          setSelectedFlightId(runwayData[0].Flight_id || "");
        }
        break;
      default:
        break;
    }
  }, [runwayData, tableName, taxiwayData, terminalData]);

  // Fetch flight ids if status is OCCUPIED
  useEffect(() => {
    if (status === "OCCUPIED") {
      getFlightIds();
    }
  }, [getFlightIds, status]);

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Status);
  };

  const flightIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFlightId(e.target.value);
  };

  const runwayLengthChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRunwayLength(parseInt(e.target.value));
  };

  const numOfStationsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumOfStations(parseInt(e.target.value));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      createToast({
        message: "Id is not defined",
        type: "danger",
        icon: faCircleExclamation,
      });
      return;
    }

    let newData = [];

    switch (tableName) {
      case "Terminals":
        newData = terminalData || [];
        if (numOfStations > 0) {
          newData[0].num_of_stations = numOfStations;
        }
        break;
      case "Taxiways":
        newData = taxiwayData || [];
        break;
      case "Runways":
        newData = runwayData || [];
        if (runwayLength > 0) {
          newData[0].length = runwayLength;
        }
        break;
      default:
        return;
    }

    if (status === "OCCUPIED" || status === "FULL") {
      if (!flightIds.includes(selectedFlightId as string)) {
        createToast({
          message: "Wprowadź istniejący numer lotu",
          type: "danger",
          icon: faCircleExclamation,
        });
        return;
      }

      newData[0].Flight_id = selectedFlightId;
    }

    newData[0].status = status;

    updateAirfield(tableName as string, newData[0], id);
  };

  const title =
    tableName === "Terminals"
      ? "terminal"
      : tableName === "Taxiways"
        ? "drogę kołowania"
        : "pas startowy";

  const breadcrumbs: BreadcrumbItem[] = [
    { path: "/zarzadzanie/lotnisko", title: "Lotnisko" },
    {
      path: `/zarzadzanie/lotnisko/${table}/${id}/edytuj`,
      title: `Edytuj ${title}`,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <div>
        <h2>
          Edytuj {title} {id}
        </h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              className="form-control"
              value={status}
              onChange={selectChangeHandler}
            >
              {tableName === "Terminals" && (
                <>
                  <option value="EMPTY">EMPTY</option>
                  <option value="OCCUPIED">OCCUPIED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="FULL">FULL</option>
                </>
              )}
              {tableName === "Taxiways" && (
                <>
                  <option value="READY">READY</option>
                  <option value="OCCUPIED">OCCUPIED</option>
                  <option value="CLOSED">CLOSED</option>
                </>
              )}
              {tableName === "Runways" && (
                <>
                  <option value="READY">READY</option>
                  <option value="OCCUPIED">OCCUPIED</option>
                  <option value="CLOSED">CLOSED</option>
                </>
              )}
            </select>
          </div>
          {status === "OCCUPIED" && (
            <div className="form-group">
              <label htmlFor="Flight_id">Numer lotu:</label>
              <input
                className="form-control"
                list="flightIdsOptions"
                id="Flight_id"
                name="Flight_id"
                placeholder="Numer lotu"
                value={selectedFlightId}
                onChange={flightIdChangeHandler}
              />
              <datalist id="flightIdsOptions">
                {flightIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </datalist>
            </div>
          )}
          {runwayData && runwayData.length > 0 && (
            <div className="form-group">
              <label htmlFor="length">Długość:</label>
              <input
                className="form-control"
                type="number"
                id="length"
                name="length"
                value={runwayLength}
                onChange={runwayLengthChangeHandler}
              />
            </div>
          )}
          {terminalData && terminalData.length > 0 && (
            <div className="form-group">
              <label htmlFor="num_of_stations">Liczba miejsc:</label>
              <input
                className="form-control"
                type="number"
                name="num_of_stations"
                id="num_of_stations"
                value={numOfStations}
                onChange={numOfStationsChangeHandler}
              />
            </div>
          )}
          <button className="btn btn-primary mt-3" type="submit">
            Zapisz
          </button>
        </form>
      </div>
    </>
  );
};

export default AirfieldEdit;
