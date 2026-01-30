import React, { useState, useEffect, useContext } from "react";
import classes from "./ManagerNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { allNavItems, NavItem } from "./ManagerNavItems";

interface ManagerNavProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const ManagerNav: React.FC<ManagerNavProps> = ({
  setTitle,
}: ManagerNavProps) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [navItems, setNavItems] = useState<NavItem[]>(allNavItems);

  useEffect(() => {
    if (user?.role) {
      setNavItems(allNavItems.filter((item) => item.roles.includes(user.role)));
    }
  }, [user?.role]);

  useEffect(() => {
    setTitle(
      navItems.find((item) => item.id === location.pathname.split("/")[2])
        ?.name || ""
    );
  }, [location, navItems, setTitle]);

  const expandHandler = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={classes.nav}>
      <button
        className={classes["navbar-toggler"]}
        onClick={expandHandler}
        title={`${expanded ? "Zwiń" : "Rozwiń"} menu nawigacyjne`}
      >
        <FontAwesomeIcon className="navbar-toggler-icon" icon={faBars} />
      </button>
      <ul className={classes["nav-items"]}>
        {navItems.map(
          (item) =>
            !item.hidden && (
              <li
                key={item.id}
                className={`${classes["nav-item"]} ${expanded ? "" : classes.shrank}`}
              >
                <NavLink to={`/zarzadzanie/${item.id}`} id={item.id} title={item.name}>
                  <FontAwesomeIcon icon={item.icon} />
                  {expanded && `${item.name}`}
                </NavLink>
              </li>
            )
        )}
        <li
          className={`${classes["nav-item"]} ${classes.logout} ${
            !expanded ? classes.shrank : ""
          }`}
        >
          <Link to="/" title="Opuść panel">
            <FontAwesomeIcon icon={faRightFromBracket} />
            {expanded && "Opuść panel"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ManagerNav;
