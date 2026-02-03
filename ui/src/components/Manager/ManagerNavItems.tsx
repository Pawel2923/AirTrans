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
  faCompass,
  faTowerObservation,
  faBriefcase,
  faSliders,
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

export interface MenuItem {
  id: string;
  name: string;
  icon: IconDefinition;
  roles: readonly string[];
}

export interface MenuGroup {
  id: string;
  name: string;
  items: MenuItem[];
  icon?: IconDefinition;
}

const navMenuGroups: ReadonlyArray<MenuGroup> = [
  {
    id: "flights",
    name: "Loty",
    icon: faCompass,
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
    icon: faTowerObservation,
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
    icon: faBriefcase,
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
    icon: faSliders,
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

// TODO(refactor) move utility functions to another file

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

/**
 * Retrieves menu group items with provided group id
 * @param groupId - Id of the group, which items will be retrieved
 * @param menuGroups - The groups array
 * @returns Array of menu group items or undefined
 */
export function getMenuItemsByGroupId(
  groupId: string | null,
  menuGroups: MenuGroup[]
) {
  return menuGroups.find((group) => group.id === groupId)?.items;
}

/**
 * Retrieves name of menu group with provided group id
 * @param groupId - Id of the group
 * @param menuGroups - The groups array
 * @returns Name of the group or undefined
 */
export function getGroupNameById(groupId: string | null) {
  return navMenuGroups.find((group) => group.id === groupId)?.name;
}
