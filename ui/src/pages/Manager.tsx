import { useState } from "react";
import { Outlet } from "react-router-dom";
import ManagerNav from "../components/Manager/ManagerNav";
import ManagerTopNav from "../components/Manager/ManagerTopNav";
import classes from "./Manager.module.css";
import AuthProvider from "../store/AuthProvider";

const Manager = () => {
	const [title, setTitle] = useState<string>("HARMONOGRAM LOTÓW");

	return (
		<AuthProvider>
			<div className={classes.manager}>
				<ManagerNav setTitle={setTitle} />
				<ManagerTopNav title={title} />
				<main>
					<Outlet />
				</main>
			</div>
		</AuthProvider>
	);
};

export default Manager;
