interface Flight {
	id: string;
	arrival: Date;
	departure: Date;
	destination: string;
	is_departure: boolean;
}

interface Announcements {
	id: number;
	title: string;
	content: string;
	validUntil: Date;
	personnelId: number;
}

interface Offer {
	id: number;
	imgPath: string;
	title: string;
	offerParams: string[];
	btnText: string;
}

// const flightsData: Flight[] = [
// 	{
// 		id: "EJU 4668",
// 		arrival: new Date(""),
// 		departure: new Date("2021-08-01 15:50:00"),
// 		destination: "PARYŻ (CDG)",
// 	},
// 	{
// 		id: "W6 5047",
// 		arrival: new Date(""),
// 		departure: new Date("2021-08-01 16:40:00"),
// 		destination: "BARCELONA (BCN)",
// 	},
// 	{
// 		id: "KL 1996",
// 		arrival: new Date(""),
// 		departure: new Date("2021-08-01 17:00:00"),
// 		destination: "AMSTERDAM (AMS)",
// 	},
// 	{
// 		id: "LH 1623",
// 		arrival: new Date(""),
// 		departure: new Date("2021-08-01 17:20:00"),
// 		destination: "MONACHIUM (MUC)",
// 	},
// 	{
// 		id: "FR 3036",
// 		arrival: new Date(""),
// 		departure: new Date("2021-08-01 17:25:00"),
// 		destination: "BARCELONA (BCN)",
// 	},
// 	{
// 		id: "FR 1902",
// 		arrival: new Date(""),
// 		departure: new Date("2021-08-01 17:30:00"),
// 		destination: "DUBLIN (DUB)",
// 	},
// 	{
// 		id: "KL 1998",
// 		arrival: new Date(""),
// 		departure: new Date("2021-08-01 17:45:00"),
// 		destination: "FRANKFURT (FRA)",
// 	},
// ];

const announcementsData: Announcements[] = [
	{
		id: 1,
		title: "Zmiana w harmonogramie",
		content:
			"Z powodu remontu pasa startowego zmieniono godziny odlotów i przylotów",
		validUntil: new Date("2021-08-05"),
		personnelId: 1,
	},
	{
		id: 2,
		title: "Zmiana w harmonogramie",
		content:
			"Z powodu remontu pasa startowego zmieniono godziny odlotów i przylotów",
		validUntil: new Date("2021-08-05"),
		personnelId: 1,
	},
	{
		id: 3,
		title: "Zmiana w harmonogramie",
		content:
			"Z powodu remontu pasa startowego zmieniono godziny odlotów i przylotów",
		validUntil: new Date("2021-08-05"),
		personnelId: 1,
	},
];

const offersData: Offer[] = [
	{
		id: 1,
		imgPath: "offerImg.png",
		title: "Bilet lotniczy",
		offerParams: ["Bilet klasa A", "1000 zł", "Ekonomiczna"],
		btnText: "Kup teraz",
	},
	{
		id: 2,
		imgPath: "offerImg.png",
		title: "Samochód",
		offerParams: ["Samochód osobowy", "100 zł/dzień", "Klasa B"],
		btnText: "Wynajmij teraz",
	},
	{
		id: 3,
		imgPath: "offerImg.png",
		title: "Parking",
		offerParams: [
			"Parking krótkoterminowy",
			"10 zł/h",
			"Poziom -1, sektor A",
		],
		btnText: "Zarezerwuj teraz",
	},
	{
		id: 4,
		imgPath: "offerImg.png",
		title: "Bilet lotniczy",
		offerParams: ["Bilet klasa A", "1000 zł", "Ekonomiczna"],
		btnText: "Kup teraz",
	},
];

// eslint-disable-next-line react-refresh/only-export-components
export { /*flightsData, */announcementsData, offersData };
export type { Flight, Announcements, Offer };
