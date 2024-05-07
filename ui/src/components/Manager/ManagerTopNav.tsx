import React, { useState } from "react";
import classes from "./ManagerTopNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "./ProfileMenu";

interface ManagerTopNavProps {
	title: string;
}

const ManagerTopNav: React.FC<ManagerTopNavProps> = ({
	title,
}: ManagerTopNavProps) => {
	const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);

	return (
		<nav className={classes["top-nav"]}>
			<div className={classes["nav-title"]}>
				<h1>{title}</h1>
			</div>
			<div className={classes["nav-right"]}>
				<button onClick={() => setIsOpenProfile((prev) => !prev)}>
					<FontAwesomeIcon icon={faCircleUser} />
				</button>
				{isOpenProfile && <ProfileMenu setIsOpenProfile={setIsOpenProfile} />}
			</div>
		</nav>
	);
};

export default ManagerTopNav;