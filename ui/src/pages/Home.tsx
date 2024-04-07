import ArrDepTable from "../components/ArrDepTable";
import Nav from "../components/Nav";
import homeStyles from "./Home.module.css";

interface Flight {
	id: string;
	arrival: Date;
	departure: Date;
	destination: string;
}

const flightsData: Flight[] = [{
    id: "EJU 4668",
    arrival: new Date(""),
    departure: new Date("2021-08-01 15:50:00"),
    destination: "PARYŻ (CDG)"
}, {
    id: "W6 5047",
    arrival: new Date(""),
    departure: new Date("2021-08-01 16:40:00"),
    destination: "BARCELONA (BCN)"
}, {
    id: "KL 1996",
    arrival: new Date(""),
    departure: new Date("2021-08-01 17:00:00"),
    destination: "AMSTERDAM (AMS)"
}, {
    id: "LH 1623",
    arrival: new Date(""),
    departure: new Date("2021-08-01 17:20:00"),
    destination: "MONACHIUM (MUC)"
}, {
    id: "FR 3036",
    arrival: new Date(""),
    departure: new Date("2021-08-01 17:25:00"),
    destination: "BARCELONA (BCN)"
}, {
    id: "FR 1902",
    arrival: new Date(""),
    departure: new Date("2021-08-01 17:30:00"),
    destination: "DUBLIN (DUB)"
}, {
    id: "KL 1998",
    arrival: new Date(""),
    departure: new Date("2021-08-01 17:45:00"),
    destination: "FRANKFURT (FRA)"
}];

const Home = () => {    
	return (
		<>
            <Nav />
			<header className={homeStyles.header}>
                <div className="container">
                    <div className={`row d-flex align-items-center ${homeStyles["content-wrapper"]}`}>
                        <div className="col-6 text-center">
                            <h1 className="display-3 fw-bold">Witamy na stronie AirTrans</h1>
                            <p className="lead">Zaplanuj swoją podróż z nami</p>
                        </div>
                        <div className="col-6">
                            <ArrDepTable data={flightsData} />
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className={`d-flex justify-content-around ${homeStyles["content-wrapper"]}`} style={{ backgroundColor: "#B3D3E8" }}>
                    <div>
                        <h2 className="display-6 text-uppercase">
                            Parking
                        </h2>
                        <p>
                            Sprawdź dostępne miejsca parkingowe
                        </p>
                        <button type="button" className="btn btn-primary py-2 px-5">
                            Sprawdź
                        </button>
                    </div>
                    <div>
                        <h2 className="display-6 text-uppercase">
                            Wypożyczalnia
                        </h2>
                        <p>
                            Wypożycz samochód z naszego katalogu
                        </p>
                        <button type="button" className="btn btn-primary py-2 px-5">
                            Sprawdź
                        </button>
                    </div>
                    <div>
                        <h2 className="display-6 text-uppercase">
                            Harmonogram
                        </h2>
                        <p>
                            Sprawdź dostępne loty
                        </p>
                        <button type="button" className="btn btn-primary py-2 px-5">
                            Sprawdź
                        </button>
                    </div>
                </div>
            </main>
		</>
	);
};

export default Home;
