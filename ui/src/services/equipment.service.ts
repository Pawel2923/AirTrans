import http from "../http-common";
import { Equipment } from "../assets/Data";

class EquipmentService {
    getaAll = (page: number = 1) => {
        return http.get(`/sprzet?page=${page}`);
    }
    createEquipment = (data: Equipment) => {
        return http.post("/sprzet", data);
    }
    updateEquipment = (data: Equipment) => {
        return http.put(`/sprzet/${data.serial_no}`, data);
    }
    getById(serial_no: string){
        return http.get(`/sprzet/${serial_no}`);
    }
    deleteEquipment = (serial_no: string) => {
        return http.delete(`/sprzet/${serial_no}`);
    }
}


export default new EquipmentService();