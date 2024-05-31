import React, { useContext, useEffect, useState } from "react";
import classes from "./ManagerTopNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "./ProfileMenu";
import useGetUsers from "../../hooks/users/useGetUsers";
import AuthContext from "../../store/auth-context";
import filesService from "../../services/files.service";

interface ManagerTopNavProps {
  title: string;
}

const ManagerTopNav: React.FC<ManagerTopNavProps> = ({
  title,
}: ManagerTopNavProps) => {
  const { user } = useContext(AuthContext);
  const { usersData, getUserByEmail } = useGetUsers();
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);

  useEffect(() => {
    if (user?.email) {
      getUserByEmail(user.email);
    }
  }, [getUserByEmail, user]);

  return (
    <nav className={classes["top-nav"]}>
      <div className={classes["nav-title"]}>
        <h1>{title}</h1>
      </div>
      <div className={classes["nav-right"]}>
        <button onClick={() => setIsOpenProfile((prev) => !prev)}>
          {usersData && usersData[0].img ? (
            <img
              src={filesService.getImgUrl(usersData[0].img)}
              className={classes["profile-img"]}
              alt="profile"
            />
          ) : (
            <FontAwesomeIcon
              className={classes["profile-img"]}
              icon={faCircleUser}
            />
          )}
        </button>
        {isOpenProfile && <ProfileMenu setIsOpenProfile={setIsOpenProfile} />}
      </div>
    </nav>
  );
};

export default ManagerTopNav;
