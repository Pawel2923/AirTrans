import { ArrDepTableProps, Flight } from "../assets/Data";

export const flightsDataParser = (flightsData: Flight[]) => {
	const flights: Flight[] = [];
	flightsData.map((flight: Flight) => {
		flights.push({
			id: flight.id,
			status: flight.status,
			airline_name: flight.airline_name,
			departure: flight.departure.slice(0, 19).replace("T", " "),
			arrival: flight.arrival.slice(0, 19).replace("T", " "),
			destination: flight.destination,
			airplane_serial_no: flight.airplane_serial_no,
		});
	});
	return flights;
};

export const arrDepDataParser = (arrDepData: ArrDepTableProps[]) => {
	const arrDep: ArrDepTableProps[] = [];
	arrDepData.map((flight: ArrDepTableProps) => {
		arrDep.push({
			id: flight.id,
			status: flight.status,
			airline_name: flight.airline_name,
			departure: flight.departure.slice(0, 19).replace("T", " "),
			arrival: flight.arrival.slice(0, 19).replace("T", " "),
			destination: flight.destination,
			airplane_serial_no: flight.airplane_serial_no,
			is_departure: flight.is_departure,
		});
	});
	return arrDep;
};
