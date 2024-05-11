import { createContext } from "react";

export interface User {
    exp: number;
    iat: number;
    email: string;
    role: string;
}

interface AuthContextProps {
    auth: boolean;
    user: string | User | null | undefined;
}

const AuthContext = createContext({} as AuthContextProps)

export default AuthContext;