import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ManagerNav from "../components/Manager/ManagerNav";
import ManagerTopNav from "../components/Manager/ManagerTopNav";
import classes from "./Manager.module.css";
import AuthContext from "../store/auth-context";

const Manager = () => {
	const navigate = useNavigate();
	const { checkAuth } = useContext(AuthContext);
	const [title, setTitle] = useState<string>("");

	useEffect(() => {
		checkAuth().then((auth) => {
			if (!auth) {
				navigate("/logowanie");
			}
		});
	}, [checkAuth, navigate]);

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
