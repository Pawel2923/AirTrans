import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlaneDeparture,
	faPlaneArrival,
	faCircleInfo,
	faPenToSquare,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import tableStyles from "./DeparturesTable.module.css";
import { Departures } from "../assets/Data";
import { useDeleteFlight } from "../hooks/flight/useDeleteFlight";
import ConfirmModal from "./Modals/ConfirmModal";

interface TableProps {
	data: Departures[];
	isExtended?: boolean;
	hasActionButtons?: boolean;
	setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeparturesTable: React.FC<TableProps> = ({
	data,
	isExtended = false,
	hasActionButtons = false,
	setRefreshData,
}: TableProps) => {
	const [isArrivalTab, setIsArrivalTab] = useState(false);
	const [filteredData, setFilteredData] = useState<Departures[]>([]);
	const [deleteId, setDeleteId] = useState<string>("");
	const { toast, deleteFlight } = useDeleteFlight(setRefreshData);

	useEffect(() => {
		if (!isArrivalTab) {
			setFilteredData(
				data.filter(
					(flight: Departures) =>
						!flight.departure
							.toString()
							.toLowerCase()
							.includes("invalid date") && flight.is_departure
				)
			);
		} else {
			setFilteredData(
				data.filter(
					(flight: Departures) =>
						!flight.arrival
							.toString()
							.toLowerCase()
							.includes("invalid date") && !flight.is_departure
				)
			);
		}
	}, [isArrivalTab, data]);

	let headButtonsColSpan: number = isExtended ? 6 : 2;
	let noDataColSpan: number = headButtonsColSpan;
	noDataColSpan += 2;

	if (hasActionButtons) {
		headButtonsColSpan += 1;
	}

	const deleteBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget as HTMLButtonElement;
		setDeleteId(target.value);
	};

	return (
		<>
			<table className={tableStyles.table}>
				<thead>
					<tr className={tableStyles["thead-btn-wrapper"]}>
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
							{hasActionButtons && <td></td>}
						</tr>
					)}
				</thead>
				<tbody className="text-uppercase">
					{filteredData.length > 0 ? (
						filteredData.map(
							(flight: Departures, index: number) => (
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
												<div className="d-flex justify-content-end">
													<Link
														to={`${flight.id}`}
														className="btn btn-alt me-3"
													>
														<span className="me-2">
															WIĘCEJ
														</span>
														<FontAwesomeIcon
															icon={faCircleInfo}
														/>
													</Link>
													<Link
														to={`${flight.id}/edytuj`}
														className="btn btn-primary me-3"
													>
														<span className="me-2">
															EDYTUJ
														</span>
														<FontAwesomeIcon
															icon={faPenToSquare}
														/>
													</Link>
													<button
														className="btn btn-danger"
														value={flight.id}
														onClick={
															deleteBtnHandler
														}
													>
														<span>USUŃ </span>
														<FontAwesomeIcon
															icon={faTrashCan}
														/>
													</button>
												</div>
											</td>
										</>
									)}
								</tr>
							)
						)
					) : (
						<tr>
							<td colSpan={noDataColSpan} className="text-center">
								Brak danych
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{deleteId !== "" && (
				<ConfirmModal
					onClose={() => setDeleteId("")}
					onConfirm={() => {
						deleteFlight(deleteId);
						setDeleteId("");
					}}
					title="Potwierdź usunięcie"
					message="Czy na pewno chcesz usunąć lot?"
				/>
			)}
			{toast}
		</>
	);
};

export default DeparturesTable;
