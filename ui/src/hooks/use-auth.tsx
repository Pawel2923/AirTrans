import { useNavigate } from "react-router-dom";
import authenticationService from "../services/authentication.service";

const useAuth = () => {
    const navigate = useNavigate();

    const logout = () => {
        authenticationService
		.logout()
		.then((response) => {
			if (response.status === 200) {
				navigate("/");
			}
		})
		.catch((error) => {
			if (error.response.status === 401) {
				console.error("Unauthorized");
			} else if (error.response.status === 500) {
				console.error("Server error");
			}
		});
    };

    return {
        logout,
    };
};

export default useAuth;