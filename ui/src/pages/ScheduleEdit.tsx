import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import flightService from "../services/flight.service";
import airplaneService from "../services/airplane.service";
import { Flight, Airplane } from "../assets/Data";

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

        submittedData.arrival = submittedData.arrival.replace("T", " ");
        submittedData.departure = submittedData.departure.replace("T", " ");

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
				console.log("Success");
			}
		});
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFlightData({
			...flightData,
			[e.target.name]: e.target.value,
		});
	};

	const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFlightData({
			...flightData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<h1>Edit Schedule</h1>
			<form onSubmit={formSubmitHandler}>
				<input
					type="datetime-local"
					name="arrival"
					placeholder="Przylot"
					onChange={inputChangeHandler}
					value={flightData.arrival}
				/>
				<input
					type="datetime-local"
					name="departure"
					placeholder="Odlot"
					onChange={inputChangeHandler}
					value={flightData.departure}
				/>
				<input
					type="text"
					name="destination"
					placeholder="Kierunek"
					onChange={inputChangeHandler}
					value={flightData.destination}
				/>
				<input
					type="Numer lotu"
					name="id"
					placeholder="Numer lotu"
                    readOnly={true}
                    aria-readonly={true}
					value={flightData.id}
				/>
				<input
					type="text"
					name="status"
					placeholder="Status"
					onChange={inputChangeHandler}
					value={flightData.status}
				/>
				<input
					type="text"
					name="airline_name"
					placeholder="Linia lotnicza"
					onChange={inputChangeHandler}
					value={flightData.airline_name}
				/>
				<select
					onChange={selectChangeHandler}
					name="airplane_serial_no"
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
				<button type="submit">Zapisz</button>
			</form>
		</div>
	);
};

export default ScheduleEdit;
