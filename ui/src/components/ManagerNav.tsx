import { useState } from "react";
import classes from "./ManagerNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const navItems = [
	{
		id: "flights",
		name: "HARMONOGRAM LOTÓW",
		icon: faPlaneDeparture
	},
	{
		id: "airplanes",
		name: "SAMOLOTY",
		icon: faPlane
	},
	{
		id: "airfield",
		name: "LOTNISKO",
		icon: faMapMarkerAlt
	},
	{
		id: "equipment",
		name: "SPRZĘT LOTNISKA",
		icon: faTools
	},
	{
		id: "gates",
		name: "BRAMKI",
		icon: faDoorOpen
	},
	{
		id: "announcements",
		name: "OGŁOSZENIA",
		icon: faBullhorn
	},
];

export const ManagerNav = () => {
	const [active, setActive] = useState<string>("");
	const [expanded, setExpanded] = useState<boolean>(true);

	const activeHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const target = e.target as HTMLAnchorElement;
		setActive(target.id.toLowerCase());
	};

	const expandHandler = () => {
		setExpanded(!expanded);
	};

	return (
		<nav className={classes.nav}>
			<button
				className={classes["navbar-toggler"]}
				onClick={expandHandler}
			>
				<FontAwesomeIcon className="navbar-toggler-icon" icon={faBars} />
			</button>
			<ul className={classes["nav-items"]}>
				{expanded ? navItems.map(item => (
					<li key={item.id} className={classes["nav-item"]}>
						<a
							href="#"
							id={item.id}
							className={active === item.id ? "active" : ""}
							onClick={activeHandler}
						>
							{item.name}
						</a>
					</li>
				)) : (
					navItems.map(item => (
						<li key={item.id} className={`${classes["nav-item"]} ${classes.shrank}`}>
							<a
								href="#"
								id={item.id}
								className={active === item.id ? "active" : ""}
								onClick={activeHandler}
							>
								<FontAwesomeIcon icon={item.icon} />
							</a>
						</li>
					
					))
				)}
				<li className={`${classes["nav-item"]} ${classes.logout} ${!expanded ? classes.shrank : ""}`}>
					<a href="#">{expanded && "Wyloguj "}<FontAwesomeIcon icon={faRightFromBracket} /></a>
				</li>
			</ul>
		</nav>
	);
};


export const ManagerTopNav = () => {
	return (
		<nav className={classes["top-nav"]}>
			<div className={classes["nav-title"]}>
				<h1>Title</h1>
			</div>
			<div className={classes["nav-right"]}>
				<a href="#"><FontAwesomeIcon icon={faCircleUser} /></a>
			</div>
		</nav>
	);
};