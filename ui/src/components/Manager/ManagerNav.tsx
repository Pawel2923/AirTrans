import React, { useState, useContext, useEffect } from "react";
import classes from "./ManagerNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { getMenuItemsForRole } from "./ManagerNavItems";
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
  const menuId = "manager-navigation-menu";
  const menuGroups = getMenuItemsForRole(user?.role);

  useEffect(() => {
    const routeId = location.pathname.split("/")[2];

    const menuItem = menuGroups
      .flatMap((group) => group.items)
      .find((item) => item.id === routeId);

    if (process.env.NODE_ENV === "development" && !menuItem) {
      console.warn(`Menu item with id '${routeId}' not found.`);
    }

    setTitle(menuItem?.name || "Panel zarządzania");
  }, [location, menuGroups, setTitle]);

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
            {menuGroups.map((group) => (
              <div key={group.id} className={classes["nav-group"]}>
                {expanded && <p>{group.name}</p>}
                {group.items.map((item) => (
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
                ))}
              </div>
            ))}
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
