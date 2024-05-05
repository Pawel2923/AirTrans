import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import flightService from "../../services/flight.service";
import airplaneService from "../../services/airplane.service";
import { Flight, Airplane } from "../../assets/Data";
import { flightsDataParser } from "../../utils/data-parser";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import { useUpdateFlight } from "../../hooks/use-flight";
import Toast from "../../components/Toast";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

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
    const [newFlightData, setNewFlightData] = useState<Flight>(emptyFlight);
    const [refreshData, setRefreshData] = useState<boolean>(false);
    const [toast, setToast] = useState<typeof Toast | null>(null);
    const { toast: updateToast, updateFlight } = useUpdateFlight(setRefreshData);

	useEffect(() => {
		if (id === undefined) return;

		flightService.getById(id).then((response) => {
			if (response.status === 200) {
                const data = flightsDataParser((response.data.data));
				setFlightData(data[0]);
                setNewFlightData(data[0]);
			}
		});
	}, [id, refreshData]);

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

		let submittedData = { ...newFlightData };

		submittedData = flightsDataParser([submittedData])[0];
        if (submittedData.arrival !== flightData.arrival) {
            submittedData.arrival += ":00";
        }
        if (submittedData.departure !== flightData.departure) {
            submittedData.departure += ":00";
        }

        console.log(submittedData);

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

        // Check if new data is different from the old data
        if (
            submittedData.arrival === flightData.arrival &&
            submittedData.departure === flightData.departure &&
            submittedData.destination === flightData.destination &&
            submittedData.status === flightData.status &&
            submittedData.airline_name === flightData.airline_name &&
            submittedData.airplane_serial_no === flightData.airplane_serial_no
        ) {
            setToast(() => (
                <Toast
                    icon={faCircleExclamation}
                    message="Nie dokonano zmian"
                    onClose={() => setToast(null)}
                    type="warning"
                />
            ));
            return;
        }

		updateFlight(id, submittedData);
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewFlightData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNewFlightData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const breadcrumbItems: BreadcrumbItem[] = [
		{ path: "/zarzadzanie/harmonogram", title: "Harmonogram" },
		{ path: `/zarzadzanie/harmonogram/${id}`, title: "Szczegóły lotu" },
		{ path: `/zarzadzanie/harmonogram/${id}/edytuj`, title: "Edytuj" },
	];

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
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
						value={newFlightData.arrival}
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
						value={newFlightData.departure}
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
						value={newFlightData.destination}
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
						value={newFlightData.id}
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
						value={newFlightData.status}
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
						value={newFlightData.airline_name}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="airplane_serial_no">
						Numer seryjny samolotu
					</label>
					<select
						className="form-control"
						id="airplane_serial_no"
						name="airplane_serial_no"
						onChange={selectChangeHandler}
						value={newFlightData.airplane_serial_no}
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
				<button type="submit" className="btn btn-primary mt-3">
					Zapisz
				</button>
			</form>
            {toast}
            {updateToast}
		</>
	);
};

export default ScheduleEdit;
