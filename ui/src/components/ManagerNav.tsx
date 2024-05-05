import React, { useState } from "react";
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
import { NavLink } from "react-router-dom";

const navItems = [
	{
		id: "harmonogram",
		name: "HARMONOGRAM LOTÓW",
		icon: faPlaneDeparture
	},
	{
		id: "samoloty",
		name: "SAMOLOTY",
		icon: faPlane
	},
	{
		id: "lotnisko",
		name: "LOTNISKO",
		icon: faMapMarkerAlt
	},
	{
		id: "sprzet",
		name: "SPRZĘT LOTNISKA",
		icon: faTools
	},
	{
		id: "bramki",
		name: "BRAMKI",
		icon: faDoorOpen
	},
	{
		id: "ogloszenia",
		name: "OGŁOSZENIA",
		icon: faBullhorn
	},
];

interface ManagerNavProps {
	setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const ManagerNav: React.FC<ManagerNavProps> = ({ setTitle }: ManagerNavProps) => {
	const [expanded, setExpanded] = useState<boolean>(true);

	const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const target = e.currentTarget as HTMLAnchorElement;
		setTitle(target.getAttribute("data-name") || "");
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
						<NavLink
							to={`/zarzadzanie/${item.id}`}
							id={item.id}
							data-name={item.name}
							onClick={linkClickHandler}
						>
							{item.name}
						</NavLink>
					</li>
				)) : (
					navItems.map(item => (
						<li key={item.id} className={`${classes["nav-item"]} ${classes.shrank}`}>
							<NavLink
								to={`/zarzadzanie/${item.id}`}
								id={item.id}
								data-name={item.name}
								onClick={linkClickHandler}
							>
								<FontAwesomeIcon icon={item.icon} />
							</NavLink>
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

interface ManagerTopNavProps {
	title: string;
}

export const ManagerTopNav: React.FC<ManagerTopNavProps> = ({ title }: ManagerTopNavProps) => {
	return (
		<nav className={classes["top-nav"]}>
			<div className={classes["nav-title"]}>
				<h1>{title}</h1>
			</div>
			<div className={classes["nav-right"]}>
				<a href="#"><FontAwesomeIcon icon={faCircleUser} /></a>
			</div>
		</nav>
	);
};