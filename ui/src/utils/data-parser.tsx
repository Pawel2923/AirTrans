import { Departures, Flights, Ticket, Tickets } from "../assets/Data";

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
      origin: flight.origin,
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
      orgin: flight.orgin,
      airplane_serial_no: flight.airplane_serial_no,
      is_departure: flight.is_departure,
    });
  });
  return arrDep;
};

export const ticketsDataParser = (tickets: Tickets) => {
  const ticketData: Ticket = {} as Ticket;
  ticketData.airlineName = tickets.airline_name;
  ticketData.departureTime = tickets.departure.split("T")[1].slice(0, 5);
  ticketData.departureDate = tickets.departure
    .split("T")[0]
    .split("-")
    .reverse()
    .join(".");
  ticketData.class = tickets.class;
  ticketData.seatNumber = tickets.seat_number;
  ticketData.passengerName = `${tickets.first_name} ${tickets.last_name}`;
  ticketData.flightNumber = tickets.Flight_id;
  ticketData.gateName = tickets.gate_name;
  ticketData.updateTime = tickets.update_time
    .slice(0, 19)
    .replace("T", " ")
    .split(" ")
    .map((el, index) => (index === 0 ? el.split("-").reverse().join(".") : el))
    .join(" ");

  const destination: string[] = [];
  const origin: string[] = [];

  tickets.destination.split(" ").forEach((word) => {
    if (word.includes("(")) {
      ticketData.destinationShort = word.slice(1, word.length - 1);
    } else {
      destination.push(word);
    }
  });

  tickets.origin.split(" ").forEach((word) => {
    if (word.includes("(")) {
      ticketData.originShort = word.slice(1, word.length - 1);
    } else {
      origin.push(word);
    }
  });

  ticketData.destination = destination.join(" ");
  ticketData.origin = origin.join(" ");

  return ticketData;
};
