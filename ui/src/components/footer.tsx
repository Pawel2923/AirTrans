import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const Footer = ({ style, className }: { style?: CSSProperties, className?: string }) => {
  return (
    <footer
      className={`d-grid justify-content-center px-4 py-3 ${className}`}
      style={{ backgroundColor: "#f8f9fb", fontSize: "0.9rem", ...style }}
    >
      <ul className="list-group list-group-flush list-group-horizontal-sm text-uppercase fw-regular">
        <li className="list-group-item border border-0 bg-transparent">
          <Link to="/" className="footer-link">
            Polityka prywatności
          </Link>
        </li>
        <li className="list-group-item border border-0 bg-transparent">
          <Link to="/add" className="footer-link">
            Warunki korzystania
          </Link>
        </li>
        <li className="list-group-item border border-0 bg-transparent">
          <Link to="/add" className="footer-link">
            Kontakt
          </Link>
        </li>
      </ul>
      <p className="m-0 mt-3 text-center" style={{ fontSize: "0.8rem", color: "#6c757d" }}>
        &copy; {currentYear} AirTrans. Wszelkie prawa zastrzeżone.
      </p>
    </footer>
  );
};

export default Footer;
