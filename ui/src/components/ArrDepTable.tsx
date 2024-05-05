import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons/faPlaneDeparture";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons/faPlaneArrival";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import tableStyles from "./ArrDepTable.module.css";
import { ArrDepTableProps } from "../assets/Data";
import flightService from "../services/flight.service";
import ConfirmModal from "./Modals/ConfirmModal";
import AlertModal, { Alert } from "./Modals/AlertModal";

interface TableProps {
	data: ArrDepTableProps[];
	isExtended?: boolean;
	hasActionButtons?: boolean;
	setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArrDepTable: React.FC<TableProps> = ({
	data,
	isExtended = false,
	hasActionButtons = false,
	setRefreshData,
}: TableProps) => {
	const [isArrivalTab, setIsArrivalTab] = useState(false);
	const [filteredData, setFilteredData] = useState<ArrDepTableProps[]>([]);
	const [deleteId, setDeleteId] = useState<string>("");
	const [alert, setAlert] = useState<Alert>({
		message: "",
		title: "",
	});

	useEffect(() => {
		if (!isArrivalTab) {
			setFilteredData(
				data.filter(
					(flight: ArrDepTableProps) =>
						!flight.departure
							.toString()
							.toLowerCase()
							.includes("invalid date") && flight.is_departure
				)
			);
		} else {
			setFilteredData(
				data.filter(
					(flight: ArrDepTableProps) =>
						!flight.arrival
							.toString()
							.toLowerCase()
							.includes("invalid date") && !flight.is_departure
				)
			);
		}
	}, [isArrivalTab, data]);

	let headButtonsColSpan: number = isExtended ? 4 : 2;

	if (hasActionButtons) {
		headButtonsColSpan += 3;
	}

	const deleteBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget as HTMLButtonElement;
		setDeleteId(target.value);
	};

	const deleteFlight = () => {
		flightService
			.delete(deleteId)
			.then((response) => {
				if (response.status === 204) {
					setAlert({
						message: "Lot został usunięty",
						title: "Sukces",
					});
				}
			})
			.catch(({ response: errorResponse }) => {
				if (errorResponse.status === 404) {
					setAlert({
						message: "Nie znaleziono lotu o podanym numerze",
						title: "Błąd",
					});
				} else {
					setAlert({
						message: "Wystąpił błąd podczas usuwania lotu",
						title: "Błąd",
					});
				}
			});
	};

	return (
		<>
			<table className={tableStyles.table}>
				<thead>
					<tr>
						<th
							className={!isArrivalTab ? tableStyles.active : ""}
							colSpan={headButtonsColSpan}
						>
							<button
								className={tableStyles["thead-btn"]}
								onClick={() => setIsArrivalTab(false)}
							>
								<FontAwesomeIcon icon={faPlaneDeparture} />
								<span> Odloty</span>
							</button>
						</th>
						<th className={isArrivalTab ? tableStyles.active : ""}>
							<button
								className={tableStyles["thead-btn"]}
								onClick={() => setIsArrivalTab(true)}
							>
								<FontAwesomeIcon icon={faPlaneArrival} />
								<span> Przyloty</span>
							</button>
						</th>
					</tr>
					{isExtended && (
						<tr className="fw-semibold">
							<td>Nr lotu</td>
							<td>Status</td>
							<td>Linia lotnicza</td>
							<td>Odlot</td>
							<td>Przylot</td>
							<td>Miejsce docelowe</td>
							<td>Nr. seryjny samolotu</td>
							<td></td>
							{hasActionButtons && (
								<>
									<td></td>
									<td></td>
									<td></td>
								</>
							)}
						</tr>
					)}
				</thead>
				<tbody className="text-uppercase">
					{filteredData.length > 0 ? (
						filteredData.map(
							(flight: ArrDepTableProps, index: number) => (
								<tr key={index}>
									{isExtended ? (
										Object.entries(flight).map(
											([key, value]) => (
												<td key={key}>
													{key === "departure" ||
													key === "arrival"
														? new Date(
																value
														).toLocaleString()
														: key !==
																"is_departure" &&
														value}
												</td>
											)
										)
									) : (
										<>
											<td>
												{isArrivalTab
													? new Date(
															flight.arrival
													).toLocaleTimeString([], {
															hour: "2-digit",
															minute: "2-digit",
													})
													: new Date(
															flight.departure
													).toLocaleTimeString([], {
															hour: "2-digit",
															minute: "2-digit",
													})}
											</td>
											<td>{flight.id}</td>
											<td>{flight.destination}</td>
										</>
									)}
									{hasActionButtons && (
										<>
											<td>
												<Link
													to={`${flight.id}`}
													className="btn btn-alt"
												>
													<span className="me-2">
														WIĘCEJ
													</span>
													<FontAwesomeIcon
														icon={faCircleInfo}
													/>
												</Link>
											</td>
											<td>
												<Link
													to={`${flight.id}/edytuj`}
													className="btn btn-primary"
												>
													<span className="me-2">
														EDYTUJ
													</span>
													<FontAwesomeIcon
														icon={faPenToSquare}
													/>
												</Link>
											</td>
											<td>
												<button
													className="btn btn-danger"
													value={flight.id}
													onClick={deleteBtnHandler}
												>
													<span>USUŃ </span>
													<FontAwesomeIcon
														icon={faTrashCan}
													/>
												</button>
											</td>
										</>
									)}
								</tr>
							)
						)
					) : (
						<tr>
							<td colSpan={3} className="text-center">
								Brak danych
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<ConfirmModal
				open={deleteId !== ""}
				onClose={() => setDeleteId("")}
				onConfirm={() => {
					deleteFlight();
					setDeleteId("");
				}}
				title="Potwierdź usunięcie"
				message="Czy na pewno chcesz usunąć lot?"
			/>
			<AlertModal
				open={alert.message !== "" && deleteId === ""}
				onClose={() => {
					setAlert({ message: "", title: "" });
					setRefreshData && setRefreshData((prev) => !prev);
				}}
				message={alert.message}
				title={alert.title}
			/>
		</>
	);
};

ArrDepTable.defaultProps = {
	data: [],
};

export default ArrDepTable;
