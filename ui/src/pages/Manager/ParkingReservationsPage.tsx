import { useContext, useEffect, useState } from "react";
import { ParkingReservations, PageData } from "../../assets/Data";
import AuthContext from "../../store/auth-context";
import useErrorHandler from "../../hooks/useErrorHandler";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import parkingService from "../../services/parking.service";

const ParkingReservationsPage = () => {
  const [searchParams] = useSearchParams();
  const [reservations, setReservations] = useState<ParkingReservations[]>([]);
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const { user } = useContext(AuthContext);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (user?.email) {
      parkingService
        .getByUserEmail({
          page: pageData.page,
          limit: 5,
          userEmail: user.email,
        })
        .then((response) => {
          if (response.status === 200) {
            setReservations(response.data.data);
            setPageData(response.data.meta);
          }
        })
        .catch((error) => {
          handleError({ error });
        });
    }
  }, [handleError, pageData.page, pageData.pages, user]);

  return (
    <div className="manager-block">
      <h3>Twoje rezerwacje miejsc parkingowych</h3>
      {reservations.length > 0 ? (
        <>
          {reservations.map((reservation) => (
            <div key={reservation.id} className="card">
              <div className="card-body">
                <p>Numer rejestracyjny: {reservation.license_plate}</p>
                <p>Poziom: {reservation.parking_level}</p>
                <p>Miejsce: {reservation.space_id}</p>
                <p>
                  {reservation.status === "RESERVED"
                    ? "Zarezerwowano"
                    : reservation.status === "CANCELLED"
                    ? "Anulowano"
                    : "W czasie trwania"}
                </p>
                <p>
                  {reservation.since
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}{" "}
                  -{" "}
                  {reservation.until
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}
                </p>
              </div>
            </div>
          ))}
          <Pagination
            pageData={pageData}
            setPageData={setPageData}
            className="mt-3"
          />
        </>
      ) : (
        <p>Brak rezerwacji</p>
      )}
    </div>
  );
};

export default ParkingReservationsPage;
