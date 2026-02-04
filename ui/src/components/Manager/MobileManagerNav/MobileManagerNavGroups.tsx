import {
  faArrowRightLong,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationMenu } from "radix-ui";
import { Link } from "react-router-dom";
import { MenuGroup } from "../ManagerNavItems";
import classes from "./MobileManagerNav.module.css";
import sharedClasses from "../ManagerNav.module.css";
import ManagerNavContext from "../../../store/manager-nav-context";
import { useContext } from "react";

interface MobileManagerNavGroupsProps extends React.HTMLAttributes<HTMLDivElement> {
  menuGroups: MenuGroup[];
}

const MobileManagerNavGroups: React.FC<MobileManagerNavGroupsProps> = ({
  menuGroups,
  ...rest
}) => {
  const { setCurrentGroupId } = useContext(ManagerNavContext);

  return (
    <div className={classes["nav-groups"]} {...rest}>
      {menuGroups.map((group) => (
        <button
          key={group.id}
          className={classes["nav-group-button"]}
          onClick={() => setCurrentGroupId(group.id)}
        >
          {group.icon && <FontAwesomeIcon icon={group.icon} />}
          <span>{group.name}</span>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      ))}
      <NavigationMenu.Item
        className={`${sharedClasses["nav-item"]} ${sharedClasses.logout}`}
      >
        <Link to="/" title="Opuść panel">
          <FontAwesomeIcon icon={faRightFromBracket} />
          Opuść panel
        </Link>
      </NavigationMenu.Item>
    </div>
  );
};

export default MobileManagerNavGroups;
