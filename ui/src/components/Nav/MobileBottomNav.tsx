import { NavigationMenu } from "radix-ui";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./MobileBottomNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faGaugeHigh,
  faHouse,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MobileBottomNav = () => {
  const { auth } = useContext(AuthContext);

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu.Root className={styles["bottom-nav"]}>
      <NavigationMenu.List className={styles["nav-list"]}>
        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link asChild>
            <NavLink to="/" aria-current={isActive("/") ? "page" : undefined}>
              <FontAwesomeIcon icon={faHouse} aria-hidden />
              <span>Strona główna</span>
            </NavLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {auth && (
          <NavigationMenu.Item className={styles["nav-item"]}>
            <NavigationMenu.Link asChild>
              <NavLink
                to="/zarzadzanie"
                aria-current={isActive("/zarzadzanie") ? "page" : undefined}
              >
                <FontAwesomeIcon icon={faGaugeHigh} aria-hidden />
                <span>Panel</span>
              </NavLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        )}

        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link asChild>
            <NavLink
              to="/harmonogram"
              aria-current={isActive("/harmonogram") ? "page" : undefined}
            >
              <FontAwesomeIcon icon={faPlaneDeparture} aria-hidden />
              <span>Harmonogram</span>
            </NavLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link asChild>
            <NavLink
              to="/ogloszenia"
              aria-current={isActive("/ogloszenia") ? "page" : undefined}
            >
              <FontAwesomeIcon icon={faBullhorn} aria-hidden />
              <span>Ogłoszenia</span>
            </NavLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default MobileBottomNav;
