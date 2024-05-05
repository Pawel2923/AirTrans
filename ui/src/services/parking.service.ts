
import http from "../http-common";

class ParkingService {
    getAllParkings(page = 1, limit = 10) {
        return http.get(`/parking?page=${page}&limit=${limit}`)
        .then(response => {
            return response.data;
        });
    }
}


export default new ParkingService();