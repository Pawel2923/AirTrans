import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext, { User } from "./auth-context";
import authenticationService from "../services/authentication.service";
import { AxiosResponse } from "axios";

interface AuthResponse {
	auth: boolean;
	user: string | User | null | undefined;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.ComponentType<AuthProviderProps> = ({
	children,
}: AuthProviderProps) => {
	const navigate = useNavigate();
	const [auth, setAuth] = useState<boolean>(false);
	const [user, setUser] = useState<string | User | null | undefined>(
		undefined
	);

	useEffect(() => {
		authenticationService
			.authenticate()
			.then((response: AxiosResponse<AuthResponse>) => {
				if (response.status === 200) {
					setAuth(response.data.auth);
                    setUser(response.data.user);
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 401) {
						navigate("/logowanie");
					} else if (error.response.status === 500) {
						navigate("/");
						console.error("Internal server error");
					}
				}
			});
	}, [navigate]);

	return (
		<AuthContext.Provider value={{ auth, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
