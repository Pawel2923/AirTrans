import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationMenu } from "radix-ui";
import { NavLink } from "react-router-dom";
import { getMenuItemsByGroupId, MenuGroup } from "../ManagerNavItems";
import classes from "./MobileManagerNav.module.css";
import ManagerNavContext from "../../../store/manager-nav-context";
import React, { useContext } from "react";

interface MobileManagerNavItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  menuGroups: MenuGroup[];
}

const MobileManagerNavItems: React.FC<MobileManagerNavItemsProps> = ({
  menuGroups,
  ...rest
}) => {
  const { currentGroupId, setExpanded } = useContext(ManagerNavContext);
  const menuItems = getMenuItemsByGroupId(currentGroupId, menuGroups);

  return (
    <div className={classes["nav-items"]} {...rest}>
      {menuItems?.map((item) => (
        <NavigationMenu.Item
          key={item.id}
          className={classes["mobile-nav-item"]}
        >
          <NavLink
            to={`/zarzadzanie/${item.id}`}
            id={item.id}
            title={item.name}
            onClick={() => setExpanded(false)}
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
