import { useEffect } from "react";
import { Link } from "react-router-dom";

const IntervalServerError = () => {
	useEffect(() => {
		const errorMessage = sessionStorage.getItem("errorMessage");

		if (errorMessage) {
			console.error(errorMessage);
		}

		sessionStorage.removeItem("errorMessage");
	}, []);

	return (
		<div className="container-fluid">
			<div
				className="row align-items-center"
				style={{ minHeight: "100vh" }}
			>
				<div className="col-12 text-center">
					<h1 className="display-1">500</h1>
					<h2>Wystąpił błąd serwera</h2>
					<Link to={"/"} className="btn btn-primary">
						Wróć na stronę główną
					</Link>
				</div>
			</div>
		</div>
	);
};

export default IntervalServerError;
