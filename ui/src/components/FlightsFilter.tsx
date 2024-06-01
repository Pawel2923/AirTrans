import { useEffect, useState } from "react";
import ConfirmModal from "../components/Modals/ConfirmModal";
import useGetFlight from "../hooks/flight/useGetFlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "../assets/Data";

interface FilterInputs {
  status?: string;
  airline?: string;
  departure?: {
    dateFrom?: string;
    dateTo?: string;
  };
  arrival?: {
    dateFrom?: string;
    dateTo?: string;
  };
  destination?: string;
  origin?: string;
  airplaneSerialNumber?: string;
}

interface FlightsFilterProps {
  setFilterData: React.Dispatch<React.SetStateAction<Filter[]>>;
  setIsFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlightsFilter = ({
  setFilterData,
  setIsFilterModalOpen,
}: FlightsFilterProps) => {
  const { getData } = useGetFlight();
  const [airlines, setAirlines] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [airplaneSerialNumbers, setAirplaneSerialNumbers] = useState<string[]>(
    []
  );

  const [filterInputs, setFilterInputs] = useState<FilterInputs>({
    status: "",
    airline: "",
    departure: {
      dateFrom: "",
      dateTo: "",
    },
    arrival: {
      dateFrom: "",
      dateTo: "",
    },
    destination: "",
    origin: "",
    airplaneSerialNumber: "",
  });

  useEffect(() => {
    const filterInputs = sessionStorage.getItem("filterInputs");
    if (filterInputs) {
      setFilterInputs(JSON.parse(filterInputs));
    }
  }, []);

  useEffect(() => {
    getData("airline_name").then((response) => {
      if (response.status === 200) {
        setAirlines(response.data.data);
      }
    });
    getData("destination").then((response) => {
      if (response.status === 200) {
        setDestinations(response.data.data);
      }
    });
    getData("origin").then((response) => {
      if (response.status === 200) {
        setOrigins(response.data.data);
      }
    });
    getData("airplane_serial_no").then((response) => {
      if (response.status === 200) {
        setAirplaneSerialNumbers(response.data.data);
      }
    });
  }, [getData]);

  const departureChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInputs((prev) => ({
      ...prev,
      departure: { ...prev.departure, [e.target.name]: e.target.value },
    }));
  };

  const arrivalChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInputs((prev) => ({
      ...prev,
      arrival: { ...prev.arrival, [e.target.name]: e.target.value },
    }));
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const confirmHandler = () => {
    setIsFilterModalOpen(false);
    sessionStorage.setItem("filterInputs", JSON.stringify(filterInputs));

    const filterData: Filter[] = [];

    if (filterInputs.status) {
      filterData.push({ by: "status", value: filterInputs.status });
    }

    if (filterInputs.airline) {
      filterData.push({ by: "airline_name", value: filterInputs.airline });
    }

    if (filterInputs.departure?.dateFrom && filterInputs.departure?.dateTo) {
      filterData.push({
        by: "departure",
        operator: "BETWEEN",
        value: [
          filterInputs.departure?.dateFrom,
          filterInputs.departure?.dateTo,
        ],
      });
    }

    if (filterInputs.arrival?.dateFrom && filterInputs.arrival?.dateTo) {
      filterData.push({
        by: "arrival",
        operator: "BETWEEN",
        value: [filterInputs.arrival?.dateFrom, filterInputs.arrival?.dateTo],
      });
    }

    if (filterInputs.destination) {
      filterData.push({ by: "destination", value: filterInputs.destination });
    }

    if (filterInputs.origin) {
      filterData.push({ by: "origin", value: filterInputs.origin });
    }

    if (filterInputs.airplaneSerialNumber) {
      filterData.push({
        by: "airplane_serial_no",
        value: filterInputs.airplaneSerialNumber,
      });
    }

    setFilterData(filterData);
    sessionStorage.setItem("filterData", JSON.stringify(filterData));
  };

  const clearFilterHandler = () => {
    setFilterInputs({
      status: "",
      airline: "",
      departure: {
        dateFrom: "",
        dateTo: "",
      },
      arrival: {
        dateFrom: "",
        dateTo: "",
      },
      destination: "",
      origin: "",
      airplaneSerialNumber: "",
    });
    sessionStorage.removeItem("filterInputs");
    sessionStorage.removeItem("filterData");
    setFilterData([]);
    setIsFilterModalOpen(false);
  }

  return (
    <ConfirmModal
      onClose={() => setIsFilterModalOpen(false)}
      onConfirm={confirmHandler}
      title="Filtruj loty"
      modalContentStyle={{ margin: "10% auto" }}
      children={
        <div>
          <label htmlFor="status">Status lotu</label>
          <select
            name="status"
            className="form-select"
            value={filterInputs.status}
            onChange={selectChangeHandler}
          >
            <option value="">Wszystkie</option>
            <option value="SCHEDULED">Zaplanowany</option>
            <option value="WAITING">Oczekujący</option>
            <option value="AIRBORNE">W powietrzu</option>
            <option value="TAKE OFF">Start</option>
            <option value="LANDING">Lądowanie</option>
            <option value="FINISHED">Zakończony</option>
            <option value="CANCELED">Anulowany</option>
            <option value="DELAYED">Opóźniony</option>
          </select>
          <label htmlFor="airline" className="mt-2">
            Linia lotnicza
          </label>
          <select
            name="airline"
            className="form-select"
            value={filterInputs.airline}
            onChange={selectChangeHandler}
          >
            <option value="">Wszystkie</option>
            {airlines.map((airline) => (
              <option key={airline} value={airline}>
                {airline}
              </option>
            ))}
          </select>
          <label className="mt-2">Data odlotu</label>
          <div className="form-group d-flex align-items-center">
            <input
              type="date"
              name="dateFrom"
              className="form-control me-3"
              style={{ display: "inline-block", width: "100%" }}
              value={filterInputs.departure?.dateFrom}
              onChange={departureChangeHandler}
            />
            <FontAwesomeIcon icon={faMinus} className="me-3" />
            <input
              type="date"
              name="dateTo"
              className="form-control"
              style={{ display: "inline-block", width: "100%" }}
              value={filterInputs.departure?.dateTo}
              onChange={departureChangeHandler}
            />
          </div>
          <label className="mt-2">Data przylotu</label>
          <div className="form-group d-flex align-items-center">
            <input
              type="date"
              name="dateFrom"
              className="form-control me-3"
              style={{ display: "inline-block", width: "100%" }}
              value={filterInputs.arrival?.dateFrom}
              onChange={arrivalChangeHandler}
            />
            <FontAwesomeIcon icon={faMinus} className="me-3" />
            <input
              type="date"
              name="dateTo"
              className="form-control"
              style={{ display: "inline-block", width: "100%" }}
              value={filterInputs.arrival?.dateTo}
              onChange={arrivalChangeHandler}
            />
          </div>
          <label htmlFor="destination" className="mt-2">
            Miejsce docelowe
          </label>
          <select
            name="destination"
            className="form-select"
            value={filterInputs.destination}
            onChange={selectChangeHandler}
          >
            <option value="">Wszystkie</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
          <label htmlFor="origin" className="mt-2">
            Miejsca startu
          </label>
          <select
            name="origin"
            className="form-select"
            value={filterInputs.origin}
            onChange={selectChangeHandler}
          >
            <option value="">Wszystkie</option>
            {origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
          <label htmlFor="airplaneSerialNumber" className="mt-2">
            Numer seryjny samolotu
          </label>
          <select
            name="airplaneSerialNumber"
            className="form-select"
            value={filterInputs.airplaneSerialNumber}
            onChange={selectChangeHandler}
          >
            <option value="">Wszystkie</option>
            {airplaneSerialNumbers.map((serialNumber) => (
              <option key={serialNumber} value={serialNumber}>
                {serialNumber}
              </option>
            ))}
          </select>
          <button className="btn btn-alt mt-3" onClick={clearFilterHandler}>Resetuj</button>
        </div>
      }
      confirmBtnText="Filtruj"
      confirmBtnClass="btn-primary"
    />
  );
};

export default FlightsFilter;
