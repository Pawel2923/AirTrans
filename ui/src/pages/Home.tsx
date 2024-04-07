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

interface Announcements {
    id: number;
    title: string;
    content: string;
    validUntil: Date;
    personnelId: number;
}

const announcementsData: Announcements[] = [{
    id: 1,
    title: "Zmiana w harmonogramie",
    content: "Z powodu remontu pasa startowego zmieniono godziny odlotów i przylotów",
    validUntil: new Date("2021-08-05"),
    personnelId: 1
}, {
    id: 2,
    title: "Zmiana w harmonogramie",
    content: "Z powodu remontu pasa startowego zmieniono godziny odlotów i przylotów",
    validUntil: new Date("2021-08-05"),
    personnelId: 1
}, {
    id: 3,
    title: "Zmiana w harmonogramie",
    content: "Z powodu remontu pasa startowego zmieniono godziny odlotów i przylotów",
    validUntil: new Date("2021-08-05"),
    personnelId: 1

}];

const Home = () => {    
	return (
		<>
            <Nav />
			<header className={homeStyles.header}>
                <div className="container">
                    <div className={`row d-flex align-items-center ${homeStyles["content-wrapper"]} ${homeStyles["no-padding"]}`}>
                        <div className="col-lg-6 text-center">
                            <h1 className="display-3 fw-bold">Witamy na stronie AirTrans</h1>
                            <p className="lead">Zaplanuj swoją podróż z nami</p>
                        </div>
                        <div className="col-lg-6">
                            <ArrDepTable data={flightsData} />
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className={`container-fluid ${homeStyles["content-wrapper"]}`} style={{ backgroundColor: "#B3D3E8" }}>
                    <div className="container-fluid row text-center text-lg-start justify-content-between gap-5 ms-auto mx-lg-auto">
                        <div className="col-lg-3">
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
                        <div className="col-lg-3">
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
                        <div className="col-lg-3 d-grid align-items-stretch">
                            <h2 className="display-6 text-uppercase">
                                Harmonogram
                            </h2>
                            <p>
                                Sprawdź dostępne loty
                            </p>
                            <button type="button" className="btn btn-primary py-2 px-5 align-self-end mx-auto mx-lg-0" style={{ width: "fit-content", height: "fit-content" }}>
                                Sprawdź
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`container-fluid ${homeStyles["content-wrapper"]}`} style={{ backgroundColor: "#eceff2" }}>
                    <div className="row">
                        <h2 className="display-6 text-uppercase">
                            Ogłoszenia
                        </h2>
                    </div>
                    <div className={`container-fluid row justify-content-between gap-5 ms-auto mx-lg-auto ${homeStyles["announcements-wrapper"]}`}>
                        {announcementsData.map((announcement: Announcements, index: number) => (
                            <div key={index} className="col-md-3">
                                <h3>
                                    {announcement.title}
                                </h3>
                                <p>
                                    {announcement.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
		</>
	);
};

export default Home;
