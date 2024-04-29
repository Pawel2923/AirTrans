import { useState, useEffect } from "react";
import ArrDepTable from "../components/ArrDepTable";
import flightService from "../services/flight.service";
import airplaneService from "../services/airplane.service";
import { ArrDepTableProps, PageData, Airplane } from "../assets/Data";
import Pagination from "../components/Pagination";

const flightsDataParser = (flightsData: ArrDepTableProps[]) => {
	const flights: ArrDepTableProps[] = [];
	flightsData.map((flight: ArrDepTableProps) => {
		flights.push({
			id: flight.id,
			status: flight.status,
			airline_name: flight.airline_name,
			departure: flight.departure,
			arrival: flight.arrival,
			destination: flight.destination,
			airplane_serial_no: flight.airplane_serial_no,
			is_departure: flight.is_departure,
		});
	});
	return flights;
};

const Schedule = () => {
	const [flights, setFlights] = useState<ArrDepTableProps[]>([]);
	const [airplaneData, setAirplaneData] = useState<Airplane[]>([]);
    const [pageData, setPageData] = useState<PageData>({ page: 1, pages: 1 });

	useEffect(() => {
		flightService.getByArrivalOrDeparture(pageData.page, 10).then((response) => {
			if (response.status === 200) {
				setFlights(flightsDataParser(response.data.data));
                setPageData(response.data.meta);
			}
		});
	}, [pageData.page]);

	useEffect(() => {
		airplaneService.getAll().then((response) => {
			if (response.status === 200) {
				setAirplaneData(response.data.data);
			}
		});
	}, []);

	return (
		<>
			<h1>Schedule</h1>
			<div>
				<h2>Harmonogram lotów:</h2>
				<ArrDepTable data={flights} hasActionButtons={true} />
                <Pagination pageData={pageData} setPageData={setPageData} />
			</div>
			<form>
				<h3>Dodaj wpis do harmonogramu</h3>
				<input type="datetime-local" name="arrival" placeholder="Przylot" />
				<input type="datetime-local" name="departure" placeholder="Odlot" />
				<input type="text" name="destination" placeholder="Kierunek"/>
				<input type="Numer lotu" name="id" placeholder="Numer lotu"/>
				<input type="text" name="airline_name" placeholder="Linia lotnicza"/>
				<select>
					<option value="" hidden>Wybierz samolot</option>
					{airplaneData.map((airplane: Airplane) => (
						<option key={airplane.serial_no} value={airplane.serial_no}>
							{airplane.serial_no}
						</option>
					))}
				</select>
				<button type="submit">Dodaj</button>
			</form>
			<form>
				<h3>Usuń wpis z harmonogramu</h3>
				<input type="text" name="id" placeholder="Numer lotu" />
				<button type="submit">Usuń</button>
			</form>
		</>
	);
};

export default Schedule;
