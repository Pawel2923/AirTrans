import { useContext } from "react";
import classes from "./MobileManagerNav.module.css";
import sharedClasses from "../ManagerNav.module.css";
import { Dialog, NavigationMenu, ScrollArea, VisuallyHidden } from "radix-ui";
import { MenuGroup } from "../ManagerNavItems";
import ManagerNavContext from "../../../store/manager-nav-context";
import MobileManagerNavGroups from "./MobileManagerNavGroups";
import MobileManagerNavHeader from "./MobileManagerNavHeader";
import MobileManagerNavItems from "./MobileManagerNavItems";

interface MobileManagerNavProps {
  menuGroups: MenuGroup[];
}

const MobileManagerNav: React.FC<MobileManagerNavProps> = ({ menuGroups }) => {
  const { menuId, expanded, setExpanded } = useContext(ManagerNavContext);

  return (
    <Dialog.Root open={expanded} onOpenChange={setExpanded}>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.backdrop} />
        <Dialog.Content
          className={`${classes.nav} ${expanded ? classes.expanded : ""}`}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Nawigacja panelu zarządzania</Dialog.Title>
            <Dialog.Description>
              Menu nawigacyjne panelu zarządzania aplikacją.
            </Dialog.Description>
          </VisuallyHidden.Root>
          <NavigationMenu.Root orientation="vertical">
            <MobileManagerNavHeader />
            <ScrollArea.Root className={sharedClasses["scrollbar-root"]}>
              <ScrollArea.Viewport
                className={sharedClasses["scrollbar-viewport"]}
              >
                <NavigationMenu.List
                  className={`${sharedClasses["nav-items"]} ${classes["mobile-nav-items"]}`}
                  id={menuId}
                >
                  <MobileManagerNavGroups menuGroups={menuGroups} />
                  <MobileManagerNavItems menuGroups={menuGroups} />
                </NavigationMenu.List>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className={sharedClasses.scrollbar}
                orientation="vertical"
              >
                <ScrollArea.Thumb
                  className={sharedClasses["scrollbar-thumb"]}
                />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </NavigationMenu.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobileManagerNav;
