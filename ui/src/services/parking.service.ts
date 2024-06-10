import { ParkingReservations } from "../assets/Data";
import http from "../http-common";

class ParkingService {
  getAllParking=(page:number = 1, limit?: number) =>{
    return http.get(`/parking?page=${page}&limit=${limit}`);
  };
  createParking(parkingData: ParkingReservations) {
    return http.post("/parking", parkingData, { withCredentials: true });
  }

  delete = (id: number) => {
    return http.delete(`/parking/${id}`, { withCredentials: true });
  };
  getById = (id: number) => {
    return http.get(`/parking/${id}`);
  };
  updateParking = (parking: ParkingReservations) => {
    return http.put(`/parking/${parking.id}`, parking, {
      withCredentials: true,
    });
  };

  getByUserEmail = ({ page = 1, limit = 10, userEmail = "" }) => {
    return http.get(`/parking/?page=${page}&limit=${limit}&userEmail=${userEmail}`, {
      withCredentials: true,
    });
  };
}

export default new ParkingService();
