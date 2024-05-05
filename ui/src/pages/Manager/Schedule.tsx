import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrDepTable from "../../components/ArrDepTable";
import flightService from "../../services/flight.service";
import airplaneService from "../../services/airplane.service";
import {
	ArrDepTableProps,
	Flight,
	PageData,
	Airplane,
} from "../../assets/Data";
import Pagination from "../../components/Pagination";
import Toast from "../../components/Toast";
import {
	faCircleCheck,
	faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

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
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [flights, setFlights] = useState<ArrDepTableProps[]>([]);
	const [refreshData, setRefreshData] = useState<boolean>(false);
	const [airplaneData, setAirplaneData] = useState<Airplane[]>([]);
	const [pageData, setPageData] = useState<PageData>({
		page: parseInt(searchParams.get("page") || "1"),
		pages: 1,
	});
	const [createData, setCreateData] = useState<Flight>(emptyFlight);
	const [toast, setToast] = useState<typeof Toast | null>(null);

	useEffect(() => {
		flightService
			.getByArrivalOrDeparture(pageData.page, 5)
			.then((response) => {
				if (response.status === 200) {
					setFlights(flightsDataParser(response.data.data));
					setPageData(response.data.meta);
				}
			});
	}, [pageData.page, refreshData]);

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
		setCreateData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const createSelectChangeHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCreateData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const createFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const submittedData = { ...createData };

		try {
			submittedData.arrival = new Date(submittedData.arrival)
			.toISOString()
			.slice(0, 19)
			.replace("T", " ");
		submittedData.departure = new Date(submittedData.departure)
			.toISOString()
			.slice(0, 19)
			.replace("T", " ");
		} catch (error) {
			setToast(() => (
				<Toast
					icon={faCircleExclamation}
					message="Niepoprawna data i godzina lotu"
					onClose={() => setToast(null)}
					type="danger"
				/>
			));
			return;
		}

		// Regular expression to validate date and time format
		const datetimeRegex =
			/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

		// Validate Arrival and Departure date and time format
		if (!datetimeRegex.test(submittedData.arrival)) {
			setToast(() => (
				<Toast
					icon={faCircleExclamation}
					message="Niepoprawna data i godzina przylotu"
					onClose={() => setToast(null)}
					type="danger"
				/>
			));
			return;
		}

		if (!datetimeRegex.test(submittedData.departure)) {
			setToast(() => (
				<Toast
					icon={faCircleExclamation}
					message="Niepoprawna data i godzina odlotu"
					onClose={() => setToast(null)}
					type="danger"
				/>
			));
			return;
		}

		flightService
			.create(submittedData)
			.then((response) => {
				if (response.status === 201) {
					const { id } = response.data.data;

					setToast(() => (
						<Toast
							icon={faCircleCheck}
							message="Lot został dodany"
							onClose={() => setToast(null)}
							action={{
								label: "Zobacz",
								onClick: () => {
									setToast(null);
									navigate(id);
								},
							}}
							type="primary"
						/>
					));
					setRefreshData((prev) => !prev);
				}
			})
			.catch(({ response: errorResponse }) => {
				if (errorResponse.status === 400) {
					setToast(() => (
						<Toast
							icon={faCircleExclamation}
							message="Niepoprawne dane lotu"
							onClose={() => setToast(null)}
							type="danger"
						/>
					));
				} else if (errorResponse.status === 409) {
					setToast(() => (
						<Toast
							icon={faCircleExclamation}
							message="Lot o podanym numerze już istnieje"
							onClose={() => setToast(null)}
							type="danger"
						/>
					));
				} else {
					setToast(() => (
						<Toast
							icon={faCircleExclamation}
							message="Wystąpił błąd podczas dodawania lotu"
							onClose={() => setToast(null)}
							type="danger"
						/>
					));
				}
			});
	};

	return (
		<>
			<div>
				<h2>Harmonogram odlotów i przylotów</h2>
				<ArrDepTable
					data={flights}
					hasActionButtons={true}
					setRefreshData={setRefreshData}
				/>
				<Pagination
					className="mt-3"
					pageData={pageData}
					setPageData={setPageData}
				/>
			</div>
			<form onSubmit={createFormSubmitHandler}>
				<h3>Dodaj wpis do harmonogramu</h3>
				<div className="form-group">
					<label htmlFor="arrival">Przylot</label>
					<input
						type="datetime-local"
						className="form-control"
						id="arrival"
						name="arrival"
						value={createData.arrival}
						onChange={createInputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="departure">Odlot</label>
					<input
						type="datetime-local"
						className="form-control"
						id="departure"
						name="departure"
						value={createData.departure}
						onChange={createInputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="destination">Kierunek</label>
					<input
						type="text"
						className="form-control"
						id="destination"
						name="destination"
						value={createData.destination}
						onChange={createInputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="status">Status lotu</label>
					<input
						type="text"
						className="form-control"
						id="status"
						name="status"
						value={createData.status}
						onChange={createInputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="id">Numer lotu</label>
					<input
						type="text"
						className="form-control"
						id="id"
						name="id"
						value={createData.id}
						onChange={createInputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="airline_name">Linia lotnicza</label>
					<input
						type="text"
						className="form-control"
						id="airline_name"
						name="airline_name"
						value={createData.airline_name}
						onChange={createInputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="airplane_serial_no">Wybierz samolot</label>
					<select
						className="form-control"
						id="airplane_serial_no"
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
				</div>
				<button type="submit" className="btn btn-primary">
					Dodaj
				</button>
			</form>
			{toast}
		</>
	);
};

export default Schedule;
