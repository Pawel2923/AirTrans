import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ManagerTopNav.module.css";

interface ProfileMenuProps {
    setIsOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    setIsOpenProfile,
}: ProfileMenuProps) => {
    const { user, logout } = useContext(AuthContext);

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