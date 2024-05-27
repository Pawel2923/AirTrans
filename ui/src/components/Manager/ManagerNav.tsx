import React, { useState, useEffect, useContext } from "react";
import classes from "./ManagerNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faRightFromBracket,
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
	faSuitcase
} from "@fortawesome/free-solid-svg-icons";
import {
	Link,
	NavLink,
	useLocation,
} from "react-router-dom";
import AuthContext from "../../store/auth-context";

interface NavItem {
	id: string;
	name: string;
	icon: IconDefinition;
	roles: string[];
}

const employeeRoles = ["atc", "ground_crew", "airport_staff", "parking_staff", "rental_staff", "admin"];

const allNavItems: NavItem[] = [
	{
		id: "harmonogram",
		name: "HARMONOGRAM LOTÓW",
		icon: faPlaneDeparture,
		roles: ["atc", "admin"],
	},
	{
		id: "samoloty",
		name: "SAMOLOTY",
		icon: faPlane,
		roles: ["atc", "admin"],
	},
	{
		id: "lotnisko",
		name: "LOTNISKO",
		icon: faMapMarkerAlt,
		roles: ["atc", "admin"],
	},
	{
		id: "sprzet",
		name: "SPRZĘT LOTNISKA",
		icon: faTools,
		roles: ["ground_crew", "admin"],
	},
	{
		id: "bramki",
		name: "BRAMKI",
		icon: faDoorOpen,
		roles: ["airport_staff", "admin"],
	},
	{
		id: "ogloszenia",
		name: "OGŁOSZENIA",
		icon: faBullhorn,
		roles: employeeRoles,
	},
	{
		id: "pojazd",
		name: "POJAZDY",
		icon: faCar,
		roles: ["rental_staff", "admin"],
	},
	{
		id: "parking",
		name: "PARKING",
		icon: faSquareParking,
		roles: ["parking_staff", "admin"],
	},
	{
		id: "uzytkownicy",
		name: "UŻYTKOWNICY",
		icon: faUser,
		roles: ["admin"],
	},
	{
		id: "bilety",
		name: "BILETY",
		icon: faTicket,
		roles: ["airport_staff", "admin"],
	},
	{
		id: "twoje-bilty",
		name: "TWOJE BILETY",
		icon: faTicket,
		roles: ["client"],
	},
	{
		id: "bagaze",
		name: "BAGAŻE",
		icon: faSuitcase,
		roles: ["airport_staff", "admin", "client"],
	},
	{
		id: "parking-rezerwacje",
		name: "REZERWACJE PARKINGU",
		icon: faSquareParking,
		roles: ["client"],
	},
	{
		id: "wypozyczenia",
		name: "WYPOŻYCZENIA",
		icon: faCar,
		roles: ["client"],
	},
];

interface ManagerNavProps {
	setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const ManagerNav: React.FC<ManagerNavProps> = ({
	setTitle,
}: ManagerNavProps) => {
	const location = useLocation();
	const { user } = useContext(AuthContext);
	const [expanded, setExpanded] = useState<boolean>(true);
	const [navItems, setNavItems] = useState<NavItem[]>(allNavItems);

	useEffect(() => {
		if (user?.role) {
			setNavItems(allNavItems.filter((item) => item.roles.includes(user.role)));
		}
	}, [user?.role]);

	useEffect(() => {
		setTitle(
			navItems.find((item) => item.id === location.pathname.split("/")[2])
				?.name || ""
		);
	}, [location, navItems, setTitle]);

	const expandHandler = () => {
		setExpanded(!expanded);
	};

	return (
		<nav className={classes.nav}>
			<button
				className={classes["navbar-toggler"]}
				onClick={expandHandler}
			>
				<FontAwesomeIcon
					className="navbar-toggler-icon"
					icon={faBars}
				/>
			</button>
			<ul className={classes["nav-items"]}>
				{expanded
					? navItems.map((item) => (
							<li key={item.id} className={classes["nav-item"]}>
								<NavLink
									to={`/zarzadzanie/${item.id}`}
									id={item.id}
								>
									{item.name}
								</NavLink>
							</li>
					))
					: navItems.map((item) => (
							<li
								key={item.id}
								className={`${classes["nav-item"]} ${classes.shrank}`}
							>
								<NavLink
									to={`/zarzadzanie/${item.id}`}
									id={item.id}
								>
									<FontAwesomeIcon icon={item.icon} />
								</NavLink>
							</li>
					))}
				<li
					className={`${classes["nav-item"]} ${classes.logout} ${
						!expanded ? classes.shrank : ""
					}`}
				>
					<Link to="/">
						{expanded && "Wyjście "}
						<FontAwesomeIcon icon={faRightFromBracket} />
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default ManagerNav;
