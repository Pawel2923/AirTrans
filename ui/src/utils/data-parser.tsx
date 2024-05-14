import { Departures, Flights } from "../assets/Data";

export const flightsDataParser = (flightsData: Flights[]) => {
	const flights: Flights[] = [];
	flightsData.map((flight: Flights) => {
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

export const arrDepDataParser = (arrDepData: Departures[]) => {
	const arrDep: Departures[] = [];
	arrDepData.map((flight: Departures) => {
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
