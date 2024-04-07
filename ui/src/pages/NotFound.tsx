import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container-fluid">
            <div className="row align-items-center"  style={{ minHeight: "100vh" }}>
                <div className="col-12 text-center">
                    <h1 className="display-1">404</h1>
                    <h2>Strona nie istnieje</h2>
                    <Link to={"/"} className="btn btn-primary">Wróć na stronę główną</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;