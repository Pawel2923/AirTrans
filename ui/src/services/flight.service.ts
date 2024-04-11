import http from "../http-common";

class FlightService {
    getAll = () => {
        return http.get("/flights");
    }
}

export default new FlightService();