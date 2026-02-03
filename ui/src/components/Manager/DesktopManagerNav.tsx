import classes from "./DesktopManagerNav.module.css";
import sharedClasses from "./ManagerNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { NavigationMenu, ScrollArea } from "radix-ui";
import { MenuGroup } from "./ManagerNavItems";
import NavbarToggler from "./NavbarToggler";
import { useState } from "react";

interface DesktopManagerNavProps {
  menuGroups: MenuGroup[];
}

const DesktopManagerNav: React.FC<DesktopManagerNavProps> = ({
  menuGroups,
}) => {
  const [expanded, setExpanded] = useState(true);
  const menuId = "desktop-manager-nav";

  return (
    <NavigationMenu.Root
      className={classes.nav}
      orientation="vertical"
      aria-label="Nawigacja panelu zarządzania"
    >
      <NavbarToggler
        menuId={menuId}
        expanded={expanded}
        onExpandedChange={() => setExpanded((prev) => !prev)}
      />

      <ScrollArea.Root className={sharedClasses["scrollbar-root"]}>
        <ScrollArea.Viewport className={sharedClasses["scrollbar-viewport"]}>
          <NavigationMenu.List
            className={sharedClasses["nav-items"]}
            id={menuId}
          >
            {menuGroups.map((group) => (
              <div key={group.id} className={classes["nav-group"]}>
                {expanded && <p>{group.name}</p>}
                {group.items.map((item) => (
                  <NavigationMenu.Item
                    key={item.id}
                    className={`${sharedClasses["nav-item"]} ${expanded ? "" : classes.shrank}`}
                  >
                    <NavLink
                      to={`/zarzadzanie/${item.id}`}
                      id={item.id}
                      title={item.name}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      {expanded && `${item.name}`}
                    </NavLink>
                  </NavigationMenu.Item>
                ))}
              </div>
            ))}
            <NavigationMenu.Item
              className={`${sharedClasses["nav-item"]} ${sharedClasses.logout} ${
                !expanded ? classes.shrank : ""
              }`}
            >
              <Link to="/" title="Opuść panel">
                <FontAwesomeIcon icon={faRightFromBracket} />
                {expanded && "Opuść panel"}
              </Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className={sharedClasses.scrollbar}
          orientation="vertical"
        >
          <ScrollArea.Thumb className={sharedClasses["scrollbar-thumb"]} />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </NavigationMenu.Root>
  );
};

export default DesktopManagerNav;
