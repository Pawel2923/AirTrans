import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeparturesTable from "../components/DeparturesTable";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import homeStyles from "./Home.module.css";
import {
	Announcements,
	ContactInfo,
	Cars,
	Offer,
	RawOffer,
} from "../assets/Data";
import contactInfoService from "../services/contactInfo.service";
import announcementService from "../services/announcement.service";
import offerService from "../services/offer.service";
import useGetFlight from "../hooks/flight/useGetFlight";

const announcementsDataParser = (announcementsData: Announcements[]) => {
	const announcements: Announcements[] = [];

	announcementsData.map((announcement: Announcements) => {
		announcement.valid_until = announcement.valid_until
			.slice(0, 19)
			.replace("T", " ");

		announcements.push(announcement);
	});

	return announcements;
};

const offerDataParser = (offerData: RawOffer) => {
	const offers: Offer[] = [];
	offerData.cars.map((car: Cars, index: number) => {
		offers.push({
			id: index,
			path_to_img: "offerImg.png",
			title: "Samochód",
			offer_params: [
				"Marka: " + car.brand,
				"Model: " + car.model,
				"Rok produkcji: " + car.production_year,
				"Rodzaj skrzyni: " + car.transmission_type,
				"Cena: " + car.price_per_day + " zł/doba",
			],
			btn_text: "Wypożycz",
		});
	});
	offers.push({
		id: 3,
		path_to_img: "offerImg.png",
		title: "Parking",
		offer_params: [
			"Cena: " + offerData.parkingInfo[0].price_per_day + " zł/doba",
			"Miejsca: " + offerData.parkingInfo[0].capacity,
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
	const { departureData: flightsData, isLoading, getDepartures } = useGetFlight();
	const [contactInfo, setContactInfo] =
		useState<ContactInfo>(defaultContactInfo);
	const [announcementsData, setAnnouncementsData] = useState<Announcements[]>(
		[]
	);
	const [offerData, setOfferData] = useState<Offer[]>([]);

	useEffect(() => {
		getDepartures(1);

		contactInfoService.getContactInfo().then((response) => {
			if (response.status === 200) {
				setContactInfo(response.data.data[0]);
			}
		});

		announcementService.get().then((response) => {
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
	}, [getDepartures]);

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
							<DeparturesTable data={flightsData} isLoading={isLoading} />
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
							<Link to="/wynajemC" className="btn btn-primary py-2 px-5">
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
								(announcement: Announcements, index: number) => (
									<div key={index} className="col-md-3">
										<h3>{announcement.title}</h3>
										<p>{announcement.content}</p>
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
