import React, { useCallback, useState } from "react";
import AuthContext from "./auth-context";
import authenticationService from "../services/authentication.service";
import { AxiosResponse } from "axios";
import { User } from "../assets/Data";

export interface AuthResponse {
	auth: boolean;
	user: User | undefined;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.ComponentType<AuthProviderProps> = ({
	children,
}: AuthProviderProps) => {
	const [auth, setAuth] = useState<boolean>(false);
	const [user, setUser] = useState<User | undefined>(undefined);

	const refreshToken = useCallback(() => {
		authenticationService
			.refreshToken()
			.then((response: AxiosResponse<AuthResponse>) => {
				if (response.status === 200) {
					setAuth(response.data.auth);
					setUser(response.data.user);
				} else if (response.status === 401) {
					setAuth(false);
					setUser(undefined);
				} else if (response.status === 500) {
					console.error("Internal server error");
				}
			});
	}, []);

	const checkAuth = useCallback(() => {
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
						refreshToken();
					} else if (error.response.status === 500) {
						console.error("Internal server error");
					}
				}
			});
	}, [refreshToken]);

	const logout = useCallback(() => {
		authenticationService
			.logout()
			.then((response) => {
				if (response.status === 200) {
					setAuth(false);
					setUser(undefined);
				}
			})
			.catch((error) => {
				if (error.response.status === 401) {
					console.error("Unauthorized");
				} else if (error.response.status === 500) {
					console.error("Server error");
				}
			});
	}, []);

	return (
		<AuthContext.Provider
			value={{ auth, user, setAuth, setUser, checkAuth, refreshToken, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
