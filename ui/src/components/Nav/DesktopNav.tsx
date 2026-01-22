import Logo from "/Logo.png";
import { NavigationMenu } from "radix-ui";
import styles from "./DesktopNav.module.css";
import { NavLink } from "react-router-dom";

interface DesktopNavProps {
  auth: boolean;
  isActive: (path: string) => boolean;
}

const DesktopNav = ({ auth, isActive }: DesktopNavProps) => {
  return (
    <NavigationMenu.Root className={styles["desktop-nav"]}>
      <NavigationMenu.List className={styles["nav-list"]}>
        <NavigationMenu.Item className={styles["nav-brand"]}>
          <NavigationMenu.Link asChild>
            <NavLink
              to="/"
              className="d-flex align-items-center gap-3 fw-bold"
            >
              <img src={Logo} width={64} alt="AirTrans Logo" />
              <span>AirTrans</span>
            </NavLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link asChild>
            <NavLink to="/" aria-current={isActive("/") ? "page" : undefined}>
              Strona główna
            </NavLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link asChild>
            <NavLink
              to="/harmonogram"
              aria-current={isActive("/harmonogram") ? "page" : undefined}
            >
              Harmonogram
            </NavLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link asChild>
            <NavLink
              to="/ogloszenia"
              aria-current={isActive("/ogloszenia") ? "page" : undefined}
            >
              Ogłoszenia
            </NavLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {auth ? (
          <>
            <NavigationMenu.Item className={styles["nav-item"]}>
              <NavigationMenu.Link asChild>
                <NavLink to="/zarzadzanie">Panel</NavLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item className={styles["nav-item"]}>
              <NavigationMenu.Link asChild>
                <NavLink to="/wyloguj">Wyloguj się</NavLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </>
        ) : (
          <NavigationMenu.Item className={styles["nav-item"]}>
            <NavigationMenu.Link asChild>
              <NavLink to="/logowanie">Zaloguj się</NavLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default DesktopNav;
