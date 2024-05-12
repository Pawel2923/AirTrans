import { useEffect, useState } from "react";
import { Runways, Taxiways, Terminals } from "../../assets/Data";
import airfieldService from "../../services/airfield.service";
import Toast from "../../components/Toast";
import {
	faCircleExclamation,
	faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Airfield = () => {
	const [terminalData, setTerminalData] = useState<Terminals[]>([]);
	const [taxiwayData, setTaxiwayData] = useState<Taxiways[]>([]);
	const [runwayData, setRunwayData] = useState<Runways[]>([]);
	const [toast, setToast] = useState<typeof Toast | null>(null);

	useEffect(() => {
		airfieldService
			.getAll()
			.then((response) => {
				if (response.status === 200) {
					setTerminalData(response.data.data.terminals);
					setTaxiwayData(response.data.data.taxiways);
					setRunwayData(response.data.data.runways);
				}
			})
			.catch((error) => {
				if (error.response.status === 404) {
					setToast(() => (
						<Toast
							icon={faCircleExclamation}
							message="Nie znaleziono informacji o lotnisku"
							onClose={() => setToast(null)}
							type="danger"
						/>
					));
				} else {
					<Toast
						icon={faCircleExclamation}
						message="Wystąpił błąd podczas pobierania informacji o lotnisku"
						onClose={() => setToast(null)}
						type="danger"
					/>;
				}
			});
	}, []);

	return (
		<>
			<h2>Informacje lotniska</h2>
			<h3>Terminale</h3>
			{terminalData.map((terminal) => (
				<div className="card" key={terminal.id}>
					<div className="card-body">
						<h5 className="card-title">{terminal.id}</h5>
						<h6 className="card-subtitle mb-2 text-body-secondary">
							{terminal.is_available ? "Dostępny" : "Niedostępny"}
						</h6>
						<p>{terminal.status}</p>
						{terminal.status !== "EMPTY" &&
							terminal.status !== "CLOSED" && (
								<p>Lot: {terminal.Flight_id}</p>
							)}
						<Link
							to={`terminal/${terminal.id}/edytuj`}
							className="btn btn-primary"
						>
							AKTUALIZUJ <FontAwesomeIcon icon={faPenToSquare} />
						</Link>
					</div>
				</div>
			))}
			<h3>Drogi kołowania</h3>
			{taxiwayData.map((taxiway) => (
				<div className="card" key={taxiway.id}>
					<div className="card-body">
						<h5 className="card-title">{taxiway.id}</h5>
						<h6 className="card-subtitle mb-2 text-body-secondary">
							{taxiway.is_available ? "Dostępny" : "Niedostępny"}
						</h6>
						<p>{taxiway.status}</p>
						{taxiway.status === "OCCUPIED" && (
							<p>Lot: {taxiway.Flight_id}</p>
						)}
						<Link
							to={`droga-kolowania/${taxiway.id}/edytuj`}
							className="btn btn-primary"
						>
							AKTUALIZUJ <FontAwesomeIcon icon={faPenToSquare} />
						</Link>
					</div>
				</div>
			))}
			<h3>Pasy startowe</h3>
			{runwayData.map((runway) => (
				<div className="card" key={runway.id}>
					<div className="card-body">
						<h5 className="card-title">{runway.id}</h5>
						<h6 className="card-subtitle mb-2 text-body-secondary">
							{runway.is_available ? "Dostępny" : "Niedostępny"}
						</h6>
						<p>{runway.status}</p>
						<p>Długość pasa: {runway.length}</p>
						{runway.status === "OCCUPIED" && (
							<p>Lot: {runway.Flight_id}</p>
						)}
						<Link
							to={`pas-startowy/${runway.id}/edytuj`}
							className="btn btn-primary"
						>
							AKTUALIZUJ <FontAwesomeIcon icon={faPenToSquare} />
						</Link>
					</div>
				</div>
			))}
			{toast}
		</>
	);
};

export default Airfield;
