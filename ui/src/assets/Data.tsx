interface Flight {
	id: string;
	status: string;
	airline_name: string;
	destination: string;
	arrival: Date;
	departure: Date;
	airplane_serial_no: string;
}

interface ArrDepTableProps {
	id: string;
	status: string;
	airline_name: string;
	destination: string;
	arrival: Date;
	departure: Date;
	airplane_serial_no: string;
	is_departure: boolean;
}

interface Announcement {
	Id: number;
	Title: string;
	Content: string;
	Valid_until: Date;
	Personnel_id: number;
}

interface Car {
	Brand: string;
	Model: string;
	Production_year: number;
	Transmission_type: string;
	Price_per_day: number;
	Path_to_img: string;
}

interface ParkingInfo {
	Price_per_day: number;
	Capacity: number;
	Path_to_img: string;
}

interface Offer {
	id: number;
	path_to_img: string;
	title: string;
	offer_params: string[];
	btn_text: string;
}

interface RawOffer {
	cars: Car[];
	parkingInfo: ParkingInfo[];
}

interface ContactInfo {
	name: string;
	addr_street: string;
	addr_number: number;
	zip_code: string;
	city: string;
	nip: number;
	krs: number;
	phone_inf: string;
	phone_central: string;
	email_pr: string;
	email_marketing: string;
}

interface PageData {
	page: number;
	pages: number;
}

export type {
	Flight,
	ArrDepTableProps,
	Announcement,
	Car,
	ParkingInfo,
	Offer,
	RawOffer,
	ContactInfo,
	PageData,
};
