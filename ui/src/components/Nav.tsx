import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/airplane" className="navbar-brand">
                AirTrans
            </a>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/airplane" className="nav-link">
                        Airplane
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/add" className="nav-link">
                        Add
                    </Link>
                </li>
            </div>
        </nav>
    );
};

export default Nav;