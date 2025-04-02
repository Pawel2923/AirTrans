import { useContext, useEffect, useState } from "react";
import { PageData, Rentals } from "../../assets/Data";
import AuthContext from "../../store/auth-context";
import useErrorHandler from "../../hooks/useErrorHandler";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import rentalService from "../../services/rental.service";

const RentalsPage = () => {
  const [searchParams] = useSearchParams();
  const [rentals, setRentals] = useState<Rentals[]>([]);
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const { user } = useContext(AuthContext);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (user?.email) {
      rentalService
        .getByUserEmail({
          page: pageData.page,
          limit: 5,
          userEmail: user.email,
        })
        .then((response) => {
          if (response.status === 200) {
            setRentals(response.data.data);
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
      <h3>Twoje wypożyczenia</h3>
      {rentals.length > 0 ? (
        <>
          {rentals.map((rental) => (
            <div key={rental.id} className="card">
              <div className="card-body">
                <p>
                  {rental.since.slice(0, 10).split("-").reverse().join(".")} -{" "}
                  {rental.until.slice(0, 10).split("-").reverse().join(".")}
                </p>
                <p>
                  Dane samochodu: {rental.brand} {rental.model}
                </p>
                <p>{rental.price_per_day} zł/dzień</p>
                {rental.return_time && (
                  <p>
                    Zwrócono{" "}
                    {rental.return_time
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join(".")}
                  </p>
                )}
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
        <p>Brak wypożyczeń</p>
      )}
    </div>
  );
};

export default RentalsPage;
