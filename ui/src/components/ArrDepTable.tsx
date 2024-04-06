import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons/faPlaneDeparture";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons/faPlaneArrival";
import tableStyles from "./ArrDepTable.module.css";

interface Flight {
	id: string;
	arrival: string;
	departure: string;
	destination: string;
}

interface ArrDepTableProps {
	data: Flight[];
}

const ArrDepTable: React.FC<ArrDepTableProps> = ({
	data,
}: ArrDepTableProps) => {
	const [isArrivalTab, setIsArrivalTab] = useState(false);
	const [filteredData, setFilteredData] = useState<Flight[]>([]);

	useEffect(() => {
		if (!isArrivalTab) {
			setFilteredData(
				data.filter((flight: Flight) => flight.departure !== "")
			);
		} else {
			setFilteredData(
				data.filter((flight: Flight) => flight.arrival !== "")
			);
		}
	}, [isArrivalTab, data]);

	return (
		<table className={tableStyles.table}>
			<thead>
				<tr>
					<th
						onClick={() => setIsArrivalTab(false)}
						className={!isArrivalTab ? tableStyles.active : ""}
					>
						<FontAwesomeIcon icon={faPlaneDeparture} />
						<span> Odloty</span>
					</th>
					<th
						onClick={() => setIsArrivalTab(true)}
						className={isArrivalTab ? tableStyles.active : ""}
						colSpan={2}
					>
						<FontAwesomeIcon icon={faPlaneArrival} />
						<span> Przyloty</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{filteredData.length > 0 ? (
					filteredData.map((flight: Flight, index: number) =>
						!isArrivalTab ? (
							<tr key={index}>
								<td>{flight.departure}</td>
								<td>{flight.destination}</td>
								<td>{flight.id}</td>
							</tr>
						) : (
							<tr key={index}>
								<td>{flight.arrival}</td>
								<td>{flight.destination}</td>
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

export default ArrDepTable;
