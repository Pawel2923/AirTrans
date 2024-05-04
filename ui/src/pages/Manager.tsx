import { Outlet } from "react-router-dom";
import { ManagerNav, ManagerTopNav } from "../components/ManagerNav";
import classes from "./Manager.module.css";

const Manager = () => {
    return (
        <div className={classes.manager}>
            <ManagerNav />
            <ManagerTopNav />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Manager;