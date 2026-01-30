import React, { useState, useEffect, useContext } from "react";
import classes from "./ManagerNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { allNavItems, NavItem } from "./ManagerNavItems";
import { NavigationMenu, ScrollArea } from "radix-ui";

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
  const menuId = "manager-navigation-menu";

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
    <NavigationMenu.Root
      className={classes.nav}
      orientation="vertical"
      aria-expanded={expanded}
      aria-label="Nawigacja panelu zarządzania"
    >
      <button
        className={classes["navbar-toggler"]}
        onClick={expandHandler}
        title={`${expanded ? "Zwiń" : "Rozwiń"} menu nawigacyjne`}
        aria-expanded={expanded}
        aria-controls={menuId}
        aria-label={`${expanded ? "Zwiń" : "Rozwiń"} menu nawigacyjne`}
      >
        <FontAwesomeIcon className="navbar-toggler-icon" icon={faBars} />
      </button>

      <ScrollArea.Root className={classes["scrollbar-root"]}>
        <ScrollArea.Viewport className={classes["scrollbar-viewport"]}>
          <NavigationMenu.List className={classes["nav-items"]} id={menuId}>
            {navItems.map(
              (item) =>
                !item.hidden && (
                  <NavigationMenu.Item
                    key={item.id}
                    className={`${classes["nav-item"]} ${expanded ? "" : classes.shrank}`}
                  >
                    <NavLink
                      to={`/zarzadzanie/${item.id}`}
                      id={item.id}
                      title={item.name}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      {expanded && `${item.name}`}
                    </NavLink>
                  </NavigationMenu.Item>
                )
            )}
            <NavigationMenu.Item
              className={`${classes["nav-item"]} ${classes.logout} ${
                !expanded ? classes.shrank : ""
              }`}
            >
              <Link to="/" title="Opuść panel">
                <FontAwesomeIcon icon={faRightFromBracket} />
                {expanded && "Opuść panel"}
              </Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={classes.scrollbar}
          orientation="vertical"
        >
          <ScrollArea.Thumb className={classes["scrollbar-thumb"]} />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </NavigationMenu.Root>
  );
};

export default ManagerNav;
