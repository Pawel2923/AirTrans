import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrDepTable from "../components/ArrDepTable";
import flightService from "../services/flight.service";
import airplaneService from "../services/airplane.service";
import { ArrDepTableProps, Flight, PageData, Airplane } from "../assets/Data";
import Pagination from "../components/Pagination";

const flightsDataParser = (flightsData: ArrDepTableProps[]) => {
	const flights: ArrDepTableProps[] = [];
	flightsData.map((flight: ArrDepTableProps) => {
		flights.push({
			id: flight.id,
			status: flight.status,
			airline_name: flight.airline_name,
			departure: flight.departure,
			arrival: flight.arrival,
			destination: flight.destination,
			airplane_serial_no: flight.airplane_serial_no,
			is_departure: flight.is_departure,
		});
	});
	return flights;
};

const emptyFlight: Flight = {
	id: "",
	arrival: "",
	departure: "",
	destination: "",
	status: "",
	airline_name: "",
	airplane_serial_no: "",
};

const Schedule = () => {
	const navigate = useNavigate();
	const [flights, setFlights] = useState<ArrDepTableProps[]>([]);
	const [airplaneData, setAirplaneData] = useState<Airplane[]>([]);
	const [pageData, setPageData] = useState<PageData>({ page: 1, pages: 1 });
	const [createData, setCreateData] = useState<Flight>(emptyFlight);
	const [deleteId, setDeleteId] = useState<string>("");

	useEffect(() => {
		flightService
			.getByArrivalOrDeparture(pageData.page, 10)
			.then((response) => {
				if (response.status === 200) {
					setFlights(flightsDataParser(response.data.data));
					setPageData(response.data.meta);
				}
			});
	}, [pageData.page]);

	useEffect(() => {
		airplaneService.getAll().then((response) => {
			if (response.status === 200) {
				setAirplaneData(response.data.data);
			}
		});
	}, []);

	const createInputChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCreateData({
			...createData,
			[e.target.name]: e.target.value,
		});
	};

	const createSelectChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCreateData({
			...createData,
			[e.target.name]: e.target.value,
		});
	};

	const deleteInputChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setDeleteId(e.target.value);
	};

	const createFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const submittedData = { ...createData };

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

		console.log(submittedData);

		flightService.create(submittedData).then((response) => {
			if (response.status === 201) {
				alert("Dodano nowy lot");
				navigate(0);
			}
		});
	};

	const deleteFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		flightService.delete(deleteId).then((response) => {
			if (response.status === 204) {
				alert("Usunięto lot");
				navigate(0);
			}
		});
	};

	return (
		<>
			<h1>Schedule</h1>
			<div>
				<h2>Harmonogram lotów:</h2>
				<ArrDepTable data={flights} hasActionButtons={true} />
				<Pagination pageData={pageData} setPageData={setPageData} />
			</div>
			<form onSubmit={createFormSubmitHandler}>
				<h3>Dodaj wpis do harmonogramu</h3>
				<input
					type="datetime-local"
					name="arrival"
					value={createData.arrival}
					placeholder="Przylot"
					onChange={createInputChangeHandler}
				/>
				<input
					type="datetime-local"
					name="departure"
					value={createData.departure}
					placeholder="Odlot"
					onChange={createInputChangeHandler}
				/>
				<input
					type="text"
					name="destination"
					value={createData.destination}
					placeholder="Kierunek"
					onChange={createInputChangeHandler}
				/>
				<input
					type="text"
					name="status"
					value={createData.status}
					placeholder="Status lotu"
					onChange={createInputChangeHandler}
				/>
				<input
					type="Numer lotu"
					name="id"
					value={createData.id}
					placeholder="Numer lotu"
					onChange={createInputChangeHandler}
				/>
				<input
					type="text"
					name="airline_name"
					value={createData.airline_name}
					placeholder="Linia lotnicza"
					onChange={createInputChangeHandler}
				/>
				<select
					name="airplane_serial_no"
					value={createData.airplane_serial_no}
					onChange={createSelectChangeHandler}
				>
					<option value="" hidden>
						Wybierz samolot
					</option>
					{airplaneData.map((airplane: Airplane) => (
						<option
							key={airplane.serial_no}
							value={airplane.serial_no}
						>
							{airplane.serial_no}
						</option>
					))}
				</select>
				<button type="submit">Dodaj</button>
			</form>
			<form onSubmit={deleteFormSubmitHandler}>
				<h3>Usuń wpis z harmonogramu</h3>
				<input
					type="text"
					name="delete_id"
					onChange={deleteInputChangeHandler}
					value={deleteId}
					placeholder="Numer lotu"
				/>
				<button type="submit">Usuń</button>
			</form>
		</>
	);
};

export default Schedule;
