import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationMenu } from "radix-ui";
import { NavLink } from "react-router-dom";
import { getMenuItemsByGroupId, MenuGroup } from "../ManagerNavItems";
import classes from "./MobileManagerNav.module.css";
import sharedClasses from "../ManagerNav.module.css";
import ManagerNavContext from "../../../store/manager-nav-context";
import { useContext } from "react";

interface MobileManagerNavItemsProps {
  menuGroups: MenuGroup[];
}

const MobileManagerNavItems: React.FC<MobileManagerNavItemsProps> = ({
  menuGroups,
}) => {
  const { currentGroupId } = useContext(ManagerNavContext);
  const menuItems = getMenuItemsByGroupId(currentGroupId, menuGroups);

  return (
    <div className={classes["nav-groups"]}>
      {menuItems?.map((item) => (
        <NavigationMenu.Item
          key={item.id}
          className={sharedClasses["nav-item"]}
        >
          <NavLink
            to={`/zarzadzanie/${item.id}`}
            id={item.id}
            title={item.name}
          >
            <FontAwesomeIcon icon={item.icon} />
            {item.name}
          </NavLink>
        </NavigationMenu.Item>
      ))}
    </div>
  );
};

export default MobileManagerNavItems;
