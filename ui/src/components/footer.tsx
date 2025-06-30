import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const Footer = ({ style, className }: { style?: CSSProperties, className?: string }) => {
  return (
    <footer
      className={`d-grid justify-content-center px-4 py-3 ${className}`}
      style={{ backgroundColor: "#f8f9fb", ...style }}
    >
      <ul className="list-group list-group-flush list-group-horizontal-sm text-uppercase fw-medium">
        <li className="list-group-item border border-0 bg-transparent">
          <Link to="/" className="nav-link">
            Polityka prywatności
          </Link>
        </li>
        <li className="list-group-item border border-0 bg-transparent">
          <Link to="/add" className="nav-link">
            Warunki korzystania
          </Link>
        </li>
        <li className="list-group-item border border-0 bg-transparent">
          <Link to="/add" className="nav-link">
            Kontakt
          </Link>
        </li>
      </ul>
      <p className="fw-small fs-5 m-0 text-center">
        © 2024 AirTrans. Wszystkie prawa zastrzeżone.
      </p>
    </footer>
  );
};

export default Footer;
