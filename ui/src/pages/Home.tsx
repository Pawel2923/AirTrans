import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrDepTable from "../components/ArrDepTable";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import homeStyles from "./Home.module.css";
import { Announcements, Offer, announcementsData, offersData } from "../assets/Data";
import { Flight } from "../assets/Data";
import flightService from "../services/flight.service";

const Home = () => {
    const [flightsData, setFlightsData] = useState<Flight[]>([]);
    
    useEffect(() => {
        flightService.getAll().then((response) => {
            if (response.status === 200) {
                const flights: Flight[] = [];
                response.data.data.map((flight: Flight) => {
                    flights.push({
                        id: flight.id,
                        departure: new Date(flight.departure),
                        arrival: new Date(flight.arrival),
                        destination: flight.destination,
                        is_departure: flight.is_departure,
                    })
                });
                setFlightsData(flights);
            }
        });
    }, []);

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
                    <div className="container-fluid row text-center text-lg-start justify-content-between gap-5 ms-0">
                        <div className="col-lg-3">
                            <h2 className="display-6 text-uppercase">
                                Parking
                            </h2>
                            <p>
                                Sprawdź dostępne miejsca parkingowe
                            </p>
                            <Link to="/" className="btn btn-primary py-2 px-5">
                                Sprawdź
                            </Link>
                        </div>
                        <div className="col-lg-3">
                            <h2 className="display-6 text-uppercase">
                                Wypożyczalnia
                            </h2>
                            <p>
                                Wypożycz samochód z naszego katalogu
                            </p>
                            <Link to="/" className="btn btn-primary py-2 px-5">
                                Sprawdź
                            </Link>
                        </div>
                        <div className="col-lg-3 d-grid align-items-stretch">
                            <h2 className="display-6 text-uppercase">
                                Harmonogram
                            </h2>
                            <p>
                                Sprawdź dostępne loty
                            </p>
                            <Link to="/" className="btn btn-primary py-2 px-5 align-self-end mx-auto mx-lg-0" style={{ width: "fit-content", height: "fit-content" }}>
                                Sprawdź
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`container-fluid ${homeStyles["content-wrapper"]}`} style={{ backgroundColor: "#eceff2" }}>
                    <div className="row">
                        <h2 className="display-6 text-uppercase text-center mb-5">
                            Ogłoszenia
                        </h2>
                    </div>
                    <div className={`container-fluid row justify-content-between gap-5 ms-0 ${homeStyles["announcements-wrapper"]}`}>
                        {announcementsData.slice(0, 3).map((announcement: Announcements, index: number) => (
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
                <div className={`container-fluid ${homeStyles["content-wrapper"]}`}>
                    <div className="row">
                        <h2 className="display-6 text-uppercase text-center mb-5">
                            Oferta
                        </h2>
                    </div>
                    <div className={`row gap-5`}>
                        {offersData.slice(0, 4).map((offer: Offer) => (
                            <div key={offer.id} className={`col-lg col-md-4 ms-0 card ${homeStyles["offer-card"]}`}>
                                <img src={`/src/assets/${offer.imgPath}`} alt={offer.title} className="card-img-top" />
                                <div className="card-body d-grid">
                                    <h5 className="card-title text-center">
                                        {offer.title}
                                    </h5>
                                    {offer.offerParams.map((param: string, index: number) => (
                                        <span key={index} className="card-text">
                                            {param}
                                        </span>
                                    ))}
                                    <Link to={"/"} className="btn btn-primary align-self-end mt-4">
                                        {offer.btnText}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`container-fluid ${homeStyles["content-wrapper"]}`}>
                    <div className="row">
                        <h2 className="display-6 text-uppercase text-center mb-5">
                            Kontakt
                        </h2>
                    </div>
                    <div className="row mb-3">
                        <p>Adres do korespondecji</p>
                        <p>Port lotniczy</p>
                        <p>ul. Królowej Jadwigi 5</p>
                        <p>33-300 Nowy Sącz</p>
                        <p>NIP</p>
                        <p>KRS</p>
                    </div>
                    <div className={`${homeStyles["contact-info"]}`}>
                        <div className="row py-4">
                            <div className="col-sm-4 text-uppercase">
                                Informacja lotniskowa: 
                            </div>
                            <div className="col-sm-8">
                                <a href="tel:+48123456789">+48 123 456 789</a>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-sm-4 text-uppercase">
                                Centrala portu lotniczego: 
                            </div>
                            <div className="col-sm-8">
                                <a href="tel:+48123456789">+48 123 456 789</a>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-sm-4 text-uppercase">
                                Biuro PR: 
                            </div>
                            <div className="col-sm-8">
                                <a href="mailto:biuro.lotniska@op.pl" target="_blank">biuro.lotniska@op.pl</a>
                            </div>
                        </div>
                        <div className="row py-4">
                            <div className="col-sm-4 text-uppercase">
                                BIURO SPRZEDAŻY, MARKETINGU I KOMUNIKACJI: 
                            </div>
                            <div className="col-sm-8">
                                <a href="mailto:marketing.lotniska@op.pl" target="_blank">marketing.lotniska@op.pl</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
		</>
	);
};

export default Home;
