import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const { checkAuth, auth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, auth]);

  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};

export default Nav;
