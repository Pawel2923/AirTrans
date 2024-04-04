
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer navbar navbar-expand-lg" style={{backgroundColor: "#f8f9fb"}}>
            <div className="container-fluid px-4">
                <div className="d-flex navbar-nav text-uppercase fw-medium ms-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Polityka prywatności
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add" className="nav-link">
                            Warunki korzystania
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add" className="nav-link">
                            Kontakt
                        </Link>
                    </li>
                </div>
                <p className="d-flex align-items-center gap-3 navbar-brand fw-bold fs-3">
                    © 2024 AirTrans. Wszystkie prawa zastrzeżone.
                </p>
            </div>
        </footer>
    );
};

export default Footer;