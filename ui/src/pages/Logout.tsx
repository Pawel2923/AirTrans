import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { auth, checkAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (auth) {
      logout();
    } else {
      navigate("/");
    }
  }, [auth, logout, navigate]);

  return <p>Wylogowywanie...</p>;
};

export default Logout;
