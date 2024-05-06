import { createContext } from "react";

export interface User {
    exp: number;
    iat: number;
    id: string;
}

interface AuthContextProps {
    auth: boolean;
    user: string | User | null | undefined;
}

const AuthContext = createContext({} as AuthContextProps)

export default AuthContext;