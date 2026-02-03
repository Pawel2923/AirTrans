import { createContext } from "react";

interface ManagerNavContextProps {
    menuId: string;
    expanded: boolean;
    setExpanded: (next: boolean | ((prev: boolean) => boolean)) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    currentGroupId: string | null;
    setCurrentGroupId: (id: string | null) => void;
}

const ManagerNavContext = createContext({} as ManagerNavContextProps);

export default ManagerNavContext;
