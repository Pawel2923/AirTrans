import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons/faPlaneDeparture";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons/faPlaneArrival";
import tableStyles from "./ArrDepTable.module.css";
import { ArrDepTableProps } from "../assets/Data";

interface TableProps {
	data: ArrDepTableProps[];
}

const ArrDepTable: React.FC<TableProps> = ({ data }: TableProps) => {
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

	return (
		<table className={tableStyles.table}>
			<thead>
				<tr>
					<th
						className={!isArrivalTab ? tableStyles.active : ""}
						colSpan={2}
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
			</thead>
			<tbody>
				{filteredData.length > 0 ? (
					filteredData.map(
						(flight: ArrDepTableProps, index: number) =>
							!isArrivalTab ? (
								<tr key={index}>
									<td>
										{flight.departure.toLocaleTimeString(
											[],
											{
												hour: "2-digit",
												minute: "2-digit",
											}
										)}
									</td>
									<td>{flight.destination.toUpperCase()}</td>
									<td>{flight.id}</td>
								</tr>
							) : (
								<tr key={index}>
									<td>
										{flight.arrival.toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</td>
									<td>{flight.destination.toUpperCase()}</td>
									<td>{flight.id}</td>
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
