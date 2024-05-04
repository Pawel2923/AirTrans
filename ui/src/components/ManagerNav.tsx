import { useState } from "react";
import classes from "./ManagerNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const ManagerNav = () => {
	const [active, setActive] = useState<string>("");
	const [expanded, setExpanded] = useState<boolean>(false);

	const activeHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const target = e.target as HTMLAnchorElement;
		setActive(target.id.toLowerCase());
	};

	const expandHandler = () => {
		setExpanded(!expanded);
	};

	console.log(active);
	console.log(expanded);

	return (
		<nav className={classes.nav}>
			<button
				className={classes["navbar-toggler"]}
				onClick={expandHandler}
			>
				<FontAwesomeIcon className="navbar-toggler-icon" icon={faBars} />
			</button>
			<ul className={classes["nav-items"]}>
				<li className={classes["nav-item"]}>
					<a
						href="#"
						id="flights"
						className={active === "flights" ? "active" : ""}
						onClick={activeHandler}
					>
						HARMONOGRAM LOTÓW
					</a>
				</li>
				<li className={classes["nav-item"]}>
					<a
						href="#"
						id="airplanes"
						className={active === "airplanes" ? "active" : ""}
						onClick={activeHandler}
					>
						SAMOLOTY
					</a>
				</li>
				<li className={classes["nav-item"]}>
					<a
						href="#"
						id="airfield"
						className={active === "airfield" ? "active" : ""}
						onClick={activeHandler}
					>
						LOTNISKO
					</a>
				</li>
				<li className={classes["nav-item"]}>
					<a
						href="#"
						id="equipment"
						className={active === "equipment" ? "active" : ""}
						onClick={activeHandler}
					>
						SPRZĘT LOTNISKA
					</a>
				</li>
				<li className={classes["nav-item"]}>
					<a
						href="#"
						id="gates"
						className={active === "gates" ? "active" : ""}
						onClick={activeHandler}
					>
						BRAMKI
					</a>
				</li>
				<li className={classes["nav-item"]}>
					<a
						href="#"
						id="announcements"
						className={active === "announcements" ? "active" : ""}
						onClick={activeHandler}
					>
						OGŁOSZENIA
					</a>
				</li>
				<li className={`${classes["nav-item"]} ${classes.logout}`}>
					<a href="#">Wyloguj <FontAwesomeIcon icon={faRightFromBracket} /></a>
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
				<a href="#">User</a>
			</div>
		</nav>
	);
};