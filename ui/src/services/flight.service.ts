import http from "../http-common";

class FlightService {
    getAll = (page: number = 1) => {
        return http.get(`/flights?page=${page}`);
    }

    getArrDep = () => {
        return http.get("/flights/arrdep");
    }
}

export default new FlightService();