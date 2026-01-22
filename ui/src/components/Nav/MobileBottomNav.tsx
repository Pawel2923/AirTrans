import { NavigationMenu } from "radix-ui";
import { NavLink } from "react-router-dom";
import styles from "./MobileBottomNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faGaugeHigh,
  faHouse,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

interface MobileBottomNavProps {
  auth: boolean;
  isActive: (path: string) => boolean;
}

const MobileBottomNav = ({ auth, isActive }: MobileBottomNavProps) => {
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
