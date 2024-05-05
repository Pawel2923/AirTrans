import {ParkingZ} from "../assets/Data";
import http from "../http-common";

class ParkingService {
    getAllParking(page = 1, limit = 10) {
        return http.get(`/parking?page=${page}&limit=${limit}`)
        .then(response => {
            return response.data;
        });
    }
    createParking(parkingData:ParkingZ) {
        return http.post("/parking", parkingData)
    }


}
    


export default new ParkingService();