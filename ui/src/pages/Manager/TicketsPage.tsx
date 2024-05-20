import { useEffect, useState } from "react";
import useGetTickets from "../../hooks/tickets/useGetTickets";
import DataTable from "../../components/Manager/DataTable";
import useUpdateTickets from "../../hooks/tickets/useUpdateTickets";
import useModal from "../../hooks/useModal";

const ticketsColumnNames = [
	"Klasa",
	"Numer miejcsa",
	"Numer lotu",
	"Bramka",
	"Status",
	"Data zakupu",
	"Data lotu",
	"Cena",
];

const TicketsPage = () => {
	const [ticketId, setTicketId] = useState<number | string>("");
	const { ticketsData, errorAlert, errorToast, getTicketById, getTicketIds } =
		useGetTickets();
	const { confirm, createConfirmModal } = useModal();
	const [ticketIds, setTicketIds] = useState<string[]>([""])
	const {
		errorAlert: updateAlert,
		errorToast: updateToast,
		updateStatus,
	} = useUpdateTickets();

	useEffect(() => {
		if (sessionStorage.getItem("ticketId")) {
			setTicketId(parseInt(sessionStorage.getItem("ticketId") as string));
			getTicketById(
				parseInt(sessionStorage.getItem("ticketId") as string)
			);
		}
	}, [getTicketById]);

	useEffect(() => {
		if (errorAlert || errorToast) {
			sessionStorage.removeItem("ticketId");
		}
	}, [errorAlert, errorToast]);

	useEffect(() => {
		getTicketIds().then((ids) => setTicketIds(ids as string[]));
	}, [getTicketIds]);

	const chooseTicket = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getTicketById(ticketId as number);
		sessionStorage.setItem("ticketId", ticketId.toString());
	};

	const ticketChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTicketId(e.target.value);
	};

	const confirmTicketValidity = () => {
		updateStatus(ticketId as number, "USED").then(() => {
			getTicketById(ticketId as number);
		});
	};

	const cancelTicket = () => {
		updateStatus(ticketId as number, "EXPIRED").then(() => {
			getTicketById(ticketId as number);
		});
	};

	const createConfirm = (confirmFunction: () => void) => {
		createConfirmModal(
			"Czy na pewno chcesz dokonać zmian?",
			"Potwierdź zmiany",
			confirmFunction,
			undefined,
			"Tak, zapisz"
		);
	};

	return (
		<>
			<div className="manager-block-wrapper">
				<form onSubmit={chooseTicket} className="manager-block">
					<h3>Wybierz bilet</h3>
					<div className="form-group">
						<label htmlFor="ticket">ID biletu:</label>
						<input
							className="form-control"
							list="ticketIdsOptions"
							id="ticket"
							name="ticket"
							value={ticketId}
							onChange={ticketChangeHandler}
						/>
						<datalist id="ticketIdsOptions">
							{ticketIds.map((id) => (
								<option key={id} value={id}>
									{id}
								</option>
							))}
						</datalist>
					</div>
					<button className="btn btn-primary mt-3" type="submit">
						SPRAWDŹ
					</button>
				</form>
				{ticketsData &&
					ticketsData.map((ticket) => (
						<div key={ticket.id} className="manager-block">
							<h3>Dane pasażera</h3>
							<div className="mb-1">
								{ticket.first_name} {ticket.last_name}
							</div>
							<h5>Dane kontaktowe:</h5>
							<div>E-mail: {ticket.email}</div>
							<div>
								Numer telefonu: {ticket.phone_number || "Brak"}
							</div>
							<div>Adres: {ticket.address || "Brak"}</div>
						</div>
					))}
			</div>
			{ticketsData && (
				<DataTable
					colCount={Object.keys(ticketsData[0]).length}
					tableTitle={`Dane biletu ${ticketsData[0].id}`}
					tableHeaders={ticketsColumnNames.map((name, index) => (
						<th className="fw-normal" key={index}>
							{name}
						</th>
					))}
					tableBody={ticketsData.map((ticket) => (
						<tr key={ticket.id}>
							<td>{ticket.seat_class}</td>
							<td>{ticket.seat_number}</td>
							<td>{ticket.Flight_id}</td>
							<td>{ticket.gate_name}</td>
							<td>{ticket.status}</td>
							<td>
								{ticket.purchase_time
									.replace("T", " ")
									.slice(0, 19)}
							</td>
							<td>
								{ticket.expiry_date
									.replace("T", " ")
									.slice(0, 19)}
							</td>
							<td>
								{ticket.price
									.toString()
									.replace(".", ",")
									.concat(" zł")}
							</td>
						</tr>
					))}
					disableHeaderBorder={true}
					className="mt-4 text-center"
				/>
			)}
			{ticketsData && (
				<div className="d-flex mt-5 gap-3">
					<button
						className="btn btn-primary px-3"
						style={{ maxWidth: "180px", fontSize: ".95rem" }}
						onClick={() => {
							createConfirm(confirmTicketValidity);
						}}
					>
						POTWIERDŹ WAŻNOŚĆ BILETU
					</button>
					<button
						className="btn btn-danger px-3"
						style={{ maxWidth: "180px", fontSize: ".95rem" }}
						onClick={() => {
							createConfirm(cancelTicket);
						}}
					>
						UNIEWAŻNIJ BILET
					</button>
				</div>
			)}
			{errorAlert}
			{errorToast}
			{updateAlert}
			{updateToast}
			{confirm}
		</>
	);
};

export default TicketsPage;
