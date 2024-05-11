import { createContext } from "react";
import { User } from "../assets/Data";

interface AuthContextProps {
    auth: boolean;
    user: User | undefined;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    checkAuth: () => void;
    logout: () => void;
}

const AuthContext = createContext({} as AuthContextProps)

export default AuthContext;