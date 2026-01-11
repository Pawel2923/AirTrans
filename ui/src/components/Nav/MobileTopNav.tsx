import Logo from "/Logo.png";
import { NavigationMenu } from "radix-ui";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle as faUserCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { faUserCircle as faUserCircleSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "./MobileTopNav.module.css";
import { useState } from "react";

interface MobileTopNavProps {
  auth: boolean;
}

const MobileTopNav = ({ auth }: MobileTopNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className={styles["nav-backdrop"]}
          onClick={() => setIsOpen(false)}  
        ></div>
      )}
      <NavigationMenu.Root onValueChange={(value) => setIsOpen(!!value)}>
        <NavigationMenu.List className={styles["nav-list"]}>
          <NavigationMenu.Item className={styles["nav-brand"]}>
            <NavigationMenu.Link asChild>
              <NavLink
                to="/"
                className="d-flex align-items-center gap-2 fw-bold"
              >
                <img src={Logo} width={64} alt="AirTrans Logo" />
                <span>AirTrans</span>
              </NavLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item className={styles["nav-account"]}>
            <NavigationMenu.Trigger
              className={styles["nav-account-trigger"]}
              aria-label={
                auth ? "Menu konta użytkownika" : "Zaloguj się lub zarejestruj"
              }
            >
              <FontAwesomeIcon
                icon={auth ? faUserCircleSolid : faUserCircleRegular}
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles["account-sheet"]}>
              {auth ? (
                <>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/zarzadzanie/profil">Profil</NavLink>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/logi">Logi</NavLink>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/wyloguj">Wyloguj się</NavLink>
                  </NavigationMenu.Link>
                </>
              ) : (
                <>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/logowanie">Zaloguj się</NavLink>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/rejestracja">Zarejestruj się</NavLink>
                  </NavigationMenu.Link>
                </>
              )}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <NavigationMenu.Viewport className={styles["nav-viewport"]} />
      </NavigationMenu.Root>
    </>
  );
};

export default MobileTopNav;
