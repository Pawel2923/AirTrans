  interface ErrInterface {
  message: string;
  statusCode?: number | undefined;
  stack?: string;
}

interface Flights {
  id: string;
  status:
    | "SCHEDULED"
    | "WAITING"
    | "AIRBORNE"
    | "TAKE OFF"
    | "LANDING"
    | "FINISHED"
    | "CANCELLED"
    | "DELAYED";
  airline_name: string;
  destination: string;
  origin: string;
  arrival: string;
  departure: string;
  airplane_serial_no: string;
}

export class Err implements ErrInterface {
  constructor(message: string, statusCode?: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
  message: string;
  statusCode?: number | undefined;
  stack?: string;
}

interface Departures {
  id: string;
  status?:
    | "SCHEDULED"
    | "WAITING"
    | "AIRBORNE"
    | "TAKE OFF"
    | "LANDING"
    | "FINISHED"
    | "CANCELLED"
    | "DELAYED";
  airline_name: string;
  destination: string;
  orgin: string;
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

interface Airplanes {
  serial_no: string;
  model: string;
  type: string;
  production_year: number;
  num_of_seats: number;
  fuel_tank: number;
  fuel_quant: number;
  num_of_crew: number;
  max_cargo: number;
  img?: string;
}

interface Flight_data {
  id?: number;
  altitude: number;
  track: number;
  ground_speed: number;
  vertical_speed: number;
  latitude: number;
  longitude: number;
  Flight_id: string;
}

interface Runways {
  id: string;
  length: number;
  is_available: boolean;
  status?: "CLOSED" | "READY" | "OCCUPIED";
  Flight_id?: string;
}

interface Terminals {
  id?: number;
  is_available: boolean;
  num_of_stations: number;
  status?: "CLOSED" | "OCCUPIED" | "EMPTY" | "FULL";
  Flight_id?: string;
}

interface Taxiways {
  id: string;
  is_available: boolean;
  status?: "CLOSED" | "OCCUPIED" | "READY";
  Flight_id?: string;
}

interface Airfield_info {
  name: string;
  runways: Runways[];
  terminals: Terminals[];
  taxiways: Taxiways[];
}

interface Gates {
  id?: number;
  name: string;
  status?: "CLOSED" | "BUSY" | "ON STAND" | "READY";
}

interface Users {
  id?: number;
  email: string;
  password: string;
  create_time?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  gender?: "M" | "F";
  birth_date?: string;
  img?: string;
  salt?: string;
}

interface Employees {
  id?: number;
  role: string;
  department: string;
  Gates_id?: number;
  Flight_id?: string;
  Users_id: number;
}

interface User {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  gender?: "M" | "F";
  birth_date?: string;
  create_time?: string;
  img?: string;
  role?: string;
}

interface Announcements {
  id?: number;
  title: string;
  content: string;
  valid_until: string;
  create_time?: string;
  Employee_id: number;
}

interface Equipment {
  serial_no: string;
  type: string;
  name: string;
  location?: string;
  Employee_id?: number;
}

interface Luggage {
  id?: number;
  type: string;
  size: string;
  weight: number;
  Users_id: number;
  Flights_id: string;
}

interface Tickets {
  id?: number;
  purchase_time: string;
  expiry_date: string;
  seat_class: string;
  seat_number: string;
  phone_number?: string;
  address?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  price: number;
  status?: "PURCHASED" | "EXPIRED" | "USED" | "REFUNDED" | "CANCELLED";
  Flight_id: string;
  gate_name: string;
  Gates_id?: number;
  Users_id: number;
}

interface Ticket {
  class: string;
  seat_number: string;
  price: number;
  status?: "PURCHASED" | "EXPIRED" | "USED" | "REFUNDED" | "CANCELLED";
  Users_id: number;
  Flight_id: string;
  Gates_id: number;
}

interface Parking_reservations {
  id?: number;
  parking_level: string;
  space_id: string;
  since: string;
  until: string;
  license_plate: string;
  reservation_time?: string;
  status?: "PENDING" | "RESERVED" | "CANCELLED";
  Users_id: number;
}

interface Parking_info {
  pid?: number;
  name: string;
  capacity: number;
  price_per_day: number;
  addr_street: string;
  addr_number: number;
  city: string;
  zip_code: string;
}

interface Cars {
  id?: number;
  brand: string;
  model: string;
  production_year: number;
  license_plate: string;
  price_per_day: number;
  fuel_type: string;
  transmission_type: "MANUAL" | "AUTOMATIC";
  img?: string;
}

interface Rentals {
  id?: number;
  since: string;
  until: string;
  reservation_time?: string;
  return_time?: string;
  status?: "PENDING" | "RENTED" | "CANCELLED" | "RETURNED";
  Cars_id: number;
  Users_id: number;
}

interface Event_logs {
  id?: number;
  table_name: string;
  by_user: string;
  timestamp: string;
  action: string;
  log_details: string;
}
interface Logowanie_log {
  id?: number;
  first_name: string;
  email: string;
  login_date: string;
  login_details: string;
}

interface Metadata {
  page: number;
  pages: number;
}

export type {
  Event_logs,
  ErrInterface,
  Flights,
  Departures,
  Contact_info,
  Airplanes,
  Flight_data,
  Runways,
  Terminals,
  Taxiways,
  Airfield_info,
  Gates,
  Users,
  User,
  Employees,
  Announcements,
  Equipment,
  Luggage,
  Tickets,
  Ticket,
  Parking_reservations,
  Parking_info,
  Cars,
  Rentals,
  Logowanie_log,
  Metadata,
};
