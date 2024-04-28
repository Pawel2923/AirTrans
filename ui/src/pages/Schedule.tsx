import { useState, useEffect } from "react";
import ArrDepTable from "../components/ArrDepTable";
import flightService from "../services/flight.service";
import { ArrDepTableProps } from "../assets/Data";

interface Metadata {
    page: number;
    pages: number;
}

const flightsDataParser = (flightsData: ArrDepTableProps[]) => {
	const flights: ArrDepTableProps[] = [];
	flightsData.map((flight: ArrDepTableProps) => {
		flights.push({
			id: flight.id,
			status: flight.status,
			airline_name: flight.airline_name,
			departure: new Date(flight.departure),
			arrival: new Date(flight.arrival),
			destination: flight.destination,
			airplane_serial_no: flight.airplane_serial_no,
			is_departure: flight.is_departure,
		});
	});
	return flights;
};

const Schedule = () => {
	const [data, setData] = useState<ArrDepTableProps[]>([]);
    const [pageData, setPageData] = useState<Metadata>({ page: 1, pages: 1 });

	useEffect(() => {
		flightService.getByArrivalOrDeparture(pageData.page, 10).then((response) => {
			if (response.status === 200) {
				setData(flightsDataParser(response.data.data));
                setPageData(response.data.meta);
			}
		});
	}, [pageData.page]);

	return (
		<>
			<h1>Schedule</h1>
			<div>
				<h2>Harmonogram lotów:</h2>
				<ArrDepTable data={data} />
                <div>
                    <p>Strona: {pageData.page}</p>
                    <p>Stron: {pageData.pages}</p>
                </div>
			</div>
		</>
	);
};

export default Schedule;
