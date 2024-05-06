interface Flight {
	id: string;
	status: string;
	airline_name: string;
	destination: string;
	arrival: string;
	departure: string;
	airplane_serial_no: string;
}

interface ArrDepTableProps {
	id: string;
	status: string;
	airline_name: string;
	destination: string;
	arrival: string;
	departure: string;
	airplane_serial_no: string;
	is_departure: boolean;
}

interface Airplane {
	serial_no: string;
	model: string;
	type: string;
	production_year: number;
	num_of_seats: number;
	fuel_tank: number;
	fuel_quant: number;
	crew_size: number;
	max_cargo: number;
}

interface Announcement {
	id: number;
	title: string;
	content: string;
	valid_until: string;
	personnel_id: number;
}

interface ParkingInfo {
	Price_per_day: number;
	Capacity: number;
	Path_to_img: string;
}

interface Offer {
	id: number;
	path_to_img?: string;
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

interface Car {
	Id: number;
	Brand: string;
	Model: string;
	Price_per_day: number;
	Production_year: number;
	License_plate: string;
	Fuel_type: string;
	Transmission_type: string;
	Path_to_img?: string;
}
interface CarRental {
	Id: number;
	Rental_date: Date;
	Return_date: Date;
	Status: string;
	Client_id: number;
	Cars_id: number;
}

interface PageData {
	page: number;
	pages: number;
}

interface Filter {
    by: string;
    operator?: string;
    value: string;
}

interface Sort {
    by: string[];
    order?: string;
}

export type {
	Flight,
	ArrDepTableProps,
	Airplane,
	Announcement,
	Car,
	CarRental,
	ParkingInfo,
	Offer,
	RawOffer,
	ContactInfo,
	PageData,
	Filter,
	Sort,
};
