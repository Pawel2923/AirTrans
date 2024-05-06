import http from "../http-common";

class AuthenticationService {
	authenticate = () => {
		return http.get("/authenticate", { withCredentials: true })
	};
}

export default new AuthenticationService();
