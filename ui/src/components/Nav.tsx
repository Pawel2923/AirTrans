import Logo from "/Logo.png";
import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import { NavigationMenu } from "radix-ui";
import styles from "./Nav.module.css";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const { auth, checkAuth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={styles["nav-list"]}>
        <NavigationMenu.Item className={styles["nav-brand"]}>
          <NavigationMenu.Link asChild>
            <NavLink
              to="/"
              className="d-flex align-items-center gap-3 fw-bold fs-3"
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

export default Nav;
