import { useCallback, useContext, useEffect, useState } from "react";
import { Luggage as LuggageType, PageData } from "../../assets/Data";
import luggageService from "../../services/luggage.service";
import AuthContext from "../../store/auth-context";
import useErrorHandler from "../../hooks/useErrorHandler";
import { useSearchParams } from "react-router-dom";
import useGetFlight from "../../hooks/flight/useGetFlight";
import useGetUsers from "../../hooks/users/useGetUsers";
import Luggage from "../../components/Manager/Luggage";
import Pagination from "../../components/Pagination";

const LuggagePage = () => {
  const [searchParams] = useSearchParams();
  const [luggage, setLuggage] = useState<LuggageType[]>([]);
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const { user } = useContext(AuthContext);
  const { handleError } = useErrorHandler();
  const { flightIds, getFlightIds } = useGetFlight();
  const { usersData, getUserByEmail } = useGetUsers();
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState(0);
  const [flightId, setFlightId] = useState("");

  const getLuggage = useCallback(() => {
    if (user?.email) {
      getUserByEmail(user.email);

      luggageService
        .getAll({ page: pageData.page, limit: 5, userEmail: user.email })
        .then((response) => {
          if (response.status === 200) {
            setLuggage(response.data.data);
            setPageData(response.data.meta);
          }
        })
        .catch((error) => {
          handleError({ error });
        });
    }
  }, [getUserByEmail, handleError, pageData.page, user?.email]);

  useEffect(() => {
    getFlightIds();
    getLuggage();
  }, [getFlightIds, getLuggage]);

  const addLuggageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!type || !size || !weight || !flightId) {
      handleError({
        error: {
          message: "",
          name: "",
          response: {
            data: {
              message: "Wszystkie pola są wymagane",
            },
            status: 400,
          },
        },
      });
      return;
    }

    if (!usersData) {
      handleError({
        error: {
          message: "",
          name: "",
          response: {
            data: {
              message: "Nie znaleziono użytkownika",
            },
            status: 404,
          },
        },
      });
      return;
    }

    const User_id = usersData[0].id as number;

    luggageService
      .create({ type, size, weight, Users_id: User_id, Flights_id: flightId })
      .then((response) => {
        if (response.status === 201) {
          getLuggage();
        }
      })
      .catch((error) => {
        handleError({ error });
      });
  };

  return (
    <>
      <div className="manager-block">
        <h3>Twoje bagaże</h3>
        {luggage.length > 0 ? (
          <>
            {luggage.map((luggage) => (
              <Luggage
                key={luggage.id}
                data={luggage}
                usersData={usersData}
                flightIds={flightIds}
                getLuggage={getLuggage}
              />
            ))}
            <Pagination
              pageData={pageData}
              setPageData={setPageData}
              className="mt-3"
            />
          </>
        ) : (
          <p>Brak bagaży</p>
        )}
      </div>
      <div className="manager-block mt-3">
        <h3>Dodaj bagaż</h3>
        <form onSubmit={addLuggageHandler}>
          <div className="mb-2">
            <label htmlFor="type" className="form-label">
              Rodzaj
            </label>
            <input
              type="text"
              className="form-control"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="size" className="form-label">
              Rozmiar
            </label>
            <input
              type="text"
              className="form-control"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="weight" className="form-label">
              Waga
            </label>
            <input
              type="number"
              className="form-control"
              id="weight"
              value={weight}
              step={0.25}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Flights_id" className="form-label">
              Numer lotu
            </label>
            <input
              list="flightIds"
              className="form-control"
              id="Flights_id"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
            />
            <datalist id="flightIds">
              {flightIds.map((id) => (
                <option key={id} value={id} />
              ))}
            </datalist>
          </div>
          <button type="submit" className="btn btn-primary">
            Dodaj
          </button>
        </form>
      </div>
    </>
  );
};

export default LuggagePage;
