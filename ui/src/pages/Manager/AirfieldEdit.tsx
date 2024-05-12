import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import AlertModal from "../../components/Modals/AlertModal";
import Toast from "../../components/Toast";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import flightService from "../../services/flight.service";
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Runways, Taxiways, Terminals } from "../../assets/Data";
import airfieldService from "../../services/airfield.service";

interface Err extends Error {
	response: {
		status: number;
		data: {
			message: string;
		};
	};
}

const tableServiceMap = {
	terminal: "Terminals",
	"droga-kolowania": "Taxiways",
	"pas-startowy": "Runways",
};

const isRunways = (
	data: Runways[] | Taxiways[] | Terminals[]
): data is Runways[] => {
	return (data as Runways[])[0]?.length !== undefined;
};

const statusOptions = [
	"EMPTY",
	"OCCUPIED",
	"CLOSED",
	"READY",
	"FULL",
	undefined,
];

const handleError = (
	error: Err,
	navigate: NavigateFunction,
	setAlert: React.Dispatch<React.SetStateAction<typeof AlertModal | null>>,
	setToast: React.Dispatch<React.SetStateAction<typeof Toast | null>>
) => {
	if (!error.response) {
		setAlert(() => (
			<AlertModal
				open={true}
				title="Błąd"
				message="Wystąpił błąd podczas pobierania informacji"
				onClose={() => {
					setAlert(null);
					navigate("/zarzadzanie/lotnisko");
				}}
			/>
		));
		return;
	}

	if (error.response.status === 400 || error.response.status === 404) {
		setToast(() => (
			<Toast
				type="danger"
				message={
					error.response.status === 400
						? "Niepoprawne dane"
						: "Nie znaleziono informacji"
				}
				icon={faCircleExclamation}
				timeout={10000}
				action={{
					label: "Spróbuj ponownie",
					onClick: () => {
						setToast(null);
						navigate(0);
					},
				}}
				onClose={() => {
					setToast(null);
				}}
			/>
		));
	} else {
		setAlert(() => (
			<AlertModal
				open={true}
				title="Błąd"
				message="Wystąpił błąd podczas pobierania informacji o terminalach"
				onClose={() => {
					setAlert(null);
					navigate("/zarzadzanie/lotnisko");
				}}
			/>
		));
	}
};

const AirfieldEdit = () => {
	const navigate = useNavigate();
	const { table, id } = useParams();
	const [alert, setAlert] = useState<typeof AlertModal | null>(null);
	const [toast, setToast] = useState<typeof Toast | null>(null);
	const [data, setData] = useState<Runways[] | Taxiways[] | Terminals[]>([]);
	const [flightIds, setFlightIds] = useState<string[]>([]);
	const [status, setStatus] = useState<
		"EMPTY" | "OCCUPIED" | "CLOSED" | "READY" | "FULL" | undefined
	>("EMPTY");
	const [selectedFlightId, setSelectedFlightId] = useState<string>("");
	const [runwayLength, setRunwayLength] = useState<number | undefined>(
		undefined
	);

	// Check if table name and id are valid
	useEffect(() => {
		if (id === undefined || table === undefined) {
			navigate("/zarzadzanie/lotnisko");
		}

		if (
			table !== "terminal" &&
			table !== "droga-kolowania" &&
			table !== "pas-startowy"
		) {
			setAlert(() => (
				<AlertModal
					open={true}
					title="Błąd"
					message="Nieprawidłowa nazwa tabeli"
					onClose={() => {
						setAlert(null);
						navigate("/zarzadzanie/lotnisko");
					}}
				/>
			));
		}
	}, [table, id, navigate]);

	// Fetch data based on table name
	useEffect(() => {
		try {
			if (!table) throw new Error("Table name is not defined");

			const serviceName =
				tableServiceMap[table as keyof typeof tableServiceMap];
			if (serviceName) {
				airfieldService
					.getTable(serviceName, 1, id)
					.then((response) => {
						if (response.status === 200) {
							setData(response.data.data);
							setSelectedFlightId(
								response.data.data[0].flight_id
							);
							setStatus(response.data.data[0].status);
							if (isRunways(response.data.data)) {
								setRunwayLength(response.data.data[0].length);
							}
						}
					})
					.catch((error) => {
						throw error;
					});
			}
		} catch (error: unknown) {
			const err = error as Err;
			handleError(err, navigate, setAlert, setToast);
		}
	}, [id, navigate, table]);

	// Fetch flight ids if status is OCCUPIED
	useEffect(() => {
		if (status === "OCCUPIED") {
			flightService
				.getIds()
				.then((response) => {
					if (response.status === 200) {
						setFlightIds(response.data.data);
					}
				})
				.catch((error) => {
					if (error.response.status === 404) {
						setToast(() => (
							<Toast
								type="danger"
								message="Nie znaleziono informacji o lotach"
								icon={faCircleExclamation}
								timeout={10000}
								action={{
									label: "Spróbuj ponownie",
									onClick: () => {
										setToast(null);
										navigate(0);
									},
								}}
								onClose={() => {
									setToast(null);
								}}
							/>
						));
					} else {
						setAlert(() => (
							<AlertModal
								open={true}
								title="Błąd"
								message="Wystąpił błąd podczas pobierania informacji o lotach"
								onClose={() => {
									setAlert(null);
									navigate("/zarzadzanie/lotnisko");
								}}
							/>
						));
					}
				});
		}
	}, [status, navigate]);

	const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setStatus(
			e.target.value as
				| "EMPTY"
				| "OCCUPIED"
				| "CLOSED"
				| "READY"
				| "FULL"
				| undefined
		);
	};

	const flightIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFlightId(e.target.value);
	};

	const runwayLengthChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setRunwayLength(parseInt(e.target.value));
	};

	const update = (newData: Runways | Taxiways | Terminals) => {
		try {
			if (!id) throw new Error("Id is not defined");

			airfieldService
				.update(
					tableServiceMap[table as keyof typeof tableServiceMap],
					newData,
                    id
				)
				.then((response) => {
					if (response.status === 200) {
						setToast(() => (
							<Toast
								type="primary"
                                icon={faCircleCheck}
								message={`Zaktualizowano dane dla ${table} ${id}`}
								onClose={() => {
									setToast(null);
								}}
							/>
						));
					}
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			const err = error as Err;
			handleError(err, navigate, setAlert, setToast);
		}
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!statusOptions.includes(status)) {
			setToast(() => (
				<Toast
					type="danger"
					message="Niepoprawny status"
					icon={faCircleExclamation}
					onClose={() => {
						setToast(null);
					}}
				/>
			));
			return;
		}

		const newData = data;

		if (status === "OCCUPIED" || status === "FULL") {
			if (!flightIds.includes(selectedFlightId)) {
				setToast(() => (
					<Toast
						type="danger"
						message="Wprowadź istniejący numer lotu"
						icon={faCircleExclamation}
						onClose={() => {
							setToast(null);
						}}
					/>
				));
				return;
			}

			newData[0].Flight_id = selectedFlightId;
		} else {
			newData[0].Flight_id = undefined;
		}

		if (status) {
			newData[0].status = status;
		}

        if (isRunways(newData) && runwayLength) {
            newData[0].length = runwayLength;
        }

		update(newData[0]);
	};

    const title =
    table === "terminal"
        ? "Terminale"
        : table === "droga-kolowania"
        ? "Drogi kołowania"
        : "Pasy startowe";

	const breadcrumbs: BreadcrumbItem[] = [
		{ path: "/zarzadzanie/lotnisko", title: "Lotnisko" },
		{ path: `/zarzadzanie/lotnisko/${table}`, title: title },
		{ path: `/zarzadzanie/lotnisko/${table}/${id}`, title: id as string },
		{
			path: `/zarzadzanie/lotnisko/${table}/${id}/edytuj`,
			title: "Edytuj",
		},
	];

	return (
		<>
			<Breadcrumb items={breadcrumbs} />
			<div>
				<h2>
					Edytuj{" "}
					{table === "terminal"
						? "terminal"
						: table === "droga-kolowania"
						? "drogę kołowania"
						: "pas startowy"}{" "}
					{id}
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
							<option value="EMPTY">EMPTY</option>
							<option value="OCCUPIED">OCCUPIED</option>
							<option value="CLOSED">CLOSED</option>
						</select>
					</div>
					{status === "OCCUPIED" && (
						<div className="form-group">
							<label htmlFor="flight_id">Numer lotu:</label>
							<input
								className="form-control"
								list="flightIdsOptions"
								id="flight_id"
								name="flight_id"
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
					{isRunways(data) && (
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
					<button className="btn btn-primary mt-3" type="submit">
						Zapisz
					</button>
				</form>
			</div>
			{alert}
			{toast}
		</>
	);
};

export default AirfieldEdit;
