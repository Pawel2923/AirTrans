import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Ticket.module.css";
import { Ticket as TicketType, Tickets } from "../../assets/Data";
import { useEffect, useState } from "react";
import { ticketsDataParser } from "../../utils/data-parser";

interface TicketProps {
	ticketData: Tickets;
}

const Ticket = ({ ticketData }: TicketProps) => {
    const [data, setData] = useState<TicketType>();

	useEffect(() => {
		setData(ticketsDataParser(ticketData));
	}, [ticketData]);

	return (
		<div className={classes.ticket}>
			<div className={classes["ticket-body"]}>
				<div className={`${classes["ticket-airline"]}`}>{data?.airlineName}</div>
				<div className={classes["ticket-details"]}>
					<div className={classes.gate}>
						<p className={classes.label}>Bramka</p>
						<p>{data?.gateName}</p>
					</div>
					<div className={classes.flight}>
						<p className={classes.label}>Lot</p>
						<p>{data?.flightNumber}</p>
					</div>
					<div className={classes["seat-number"]}>
						<p className={classes.label}>Miejsce</p>
						<p>{data?.seatNumber}</p>
					</div>
					<div className={classes.passenger}>
						<p className={classes.label}>Pasażer</p>
						<p>{data?.passengerName}</p>
					</div>
				</div>
				<div className={classes.departure}>
					<p className={classes.label}>odlot</p>
					<div className={classes.date}>{data?.departureDate}</div>
					<div className={classes.time}>{data?.departureTime}</div>
				</div>
				<div className={classes.airfields}>
					<div className={classes.origin}>
						<p className={classes.short}>{data?.originShort}</p>
						<p className={classes["full-name"]}>{data?.origin}</p>
					</div>
					<FontAwesomeIcon icon={faPlane} />
					<div className={classes.destination}>
						<p className={classes.short}>{data?.destinationShort}</p>
						<p className={classes["full-name"]}>{data?.destination}</p>
					</div>
				</div>
			</div>
			<div className={classes["ticket-class"]}>
				<p>{data?.class}</p>
			</div>
		</div>
	);
};

export default Ticket;
