import Logo from "/Logo.png";
import { NavigationMenu, VisuallyHidden } from "radix-ui";
import { Dialog } from "radix-ui";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle as faUserCircleRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faList,
  faRightFromBracket,
  faRightToBracket,
  faUserCircle as faUserCircleSolid,
  faUserPen,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./MobileTopNav.module.css";
import { useContext, useEffect, useState } from "react";
import useBottomSheetDrag from "../../hooks/useBottomSheetDrag";
import AuthContext from "../../store/auth-context";
import useGetUsers from "../../hooks/users/useGetUsers";
import filesService from "../../services/files.service";

const MobileTopNav = () => {
  const { auth, user } = useContext(AuthContext);
  const { usersData, getUserByEmail } = useGetUsers();

  const [isOpen, setIsOpen] = useState(false);
  const {
    sheetRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  } = useBottomSheetDrag({ onClose: () => setIsOpen(false) });

  useEffect(() => {
    if (user?.email) {
      getUserByEmail(user.email);
    }
  }, [getUserByEmail, user]);

  return (
    <>
      <NavigationMenu.Root className={styles["top-nav"]}>
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

          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <NavigationMenu.Item className={styles["nav-account"]}>
              <Dialog.Trigger asChild>
                <button
                  className={styles["nav-account-trigger"]}
                  aria-label={
                    auth
                      ? "Menu konta użytkownika"
                      : "Zaloguj się lub zarejestruj"
                  }
                  aria-expanded={isOpen}
                >
                  {usersData && usersData[0].img ? (
                    <img
                      src={filesService.getImgUrl(usersData[0].img)}
                      alt=""
                      role="presentation"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={auth ? faUserCircleSolid : faUserCircleRegular}
                      aria-hidden
                    />
                  )}
                </button>
              </Dialog.Trigger>
            </NavigationMenu.Item>
            <Dialog.Portal>
              <Dialog.Overlay className={styles["nav-backdrop"]} />
              <Dialog.Content
                ref={sheetRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
                className={styles["account-sheet"]}
              >
                <VisuallyHidden.Root>
                  <Dialog.Title>Menu konta użytkownika</Dialog.Title>
                </VisuallyHidden.Root>
                <div className={styles["account-sheet-handle"]}></div>
                <Dialog.Close asChild>
                  <button
                    className={styles["account-sheet-close"]}
                    aria-label="Zamknij menu"
                  >
                    <FontAwesomeIcon icon={faX} aria-hidden />
                  </button>
                </Dialog.Close>
                {auth ? (
                  <div className={styles["account-sheet-wrapper"]}>
                    <div className={styles["account-sheet-group"]}>
                      <NavLink
                        to="/zarzadzanie/profil"
                        className={styles["account-sheet-item"]}
                      >
                        <FontAwesomeIcon icon={faUserPen} aria-hidden />
                        <span>Profil</span>
                      </NavLink>
                      {user?.role === "admin" && (
                        <NavLink
                          to="/logi"
                          className={styles["account-sheet-item"]}
                        >
                          <FontAwesomeIcon icon={faList} aria-hidden />
                          <span>Logi</span>
                        </NavLink>
                      )}
                    </div>
                    <div
                      className={styles["account-sheet-group-divider"]}
                    ></div>
                    <div className={styles["account-sheet-group"]}>
                      <NavLink
                        to="/wyloguj"
                        className={`${styles["account-sheet-item"]} ${styles["account-sheet-item-destructive"]}`}
                      >
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          aria-hidden
                        />
                        <span>Wyloguj się</span>
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div className={styles["account-sheet-group"]}>
                    <NavLink
                      to="/logowanie"
                      className={`${styles["account-sheet-item"]} ${styles["account-sheet-item-primary"]}`}
                    >
                      <FontAwesomeIcon icon={faRightToBracket} aria-hidden />
                      <span>Zaloguj się</span>
                    </NavLink>
                    <NavLink
                      to="/rejestracja"
                      className={styles["account-sheet-item"]}
                    >
                      <FontAwesomeIcon icon={faUserPlus} aria-hidden />
                      <span>Zarejestruj się</span>
                    </NavLink>
                  </div>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  );
};

export default MobileTopNav;
