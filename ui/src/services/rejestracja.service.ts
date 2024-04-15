import http from "../http-common";

interface Client {
    Email: string;
    Password: string;
    First_name: string;
    Last_name: string;
    Login: string;
}

class RejestracjaService {
    create = (data: Client) => {
        return http.post("/register", data);
    }
}

export default new RejestracjaService();