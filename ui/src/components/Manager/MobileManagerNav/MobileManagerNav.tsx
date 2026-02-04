import { useContext } from "react";
import classes from "./MobileManagerNav.module.css";
import sharedClasses from "../ManagerNav.module.css";
import { Dialog, NavigationMenu, ScrollArea, VisuallyHidden } from "radix-ui";
import { MenuGroup } from "../ManagerNavItems";
import ManagerNavContext from "../../../store/manager-nav-context";
import MobileManagerNavGroups from "./MobileManagerNavGroups";
import MobileManagerNavHeader from "./MobileManagerNavHeader";
import MobileManagerNavItems from "./MobileManagerNavItems";
import useMobileManagerNavDrag from "../../../hooks/useMobileManagerNavDrag";

interface MobileManagerNavProps {
  menuGroups: MenuGroup[];
}

const MobileManagerNav: React.FC<MobileManagerNavProps> = ({ menuGroups }) => {
  const { menuId, expanded, setExpanded, currentGroupId } =
    useContext(ManagerNavContext);

  const { navRef, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } =
    useMobileManagerNavDrag({ onClose: () => setExpanded(false) });

  return (
    <Dialog.Root open={expanded} onOpenChange={setExpanded}>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.backdrop} />
        <Dialog.Content
          ref={navRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
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
                  <MobileManagerNavItems
                    menuGroups={menuGroups}
                    data-state={currentGroupId ? "open" : "closed"}
                    {...(!currentGroupId && { inert: "", tabIndex: -1 })}
                  />
                  <MobileManagerNavGroups
                    menuGroups={menuGroups}
                    data-state={!currentGroupId ? "open" : "closed"}
                    {...(currentGroupId && { inert: "", tabIndex: -1 })}
                  />
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
