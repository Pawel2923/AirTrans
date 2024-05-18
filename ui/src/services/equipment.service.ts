import http from "../http-common";
import { Equipment } from "../assets/Data";

class EquipmentService {
    getaAll = (page: number = 1) => {
        return http.get(`/sprzet?page=${page}`);
    }
    createEquipment = (data: Equipment) => {
        return http.post("/sprzet", data);
    }
}


export default new EquipmentService();