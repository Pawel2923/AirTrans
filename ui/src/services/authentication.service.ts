import http from "../http-common";

class AuthenticationService {
	authenticate = () => {
		return http.get("/authenticate", { withCredentials: true })
	};

    logout = () => {
        return http.get("/logout", { withCredentials: true });
    };
}

export default new AuthenticationService();
