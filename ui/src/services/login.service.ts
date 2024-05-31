import http from "../http-common";

interface Client {
  email: string;
  password: string;
}

class LoginService {
  create = (data: Client) => {
    return http.post("/fetch_client", data, { withCredentials: true });
  };

  createPassword = (data: Client) => {
    return http.post("/password", data, { withCredentials: true });
  };
}

export default new LoginService();
