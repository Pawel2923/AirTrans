import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ticket from "../../components/Manager/Ticket";
import classes from "./ClientTickets.module.css";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";
import useGetTickets from "../../hooks/tickets/useGetTickets";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { ticketsDataParser } from "../../utils/data-parser";
import useUpdateTickets from "../../hooks/tickets/useUpdateTickets";
import ToastModalContext from "../../store/toast-modal-context";

const ClientTickets = () => {
	const { user } = useContext(AuthContext);
	const { createConfirmModal } = useContext(ToastModalContext);
	const { isLoading, ticketsData, getByUserEmail } = useGetTickets();
	const { updateStatus } = useUpdateTickets();

	useEffect(() => {
		if (user?.email) {
			getByUserEmail(user.email);
		}
	}, [getByUserEmail, user]);

	const cancelBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		const ticketId = parseInt(e.currentTarget.value);
		createConfirmModal({
			message: "Czy na pewno chcesz anulować lot?",
			onConfirm: () => handleRefund(ticketId),
		});
	};

	const handleRefund = (id: number) => {
		if (!user) return;

		updateStatus(id, "REFUNDED")
			.then(() => getByUserEmail(user.email))
			.catch((error) => {
				if (error.response.data.message.includes("refund after 24")) {
					createConfirmModal({
						title: "Upłynął termin na zwrot",
						message:
							"Nie można zwrócić biletu po 24 godzinach od zakupu. Czy nadal chcesz anulować lot?",
						confirmBtnText: "OK",
						onConfirm: () =>
							updateStatus(id, "CANCELLED").then(() =>
								getByUserEmail(user.email)
							),
					});
				}
			});
	};

    const toggleChevronAnim = (e: React.MouseEvent<HTMLButtonElement>) => {
        const svg = e.currentTarget.querySelector(`.${classes.tickets} summary svg`);
        if (svg?.classList.contains(classes.rotateChevronDown)) {
            svg?.classList.remove(classes.rotateChevronDown);
            svg?.classList.add(classes.rotateChevronUp);
        } else {
            svg?.classList.remove(classes.rotateChevronUp);
            svg?.classList.add(classes.rotateChevronDown);
        }
    }

	return (
		<div className={`manager-block ${classes.tickets}`}>
			{isLoading ? (
				<Loader
					style={{ marginTop: "10%" }}
					loadingText="Ładowanie..."
				/>
			) : (
				<>
					<h3>Aktualne bilety</h3>
					{ticketsData && ticketsData.length > 0 ? (
						ticketsData.map((ticket, index) =>
							ticket.status === "PURCHASED" ? (
								<React.Fragment key={ticket.id}>
									<Ticket ticketData={ticket} />
									<div className={classes.cancel}>
										<p>Anuluj swój lot</p>
										<p>
											Zwrot kosztów podlega wyłącznie
											rezerwacjom w przeciągu 24 godzin
										</p>
										<button
											value={ticket.id}
											className="btn btn-danger px-4"
											onClick={cancelBtnClickHandler}
										>
											ANULUJ LOT
										</button>
									</div>
								</React.Fragment>
							) : (
								<p key={index}>Brak biletów</p>
							)
						)
					) : (
						<p>Brak biletów</p>
					)}
					<h3>Inne bilety</h3>
					{ticketsData && ticketsData.length > 0 ? (
						ticketsData.map((ticket, index) =>
							ticket.status !== "PURCHASED" ? (
								<details
									key={ticket.id}
									className={classes.ticket}
								>
									<summary onClick={toggleChevronAnim}>
										<p>{ticket.Flight_id}</p>
										<p>
											{ticketsDataParser(ticket).origin} -{" "}
											<span
												style={{
													textTransform: "capitalize",
												}}
											>
												{ticketsDataParser(
													ticket
												).destination.toLowerCase()}
											</span>
										</p>
										<p>
											{
												ticketsDataParser(ticket)
													.departureDate
											}
										</p>
										<FontAwesomeIcon
											icon={faCircleChevronRight}
										/>
									</summary>
									<div className={classes["more-info"]}>
										<Ticket ticketData={ticket} />
										<div className="status">
											{ticket.status === "CANCELLED" && (
												<p
													className={
														classes.cancelled
													}
												>
													Anulowano{" "}
													{ticketsDataParser(ticket).updateTime}
												</p>
											)}
											{ticket.status === "EXPIRED" && (
												<p className={classes.expired}>
													Wygasł{" "}
													{ticketsDataParser(ticket).updateTime}
												</p>
											)}
											{ticket.status === "USED" && (
												<p className={classes.used}>
													Użyty{" "}
													{ticketsDataParser(ticket).updateTime}
												</p>
											)}
										</div>
									</div>
								</details>
							) : (
								<p key={index}>Brak biletów</p>
							)
						)
					) : (
						<p>Brak biletów</p>
					)}
				</>
			)}
		</div>
	);
};

export default ClientTickets;
