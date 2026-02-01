import {
  faPlaneDeparture,
  faPlane,
  faMapMarkerAlt,
  faDoorOpen,
  faBullhorn,
  faSquareParking,
  faTicket,
  IconDefinition,
  faSuitcaseRolling,
  faReceipt,
  faToolbox,
  faCarOn,
  faCalendarCheck,
  faCarSide,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const employeeRoles = [
  "atc",
  "ground_crew",
  "airport_staff",
  "parking_staff",
  "rental_staff",
  "admin",
] as const;
//   return items.reduce(
//     (groups, item) => {
//       if (!groups[item.group]) {
//         groups[item.group] = [];
//       }

//       groups[item.group].push(item);
//       return groups;
//     },
//     {} as { [key: string]: NavItem[] }
//   );
// };

interface MenuItem {
  id: string;
  name: string;
  icon: IconDefinition;
  roles: readonly string[];
}

interface MenuGroup {
  id: string;
  name: string;
  items: MenuItem[];
}

const navMenuGroups: ReadonlyArray<MenuGroup> = [
  {
    id: "flights",
    name: "Loty",
    items: [
      {
        id: "harmonogram",
        name: "Harmonogram lotów",
        icon: faPlaneDeparture,
        roles: ["atc", "admin"],
      },
      {
        id: "bilety",
        name: "Bilety",
        icon: faTicket,
        roles: ["airport_staff", "admin"],
      },
      {
        id: "bagaze",
        name: "Bagaże",
        icon: faSuitcaseRolling,
        roles: [...employeeRoles, "client"],
      },
      {
        id: "twoje-bilety",
        name: "Twoje bilety",
        icon: faReceipt,
        roles: [...employeeRoles, "client"],
      },
    ],
  },
  {
    id: "airport",
    name: "Lotnisko",
    items: [
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
        icon: faToolbox,
        roles: ["ground_crew", "admin"],
      },
      {
        id: "bramki",
        name: "Bramki",
        icon: faDoorOpen,
        roles: ["airport_staff", "admin"],
      },
    ],
  },
  {
    id: "services",
    name: "Usługi",
    items: [
      {
        id: "parking-rezerwacje",
        name: "Rezerwacje parkingowe",
        icon: faCalendarCheck,
        roles: [...employeeRoles, "client"],
      },
      {
        id: "wypozyczenia",
        name: "Wypożyczalnia aut",
        icon: faCarOn,
        roles: [...employeeRoles, "client"],
      },
      {
        id: "parking",
        name: "Parking",
        icon: faSquareParking,
        roles: ["parking_staff", "admin"],
      },
      {
        id: "pojazd",
        name: "Wypożyczenia i pojazdy",
        icon: faCarSide,
        roles: ["rental_staff", "admin"],
      },
    ],
  },
  {
    id: "administration",
    name: "Administracja",
    items: [
      {
        id: "uzytkownicy",
        name: "Użytkownicy",
        icon: faUsers,
        roles: ["admin"],
      },
      {
        id: "ogloszenia",
        name: "Ogłoszenia",
        icon: faBullhorn,
        roles: employeeRoles,
      },
    ],
  },
];

/**
 * Filters menu items based on the user's role.
 * @param userRole - The role of the current user
 * @returns Array of menu groups with items filtered by role
 */
export function getMenuItemsForRole(userRole?: string) {
  return navMenuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.roles.includes(userRole || "client")
      ),
    }))
    .filter((group) => group.items.length > 0);
}
