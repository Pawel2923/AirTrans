import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrDepTable from "../components/ArrDepTable";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import homeStyles from "./Home.module.css";
import {
	ArrDepTableProps,
	Announcement,
	ContactInfo,
	Car,
	Offer,
	RawOffer,
} from "../assets/Data";
import flightService from "../services/flight.service";
import contactInfoService from "../services/contactInfo.service";
import announcementService from "../services/announcement.service";
import offerService from "../services/offer.service";

const flightsDataParser = (flightsData: ArrDepTableProps[]) => {
	const flights: ArrDepTableProps[] = [];
	flightsData.map((flight: ArrDepTableProps) => {
		flights.push({
			id: flight.id,
			status: flight.status,
			airline_name: flight.airline_name,
			departure: new Date(flight.departure),
			arrival: new Date(flight.arrival),
			destination: flight.destination,
			airplane_serial_no: flight.airplane_serial_no,
			is_departure: flight.is_departure,
		});
	});
	return flights;
};

const announcementsDataParser = (announcementsData: Announcement[]) => {
	const announcements: Announcement[] = [];

	announcementsData.map((announcement: Announcement) => {
		announcements.push({
			Id: announcement.Id,
			Title: announcement.Title,
			Content: announcement.Content,
			Valid_until: new Date(announcement.Valid_until),
			Personnel_id: announcement.Personnel_id,
		});
	});

	return announcements;
};

const offerDataParser = (offerData: RawOffer) => {
	const offers: Offer[] = [];
	offerData.cars.map((car: Car, index: number) => {
		offers.push({
			id: index,
			path_to_img: car.Path_to_img,
			title: "Samochód",
			offer_params: [
				"Marka: " + car.Brand,
				"Model: " + car.Model,
				"Rok produkcji: " + car.Production_year,
				"Rodzaj skrzyni: " + car.Transmission_type,
				"Cena: " + car.Price_per_day + " zł/doba",
			],
			btn_text: "Wypożycz",
		});
	});
	offers.push({
		id: 3,
		path_to_img: offerData.parkingInfo[0].Path_to_img,
		title: "Parking",
		offer_params: [
			"Cena: " + offerData.parkingInfo[0].Price_per_day + " zł/doba",
			"Miejsca: " + offerData.parkingInfo[0].Capacity,
		],
		btn_text: "Zarezerwuj",
	});

	return offers;
};

const defaultContactInfo: ContactInfo = {
	name: "",
	addr_street: "",
	addr_number: 0,
	zip_code: "",
	city: "",
	nip: 0,
	krs: 0,
	phone_inf: "",
	phone_central: "",
	email_pr: "",
	email_marketing: "",
};

const Home = () => {
	const [flightsData, setFlightsData] = useState<ArrDepTableProps[]>([]);
	const [contactInfo, setContactInfo] =
		useState<ContactInfo>(defaultContactInfo);
	const [announcementsData, setAnnouncementsData] = useState<Announcement[]>(
		[]
	);
	const [offerData, setOfferData] = useState<Offer[]>([]);

	useEffect(() => {
		flightService.getByArrivalOrDeparture().then((response) => {
			if (response.status === 200) {
				setFlightsData(flightsDataParser(response.data.data));
			}
		});

		contactInfoService.getContactInfo().then((response) => {
			if (response.status === 200) {
				setContactInfo(response.data.data[0]);
			}
		});

		announcementService.getAll().then((response) => {
			if (response.status === 200) {
				setAnnouncementsData(
					announcementsDataParser(response.data.data)
				);
			}
		});

		offerService.getData().then((response) => {
			if (response.status === 200) {
				setOfferData(offerDataParser(response.data.data));
			}
		});
	}, []);

	return (
		<>
			<Nav />
			<header className={homeStyles.header}>
				<div className="container">
					<div
						className={`row d-flex align-items-center ${homeStyles["content-wrapper"]} ${homeStyles["no-padding"]}`}
					>
						<div className="col-lg-6 text-center">
							<h1 className="display-3 fw-bold">
								Witamy na stronie AirTrans
							</h1>
							<p className="lead">Zaplanuj swoją podróż z nami</p>
						</div>
						<div className="col-lg-6">
							<ArrDepTable data={flightsData} />
						</div>
					</div>
				</div>
			</header>
			<main>
				<div
					className={`container-fluid ${homeStyles["content-wrapper"]}`}
					style={{ backgroundColor: "#B3D3E8" }}
				>
					<div className="container-fluid row text-center text-lg-start justify-content-between gap-5 ms-0">
						<div className="col-lg-3">
							<h2 className="display-6 text-uppercase">
								Parking
							</h2>
							<p>Sprawdź dostępne miejsca parkingowe</p>
							<Link to="/" className="btn btn-primary py-2 px-5">
								Sprawdź
							</Link>
						</div>
						<div className="col-lg-3">
							<h2 className="display-6 text-uppercase">
								Wypożyczalnia
							</h2>
							<p>Wypożycz samochód z naszego katalogu</p>
							<Link to="/" className="btn btn-primary py-2 px-5">
								Sprawdź
							</Link>
						</div>
						<div className="col-lg-3 d-grid align-items-stretch">
							<h2 className="display-6 text-uppercase">
								Harmonogram
							</h2>
							<p>Sprawdź dostępne loty</p>
							<Link
								to="/"
								className="btn btn-primary py-2 px-5 align-self-end mx-auto mx-lg-0"
								style={{
									width: "fit-content",
									height: "fit-content",
								}}
							>
								Sprawdź
							</Link>
						</div>
					</div>
				</div>
				<div
					className={`container-fluid ${homeStyles["content-wrapper"]}`}
					style={{ backgroundColor: "#eceff2" }}
				>
					<div className="row">
						<h2 className="display-6 text-uppercase text-center mb-5">
							Ogłoszenia
						</h2>
					</div>
					<div
						className={`container-fluid row justify-content-between gap-5 ms-0 ${homeStyles["announcements-wrapper"]}`}
					>
						{announcementsData
							.slice(0, 3)
							.map(
								(announcement: Announcement, index: number) => (
									<div key={index} className="col-md-3">
										<h3>{announcement.Title}</h3>
										<p>{announcement.Content}</p>
									</div>
								)
							)}
					</div>
				</div>
				<div
					className={`container-fluid ${homeStyles["content-wrapper"]}`}
				>
					<div className="row">
						<h2 className="display-6 text-uppercase text-center mb-5">
							Oferta
						</h2>
					</div>
					<div className="d-flex justify-content-center row gap-5">
						{offerData.map((offer: Offer) => (
							<div
								key={offer.id}
								className={`col-lg col-md-4 card ${homeStyles["offer-card"]}`}
							>
								<img
									src={`/src/assets/${offer.path_to_img}`}
									alt={offer.title}
									className="card-img-top"
								/>
								<div className="card-body d-grid">
									<h5 className="card-title text-center">
										{offer.title}
									</h5>
									{offer.offer_params.map(
										(param: string, index: number) => (
											<span
												key={index}
												className="card-text"
											>
												{param}
											</span>
										)
									)}
									<Link
										to={"/"}
										className="btn btn-primary align-self-end mt-4"
									>
										{offer.btn_text}
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
				<div
					className={`container-fluid ${homeStyles["content-wrapper"]}`}
				>
					<div className="row">
						<h2 className="display-6 text-uppercase text-center mb-5">
							Kontakt
						</h2>
					</div>
					<div className="row mb-3">
						<p>Adres do korespondecji</p>
						<p>{contactInfo.name}</p>
						<p>
							{contactInfo.addr_street} {contactInfo.addr_number}
						</p>
						<p>
							{contactInfo.zip_code} {contactInfo.city}
						</p>
						<p>NIP: {contactInfo.nip}</p>
						<p>KRS: {contactInfo.krs}</p>
					</div>
					<div className={`${homeStyles["contact-info"]}`}>
						<div className="row py-4">
							<div className="col-sm-4 text-uppercase">
								Informacja lotniskowa:
							</div>
							<div className="col-sm-8">
								<a href={`tel:${contactInfo.phone_inf}`}>
									{contactInfo.phone_inf}
								</a>
							</div>
						</div>
						<div className="row py-4">
							<div className="col-sm-4 text-uppercase">
								Centrala portu lotniczego:
							</div>
							<div className="col-sm-8">
								<a href={`tel:${contactInfo.phone_central}`}>
									{contactInfo.phone_central}
								</a>
							</div>
						</div>
						<div className="row py-4">
							<div className="col-sm-4 text-uppercase">
								Biuro PR:
							</div>
							<div className="col-sm-8">
								<a
									href={`mailto:${contactInfo.email_pr}`}
									target="_blank"
								>
									{contactInfo.email_pr}
								</a>
							</div>
						</div>
						<div className="row py-4">
							<div className="col-sm-4 text-uppercase">
								BIURO SPRZEDAŻY, MARKETINGU I KOMUNIKACJI:
							</div>
							<div className="col-sm-8">
								<a
									href={`mailto:${contactInfo.email_marketing}`}
									target="_blank"
								>
									{contactInfo.email_marketing}
								</a>
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
