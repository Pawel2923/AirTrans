import { Link, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <div className="container-fluid">
      <div className="row align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-12 text-center">
          <h1 className="display-1">500</h1>
          <h2>Wystąpił błąd aplikacji</h2>
          <Link to={"/"} className="btn btn-primary">
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
