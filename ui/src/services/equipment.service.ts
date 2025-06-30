import http from "../http-common";
import { Equipment } from "../assets/Data";

class EquipmentService {
  getaAll = (page: number = 1,limit?:number) => {
    return http.get(`/sprzet?page=${page}&limit=${limit}`);
  };
  createEquipment = (data: Equipment) => {
    return http.post("/sprzet", data, { withCredentials: true });
  };
  updateEquipment = (data: Equipment) => {
    return http.put(`/sprzet/${data.serial_no}`, data, { withCredentials: true});
  };
  getById(serial_no: string) {
    return http.get(`/sprzet/${serial_no}`);
  }
  deleteEquipment = (serial_no: string) => {
    return http.delete(`/sprzet/${serial_no}`, { withCredentials: true });
  };
}

export default new EquipmentService();
