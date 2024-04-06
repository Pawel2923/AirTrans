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
                    <div className="row d-flex align-items-center py-5">
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
		</>
	);
};

export default Home;
