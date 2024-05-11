import React, { useContext, useState, useEffect } from "react";
import AuthContext, { User } from "../../store/auth-context";
import classes from "./ManagerTopNav.module.css";
import useAuth from "../../hooks/use-auth";

interface ProfileMenuProps {
    setIsOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    setIsOpenProfile,
}: ProfileMenuProps) => {
    const { logout } = useAuth();
    const authCtx = useContext(AuthContext);
    const [user, setUser] = useState<User>();

	useEffect(() => {
		setUser(authCtx.user as User);
	}, [authCtx.user]);

	return (
		<>
			<div
				className={classes["profile-backdrop"]}
				onClick={() => setIsOpenProfile(false)}
			></div>
			<div className={classes.profile}>
				<div>{user ? user.email : "e-mail"}</div>
				<ul className={classes["profile-menu"]}>
					<li>
						<a href="#">Profil</a>
					</li>
					<li>
						<a href="#">Ustawienia</a>
					</li>
					<li onClick={logout}>
						<a href="#">Wyloguj</a>
					</li>
				</ul>
			</div>
		</>
	);
};

export default ProfileMenu;
