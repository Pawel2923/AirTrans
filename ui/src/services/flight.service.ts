import http from "../http-common";

class FlightService {
    getAll = (page: number = 1) => {
        return http.get(`/flights?page=${page}`);
    }

    getByArrivalOrDeparture = () => {
        return http.get("/flights?isarrdep=true");
    }
}

export default new FlightService();