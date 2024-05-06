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
	faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import {
	NavLink,
	NavigateFunction,
	useLocation,
	useNavigate,
} from "react-router-dom";
import AuthContext, { User } from "../store/auth-context";
import authenticationService from "../services/authentication.service";

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
];

const logout = (navigate: NavigateFunction) => {
	authenticationService
		.logout()
		.then((response) => {
			if (response.status === 200) {
				navigate("/");
			}
		})
		.catch((error) => {
			if (error.response.status === 401) {
				console.error("Unauthorized");
			} else if (error.response.status === 500) {
				console.error("Server error");
			}
		});
};

interface ManagerNavProps {
	setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const ManagerNav: React.FC<ManagerNavProps> = ({
	setTitle,
}: ManagerNavProps) => {
	const navigate = useNavigate();
	const location = useLocation();
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
					<a href="#" onClick={() => logout(navigate)}>
						{expanded && "Wyloguj "}
						<FontAwesomeIcon icon={faRightFromBracket} />
					</a>
				</li>
			</ul>
		</nav>
	);
};

interface ManagerTopNavProps {
	title: string;
}

export const ManagerTopNav: React.FC<ManagerTopNavProps> = ({
	title,
}: ManagerTopNavProps) => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);
	const [profileMenu, setProfileMenu] = useState<boolean>(false);
	const [user, setUser] = useState<User>();

	useEffect(() => {
		setUser(authCtx.user as User);
	}, [authCtx.user]);

	return (
		<nav className={classes["top-nav"]}>
			<div className={classes["nav-title"]}>
				<h1>{title}</h1>
			</div>
			<div className={classes["nav-right"]}>
				<button onClick={() => setProfileMenu((prev) => !prev)}>
					<FontAwesomeIcon icon={faCircleUser} />
				</button>
				{profileMenu && (
					<>
						<div
							className={classes["profile-backdrop"]}
							onClick={() => setProfileMenu(false)}
						></div>
						<div className={classes.profile}>
							<div>{user ? user.id : "e-mail"}</div>
							<ul className={classes["profile-menu"]}>
								<li>
									<a href="#">Profil</a>
								</li>
								<li>
									<a href="#">Ustawienia</a>
								</li>
								<li onClick={() => logout(navigate)}>
									<a href="#">Wyloguj</a>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</nav>
	);
};
