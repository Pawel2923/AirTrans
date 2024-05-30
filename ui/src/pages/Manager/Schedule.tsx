import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeparturesTable from "../../components/DeparturesTable";
import airplaneService from "../../services/airplane.service";
import { Flights, PageData } from "../../assets/Data";
import { flightsDataParser } from "../../utils/data-parser";
import Pagination from "../../components/Pagination";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useCreateFlight } from "../../hooks/flight/useCreateFlight";
import AuthContext from "../../store/auth-context";
import ToastModalContext from "../../store/toast-modal-context";
import useErrorHandler from "../../hooks/useErrorHandler";
import useGetFlight from "../../hooks/flight/useGetFlight";

const emptyFlight: Flights = {
	id: "",
	arrival: "",
	departure: "",
	destination: "",
	status: "SCHEDULED",
	airline_name: "",
	airplane_serial_no: "",
};

const Schedule = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { user } = useContext(AuthContext);
	const { createToast } = useContext(ToastModalContext);
	const { handleError } = useErrorHandler();
	const [serialNumbers, setSerialNumbers] = useState<string[]>([]);
	const [pageData, setPageData] = useState<PageData>({
		page: parseInt(searchParams.get("page") || "1"),
		pages: 1,
	});
	const [createData, setCreateData] = useState<Flights>(emptyFlight);
	const [refreshData, setRefreshData] = useState<boolean>(false)
	const { departureData: flights, getDepartures, isLoading } = useGetFlight();
	const { createFlight } = useCreateFlight(setRefreshData);


	useEffect(() => {
		if (user) {
			if (user.role === "client") {
				navigate("/zarzadzanie/profil");
			}
		}
	}, [navigate, user]);

	useEffect(() => {
		airplaneService.getSerialNumbers().then((response) => {
			if (response.status === 200) {
				setSerialNumbers(response.data.data);
			}
		})
		.catch((error) => {
			handleError(error)
		});
	}, [handleError]);

	useEffect(() => {
		getDepartures(pageData.page);
	}, [getDepartures, pageData.page, refreshData]);

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

		let submittedData = { ...createData };

		submittedData = flightsDataParser([submittedData])[0];
		submittedData.arrival += ":00";
		submittedData.departure += ":00";

		// Regular expression to validate date and time format
		const datetimeRegex =
			/^(((\d{4})-([01]\d)-(0[1-9]|[12]\d|3[01])) (([01]\d|2[0-3]):([0-5]\d):([0-5]\d)))$/m;

		// Validate Arrival and Departure date and time format
		if (!datetimeRegex.test(submittedData.arrival)) {
			createToast({
				message: "Niepoprawna data i godzina przylotu",
				type: "danger",
				icon: faCircleExclamation,
			});
			return;
		}

		if (!datetimeRegex.test(submittedData.departure)) {
			createToast({
				message: "Niepoprawna data i godzina odlotu",
				type: "danger",
				icon: faCircleExclamation,
			});
			return;
		}

		createFlight(submittedData);
	};

	return (
		<>
			<div>
				<h2>Harmonogram odlotów i przylotów</h2>
				<DeparturesTable
					data={flights}
					isLoading={isLoading}
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
						{serialNumbers.map((serial_no: string) => (
							<option key={serial_no} value={serial_no}>
								{serial_no}
							</option>
						))}
					</select>
				</div>
				<button type="submit" className="btn btn-primary mt-3">
					Dodaj
				</button>
			</form>
		</>
	);
};

export default Schedule;
