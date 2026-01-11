import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { useLocation } from "react-router-dom";
// import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const { auth, checkAuth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isActive = (path: string) => location.pathname === path;

  return <MobileNav auth={auth} isActive={isActive} />;
};

export default Nav;
