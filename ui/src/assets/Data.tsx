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
	id: number;
	brand: string;
	model: string;
	price_per_day: number;
	production_year: number;
	license_plate: string;
}
export type { Flight, Announcements, Offer, ContactInfo, Car};
