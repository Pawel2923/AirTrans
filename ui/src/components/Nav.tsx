import { Link, NavLink } from "react-router-dom";
import Logo from "/Logo.svg";

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "var(--background-white)" }}>
            <div className="container-fluid px-4">
                <Link to="/" className="d-flex align-items-center gap-3 navbar-brand fw-bold fs-3">
                    <img src={Logo} alt="AirTrans Logo" />
                    AirTrans
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                        <li className="nav-item">
                            <NavLink to="/logowanie" className="nav-link">
                                ZALOGUJ SIĘ
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Przełącz nawigację">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            
        </nav>
        
    );
};

export default Nav;
