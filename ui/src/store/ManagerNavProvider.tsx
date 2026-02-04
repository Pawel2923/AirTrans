import { useState } from "react";
import ManagerNavContext from "./manager-nav-context";

interface ManagerNavProviderProps {
  children: React.ReactNode;
}

const ManagerNavProvider: React.ComponentType<ManagerNavProviderProps> = ({
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const menuId = "manager-navigation-menu";

  const setExpandedSafe = (next: boolean | ((prev: boolean) => boolean)) => {
    setExpanded((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      if (!resolved) {
        setCurrentGroupId(null);
      }

      return resolved;
    });
  };

  const setCurrentGroupIdSafe = (id: string | null) => {
    setCurrentGroupId(expanded ? id : null);
  };

  return (
    <ManagerNavContext.Provider
      value={{
        menuId,
        expanded,
        setExpanded: setExpandedSafe,
        title,
        setTitle,
        currentGroupId,
        setCurrentGroupId: setCurrentGroupIdSafe,
      }}
    >
      {children}
    </ManagerNavContext.Provider>
  );
};

export default ManagerNavProvider;
