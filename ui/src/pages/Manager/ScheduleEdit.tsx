import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import flightService from "../../services/flight.service";
import airplaneService from "../../services/airplane.service";
import { Flight, Airplane } from "../../assets/Data";

const emptyFlight: Flight = {
	id: "",
	arrival: "",
	departure: "",
	destination: "",
	status: "",
	airline_name: "",
	airplane_serial_no: "",
};

const ScheduleEdit = () => {
    const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [airplaneData, setAirplaneData] = useState<Airplane[]>([]);
	const [flightData, setFlightData] = useState<Flight>(emptyFlight);

	useEffect(() => {
		if (id === undefined) return;

		flightService.getById(id).then((response) => {
			if (response.status === 200) {
				const data = response.data.data[0];
				data.arrival = new Date(data.arrival)
					.toISOString()
					.slice(0, 19)
					.replace("T", " ");
				data.departure = new Date(data.arrival)
					.toISOString()
					.slice(0, 19)
					.replace("T", " ");
				setFlightData(data);
			}
		});
	}, [id]);

	useEffect(() => {
		airplaneService.getAll().then((response) => {
			if (response.status === 200) {
				setAirplaneData(response.data.data);
			}
		});
	}, []);

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (id === undefined) return;

        const submittedData = { ...flightData };

        submittedData.arrival = new Date(submittedData.arrival)
			.toISOString()
			.slice(0, 19)
			.replace("T", " ");
		submittedData.departure = new Date(submittedData.departure)
			.toISOString()
			.slice(0, 19)
			.replace("T", " ");

        // Regular expression to validate date and time format
        const datetimeRegex =
        /^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

        // Validate Arrival and Departure date and time format
        if (!datetimeRegex.test(submittedData.arrival)) {
            console.log(submittedData.arrival);
            return;
        }

        if (!datetimeRegex.test(submittedData.departure)) {
            console.log(submittedData.departure);
            return;
        }

		flightService.update(id, submittedData).then((response) => {
			if (response.status === 200) {
                alert("Zaktualizowano harmonogram")
                navigate("/harmonogram");
			}
		});
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFlightData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFlightData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

    return (
        <div>
            <h2>Edytuj harmonogram</h2>
            <form onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="arrival">Przylot</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="arrival"
                        name="arrival"
                        onChange={inputChangeHandler}
                        value={flightData.arrival}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departure">Odlot</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="departure"
                        name="departure"
                        onChange={inputChangeHandler}
                        value={flightData.departure}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="destination">Kierunek</label>
                    <input
                        type="text"
                        className="form-control"
                        id="destination"
                        name="destination"
                        onChange={inputChangeHandler}
                        value={flightData.destination}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id">Numer lotu</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        readOnly={true}
                        aria-readonly={true}
                        value={flightData.id}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        onChange={inputChangeHandler}
                        value={flightData.status}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="airline_name">Linia lotnicza</label>
                    <input
                        type="text"
                        className="form-control"
                        id="airline_name"
                        name="airline_name"
                        onChange={inputChangeHandler}
                        value={flightData.airline_name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="airplane_serial_no">Numer seryjny samolotu</label>
                    <select
                        className="form-control"
                        id="airplane_serial_no"
                        name="airplane_serial_no"
                        onChange={selectChangeHandler}
                        value={flightData.airplane_serial_no}
                    >
                        {airplaneData.map((airplane: Airplane) => (
                            <option
                                key={airplane.serial_no}
                                value={airplane.serial_no}
                            >
                                {airplane.serial_no}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Zapisz</button>
            </form>
        </div>
    );
};

export default ScheduleEdit;
