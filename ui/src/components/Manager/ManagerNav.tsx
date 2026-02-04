import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { getMenuItemsForRole } from "./ManagerNavItems";
import DesktopManagerNav from "./DesktopManagerNav";
import MobileManagerNav from "./MobileManagerNav/MobileManagerNav";
import ManagerNavContext from "../../store/manager-nav-context";

const ManagerNav = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const menuGroups = getMenuItemsForRole(user?.role);
  const { setTitle } = useContext(ManagerNavContext);

  useEffect(() => {
    const routeId = location.pathname.split("/")[2];

    const menuItem = menuGroups
      .flatMap((group) => group.items)
      .find((item) => item.id === routeId);

    setTitle(menuItem?.name || "Panel zarządzania");
  }, [location, menuGroups, setTitle]);

  return (
    <>
      <DesktopManagerNav menuGroups={menuGroups} />
      <MobileManagerNav menuGroups={menuGroups} />
    </>
  );
};

export default ManagerNav;
