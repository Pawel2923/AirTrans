import {
  faPlaneDeparture,
  faPlane,
  faMapMarkerAlt,
  faTools,
  faDoorOpen,
  faBullhorn,
  faCar,
  faSquareParking,
  faUser,
  faTicket,
  IconDefinition,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";

export interface NavItem {
  id: string;
  name: string;
  icon: IconDefinition;
  roles: string[];
  hidden?: boolean;
}

const employeeRoles = [
  "atc",
  "ground_crew",
  "airport_staff",
  "parking_staff",
  "rental_staff",
  "admin",
];

export const allNavItems: NavItem[] = [
  {
    id: "harmonogram",
    name: "Harmonogram lotów",
    icon: faPlaneDeparture,
    roles: ["atc", "admin"],
  },
  {
    id: "samoloty",
    name: "Samoloty",
    icon: faPlane,
    roles: ["atc", "admin"],
  },
  {
    id: "lotnisko",
    name: "Lotnisko",
    icon: faMapMarkerAlt,
    roles: ["atc", "admin"],
  },
  {
    id: "sprzet",
    name: "Sprzęt lotniska",
    icon: faTools,
    roles: ["ground_crew", "admin"],
  },
  {
    id: "bramki",
    name: "Bramki",
    icon: faDoorOpen,
    roles: ["airport_staff", "admin"],
  },
  {
    id: "ogloszenia",
    name: "Ogłoszenia",
    icon: faBullhorn,
    roles: employeeRoles,
  },
  {
    id: "pojazd",
    name: "Pojazdy",
    icon: faCar,
    roles: ["rental_staff", "admin"],
  },
  {
    id: "parking",
    name: "Parking",
    icon: faSquareParking,
    roles: ["parking_staff", "admin"],
  },
  {
    id: "uzytkownicy",
    name: "Użytkownicy",
    icon: faUser,
    roles: ["admin"],
  },
  {
    id: "bilety",
    name: "Bilety",
    icon: faTicket,
    roles: ["airport_staff", "admin"],
  },
  {
    id: "twoje-bilety",
    name: "Twoje bilety",
    icon: faTicket,
    roles: [...employeeRoles, "client"],
  },
  {
    id: "bagaze",
    name: "Bagaże",
    icon: faSuitcase,
    roles: [...employeeRoles, "client"],
  },
  {
    id: "parking-rezerwacje",
    name: "Parking",
    icon: faSquareParking,
    roles: [...employeeRoles, "client"],
  },
  {
    id: "wypozyczenia",
    name: "Wypożyczalnia",
    icon: faCar,
    roles: [...employeeRoles, "client"],
  },
  {
    id: "profil",
    name: "Profil użytkownika",
    icon: faUser,
    roles: [...employeeRoles, "client"],
    hidden: true,
  },
];
