import { useContext, useEffect, useState } from "react";
import useGetTickets from "../../hooks/tickets/useGetTickets";
import DataTable from "../../components/Manager/DataTable";
import useUpdateTickets from "../../hooks/tickets/useUpdateTickets";
import ToastModalContext from "../../store/toast-modal-context";
import ticketsService, { Ticket } from "../../services/tickets.service";
import useErrorHandler from "../../hooks/useErrorHandler";
import { Err } from "../../assets/Data";

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
  const { ticketsData, getTicketById, getTicketIds } = useGetTickets();
  const { isError, createConfirmModal } = useContext(ToastModalContext);
  const [ticketIds, setTicketIds] = useState<string[]>([""]);
  const { updateStatus } = useUpdateTickets();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (sessionStorage.getItem("ticketId")) {
      setTicketId(parseInt(sessionStorage.getItem("ticketId") as string));
      getTicketById(parseInt(sessionStorage.getItem("ticketId") as string));
    }
  }, [getTicketById]);

  useEffect(() => {
    if (isError) {
      sessionStorage.removeItem("ticketId");
    }
  }, [isError]);

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
    createConfirmModal({
      message: "Czy na pewno chcesz dokonać zmian?",
      title: "Potwierdź zmiany",
      onConfirm: confirmFunction,
      confirmBtnText: "Tak, zapisz",
    });
  };

  const addTicketFormhandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const classInput = document.getElementById("class") as HTMLInputElement;
    const seatNumberInput = document.getElementById(
      "seat_number"
    ) as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const statusInput = document.getElementById("status") as HTMLSelectElement;
    const userIdInput = document.getElementById("Users_id") as HTMLInputElement;
    const flightIdInput = document.getElementById(
      "Flight_id"
    ) as HTMLInputElement;
    const gateIdInput = document.getElementById("Gates_id") as HTMLInputElement;

    if (
      statusInput.value !== "PURCHASED" &&
      statusInput.value !== "EXPIRED" &&
      statusInput.value !== "USED" &&
      statusInput.value !== "REFUNDED" &&
      statusInput.value !== "CANCELLED"
    ) {
      const error: Err = {
        response: {
          data: {
            message: "Nieprawidłowy status biletu",
          },
          status: 400,
        },
        name: "",
        message: ""
      };

      handleError({ error });
      return;
    }

    const newTicket: Ticket = {
      class: classInput.value,
      seat_number: seatNumberInput.value,
      price: parseFloat(priceInput.value),
      status: statusInput.value,
      Users_id: parseInt(userIdInput.value),
      Flight_id: flightIdInput.value,
      Gates_id: parseInt(gateIdInput.value),
    };

    ticketsService
      .create(newTicket)
      .then(() => {
        getTicketById(ticketId as number);
      })
      .catch((error) => {
        handleError({ error });
      });
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
              <div>Numer telefonu: {ticket.phone_number || "Brak"}</div>
              <div>Adres: {ticket.address || "Brak"}</div>
            </div>
          ))}
        {!ticketsData && (
          <div className="manager-block">
            <h3>Dodaj bilet</h3>
            <form>
              <div className="form-group">
                <label htmlFor="class">Klasa:</label>
                <input type="text" id="class" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="seat_number">Numer miejsca:</label>
                <input type="text" id="seat_number" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="price">Cena:</label>
                <input type="number" id="price" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select id="status" className="form-control">
                  <option value="PURCHASED">Kupiony</option>
                  <option value="EXPIRED">Wygasł</option>
                  <option value="USED">Użyty</option>
                  <option value="REFUNDED">Zwrócony</option>
                  <option value="CANCELLED">Anulowany</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Users_id">ID użytkownika:</label>
                <input type="number" id="Users_id" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="Flight_id">ID lotu:</label>
                <input type="text" id="Flight_id" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="Gates_id">ID bramki:</label>
                <input type="number" id="Gates_id" className="form-control" />
              </div>
              <button className="btn btn-primary mt-3" type="submit">
                DODAJ
              </button>
            </form>
          </div>
        )}
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
              <td>{ticket.class}</td>
              <td>{ticket.seat_number}</td>
              <td>{ticket.Flight_id}</td>
              <td>{ticket.gate_name}</td>
              <td>{ticket.status}</td>
              <td>{ticket.purchase_time.replace("T", " ").slice(0, 19)}</td>
              <td>{ticket.update_time.replace("T", " ").slice(0, 19)}</td>
              <td>{ticket.price.toString().replace(".", ",").concat(" zł")}</td>
            </tr>
          ))}
          disableHeaderBorder={true}
          className="mt-4 text-center"
        />
      )}
      {ticketsData && (
        <>
          <div className="d-flex mt-3 gap-3">
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
          <div className="manger-block-wrapper mt-4">
            <div className="manager-block">
              <h3>Dodaj bilet</h3>
              <form onSubmit={addTicketFormhandler}>
                <div className="form-group">
                  <label htmlFor="class">Klasa:</label>
                  <input type="text" id="class" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="seat_number">Numer miejsca:</label>
                  <input
                    type="text"
                    id="seat_number"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Cena:</label>
                  <input type="number" id="price" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <select id="status" className="form-control">
                    <option value="PURCHASED">Kupiony</option>
                    <option value="EXPIRED">Wygasł</option>
                    <option value="USED">Użyty</option>
                    <option value="REFUNDED">Zwrócony</option>
                    <option value="CANCELLED">Anulowany</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="Users_id">ID użytkownika:</label>
                  <input type="number" id="Users_id" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="Flight_id">ID lotu:</label>
                  <input type="text" id="Flight_id" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="Gates_id">ID bramki:</label>
                  <input type="number" id="Gates_id" className="form-control" />
                </div>
                <button className="btn btn-primary mt-3" type="submit">
                  DODAJ
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TicketsPage;
