import React, { useState, useEffect } from "react";
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
	faSquareParking
} from "@fortawesome/free-solid-svg-icons";
import {
	NavLink,
	useLocation,
} from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const navItems = [
	{
		id: "harmonogram",
		name: "HARMONOGRAM LOTÓW",
		icon: faPlaneDeparture,
	},
	{
		id: "samoloty",
		name: "SAMOLOTY",
		icon: faPlane,
	},
	{
		id: "lotnisko",
		name: "LOTNISKO",
		icon: faMapMarkerAlt,
	},
	{
		id: "sprzet",
		name: "SPRZĘT LOTNISKA",
		icon: faTools,
	},
	{
		id: "bramki",
		name: "BRAMKI",
		icon: faDoorOpen,
	},
	{
		id: "ogloszenia",
		name: "OGŁOSZENIA",
		icon: faBullhorn,
	},
	{
		id: "pojazd",
		name: "POJAZDY",
		icon: faCar,
	},
	{
		id: "parking",
		name: "PARKING",
		icon: faSquareParking,
	},
];

interface ManagerNavProps {
	setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const ManagerNav: React.FC<ManagerNavProps> = ({
	setTitle,
}: ManagerNavProps) => {
	const location = useLocation();
	const { logout } = useAuth();
	const [expanded, setExpanded] = useState<boolean>(true);

	useEffect(() => {
		setTitle(
			navItems.find((item) => item.id === location.pathname.split("/")[2])
				?.name || ""
		);
	}, [location, setTitle]);

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
					<a href="#" onClick={logout}>
						{expanded && "Wyloguj "}
						<FontAwesomeIcon icon={faRightFromBracket} />
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default ManagerNav;
