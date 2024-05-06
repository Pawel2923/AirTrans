interface ErrInterface {
	message: string;
	statusCode?: number;
	stack?: string;
}

class Err implements ErrInterface {
	constructor(message: string, statusCode?: number) {
		this.message = message;
		this.statusCode = statusCode;
	}
	message: string;
	statusCode?: number | undefined;
	stack?: string | undefined;
}

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

interface Contact_info {
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

interface Car {
	Id?: number;
	Brand: string;
	Model: string;
	Production_year: number;
	License_plate: string;
	Transmission_type: string;
	Price_per_day: number;
	Path_to_img?: string;
	Fuel_type: string;
}

interface ParkingInfo {
	Parking_id: number;
	Name?: string;
	Capacity: number;
	Price_per_day: number;
	Addr_street?: string;
	Addr_number?: number;
	City?: string;
	Zip_code?: string;
	Path_to_img?: string;
}

export type {
	Airplane,
	Announcement,
	Car,
	Contact_info,
	Flight,
	ParkingInfo,
	ArrDepTableProps,
}

export {
	Err
}