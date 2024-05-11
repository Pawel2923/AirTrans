import { Link, NavLink } from "react-router-dom";
import Logo from "/Logo.svg";
import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";

const Nav = () => {
	const { auth, user, checkAuth, logout } = useContext(AuthContext);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	const logoutItem = (
		<li className="nav-item">
			<button onClick={logout} className="nav-link">
				WYLOGUJ SIĘ
			</button>
		</li>
	);

	const loginItem = auth ? (
		user?.role === "client" ? (
			logoutItem
		) : (
			<>
				<li className="nav-item">
					<NavLink to="/zarzadzanie" className="nav-link">
						PANEL
					</NavLink>
				</li>
				{logoutItem}
			</>
		)
	) : (
		<li className="nav-item">
			<NavLink to="/logowanie" className="nav-link">
				ZALOGUJ SIĘ
			</NavLink>
		</li>
	);

	return (
		<nav
			className="navbar navbar-expand-lg"
			style={{ backgroundColor: "var(--background-white)" }}
		>
			<div className="container-fluid px-4">
				<Link
					to="/"
					className="d-flex align-items-center gap-3 navbar-brand fw-bold fs-3"
				>
					<img src={Logo} alt="AirTrans Logo" />
					AirTrans
				</Link>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="d-flex navbar-nav text-uppercase fw-medium ms-auto">
						<li className="nav-item">
							<NavLink to="/" className="nav-link">
								GŁÓWNA
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/harmonogram" className="nav-link">
								HARMONOGRAM
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/ogloszenia" className="nav-link">
								OGŁOSZENIA
							</NavLink>
						</li>
						{loginItem}
					</ul>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Przełącz nawigację"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
			</div>
		</nav>
	);
};

export default Nav;
