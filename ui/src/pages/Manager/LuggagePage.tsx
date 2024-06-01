import { useContext, useEffect, useState } from "react";
import { Luggage, PageData } from "../../assets/Data";
import luggageService from "../../services/luggage.service";
import AuthContext from "../../store/auth-context";
import useErrorHandler from "../../hooks/useErrorHandler";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

const LuggagePage = () => {
  const [searchParams] = useSearchParams();
  const [luggage, setLuggage] = useState<Luggage[]>([]);
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const { user } = useContext(AuthContext);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (user?.email) {
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
  }, [handleError, pageData.page, pageData.pages, user]);

  return (
    <div className="manager-block">
      <h3>Twoje bagaże</h3>
      {luggage.length > 0 ? (
        <>
          {luggage.map((luggage) => (
            <div key={luggage.id} className="card">
              <div className="card-body">
                <p>{luggage.type}</p>
                <p>{luggage.size}</p>
                <p>{luggage.weight.toString().replace(".", ",")}kg</p>
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
        <p>Brak bagaży</p>
      )}
    </div>
  );
};

export default LuggagePage;
