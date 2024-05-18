import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ManagerNav from "../components/Manager/ManagerNav";
import ManagerTopNav from "../components/Manager/ManagerTopNav";
import classes from "./Manager.module.css";
import AuthContext from "../store/auth-context";
import { AxiosResponse } from "axios";
import authenticationService from "../services/authentication.service";
import { AuthResponse } from "../store/AuthProvider";

const Manager = () => {
	const navigate = useNavigate();
	const { setAuth, setUser, refreshToken } = useContext(AuthContext);
	const [title, setTitle] = useState<string>("");

	useEffect(() => {
		authenticationService
			.authenticate()
			.then((response: AxiosResponse<AuthResponse>) => {
				if (response.status === 200) {
					if (response.data.user?.role === "client") {
						navigate("/zabronione");
					}
					setAuth(response.data.auth);
					setUser(response.data.user);
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 401) {
						refreshToken();
					} else if (error.response.status === 403) {
						navigate("/zabronione");
					} else {
						sessionStorage.setItem("errorMessage", error.response.data.message);
						navigate("/blad");
					}
				}
			});
	}, [navigate, refreshToken, setAuth, setUser]);

	return (
		<div className={classes.manager}>
			<ManagerNav setTitle={setTitle} />
			<ManagerTopNav title={title} />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Manager;
