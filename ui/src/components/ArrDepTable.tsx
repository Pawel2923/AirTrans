import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons/faPlaneDeparture";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons/faPlaneArrival";
import tableStyles from "./ArrDepTable.module.css";
import { Flight } from "../assets/Data";

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
				data.filter((flight: Flight) => !flight.departure.toString().toLowerCase().includes("invalid date"))
			);
		} else {
			setFilteredData(
				data.filter((flight: Flight) => !flight.arrival.toString().toLowerCase().includes("invalid date"))
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
						<button className={tableStyles["thead-btn"]} onClick={() => setIsArrivalTab(false)}>
                            <FontAwesomeIcon icon={faPlaneDeparture} />
                            <span> Odloty</span>
                        </button>
					</th>
					<th
						className={isArrivalTab ? tableStyles.active : ""}
					>
                        <button className={tableStyles["thead-btn"]} onClick={() => setIsArrivalTab(true)}>
                            <FontAwesomeIcon icon={faPlaneArrival} />
                            <span> Przyloty</span>
                        </button>
					</th>
				</tr>
			</thead>
			<tbody>
				{filteredData.length > 0 ? (
					filteredData.map((flight: Flight, index: number) =>
						!isArrivalTab ? (
							<tr key={index}>
								<td>{flight.departure.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
								<td>{flight.destination}</td>
								<td>{flight.id}</td>
							</tr>
						) : (
							<tr key={index}>
								<td>{flight.arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
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

ArrDepTable.defaultProps = {
    data: [],
};

export default ArrDepTable;
