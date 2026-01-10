import Logo from "/Logo.png";
import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import { NavigationMenu } from "radix-ui";
import styles from "./Nav.module.css";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const { auth, checkAuth, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={styles["nav-list"]}>
        <NavigationMenu.Item className={styles["nav-brand"]}>
          <NavigationMenu.Link
            href="/"
            className="d-flex align-items-center gap-3 fw-bold fs-3"
          >
            <img src={Logo} width={64} alt="AirTrans Logo" />
            <span>AirTrans</span>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
          >
            Strona główna
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link
            href="/harmonogram"
            aria-current={isActive("/harmonogram") ? "page" : undefined}
          >
            Harmonogram
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles["nav-item"]}>
          <NavigationMenu.Link
            href="/ogloszenia"
            aria-current={isActive("/ogloszenia") ? "page" : undefined}
          >
            Ogłoszenia
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {auth ? (
          <>
            <NavigationMenu.Item className={styles["nav-item"]}>
              <NavigationMenu.Link href="/zarzadzanie">
                Panel
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item className={styles["nav-item"]}>
              <NavigationMenu.Content onClick={logout}>
                Wyloguj się
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </>
        ) : (
          <NavigationMenu.Item className={styles["nav-item"]}>
            <NavigationMenu.Link href="/logowanie">
              Zaloguj się
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Nav;
