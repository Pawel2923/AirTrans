import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons/faPlaneDeparture";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons/faPlaneArrival";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import tableStyles from "./ArrDepTable.module.css";
import { ArrDepTableProps } from "../assets/Data";

interface TableProps {
	data: ArrDepTableProps[];
	isExtended?: boolean;
	hasActionButtons?: boolean;
}

const ArrDepTable: React.FC<TableProps> = ({
	data,
	isExtended = false,
	hasActionButtons = false,
}: TableProps) => {
	const [isArrivalTab, setIsArrivalTab] = useState(false);
	const [filteredData, setFilteredData] = useState<ArrDepTableProps[]>([]);

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
		headButtonsColSpan += 2;
	}

	return (
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
					<th
						className={isArrivalTab ? tableStyles.active : ""}
						colSpan={isExtended ? headButtonsColSpan : 1}
					>
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
						{hasActionButtons && <>
							<td></td>
							<td></td>
						</>}
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
													? new Date(value).toLocaleString()
													: key !== "is_departure" &&
													value}
											</td>
										)
									)
								) : (
									<>
										<td>
											{isArrivalTab
												? new Date(flight.arrival).toLocaleTimeString(
														[],
														{
															hour: "2-digit",
															minute: "2-digit",
														}
												)
												: new Date(flight.departure).toLocaleTimeString(
														[],
														{
															hour: "2-digit",
															minute: "2-digit",
														}
												)}
										</td>
										<td>{flight.id}</td>
										<td>{flight.destination}</td>
									</>
								)}
								{hasActionButtons && (
									<>
										<td>
											<Link to={`/harmonogram/${flight.id}`} className="btn btn-alt">
												<span className="me-2">
													WIĘCEJ
												</span>
												<FontAwesomeIcon
													icon={faCircleInfo}
												/>
											</Link>
										</td>
										<td>
											<Link to={`/harmonogram/${flight.id}/edytuj`} className="btn btn-primary">
												<span className="me-2">
													EDYTUJ
												</span>
												<FontAwesomeIcon
													icon={faPenToSquare}
												/>
											</Link>
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
	);
};

ArrDepTable.defaultProps = {
	data: [],
};

export default ArrDepTable;
