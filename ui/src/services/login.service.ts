import http from "../http-common";

interface Client {
    email: string;
    password: string;
}

class LoginService {
    create = (data: Client) => {
        return http.post("/email", data);
    }
    findByLogin = (email: string) => {
        return http.get(`/fetch_client?email=${email}`);
    }
    createPassword = (data: Client) => {
        return http.post("/password", data);
    }
    findByPassword = (password: string) => {
        return http.get(`/fetch_client?password=${password}`);
    }
}

export default new LoginService();


