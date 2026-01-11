import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { useLocation } from "react-router-dom";
import DesktopNav from "./DesktopNav";

const Nav = () => {
  const { auth, checkAuth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isActive = (path: string) => location.pathname === path;

  return <DesktopNav auth={auth} isActive={isActive} />;
};

export default Nav;
