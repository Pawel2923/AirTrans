import { ParkingReservations } from "../assets/Data";
import http from "../http-common";

class ParkingService {
	getAllParking(page = 1, limit = -1) {
		return http
			.get(`/parking?page=${page}&limit=${limit}`)
			.then((response) => {
				return response.data;
			});
	}
	createParking(parkingData: ParkingReservations) {
		return http.post("/parking", parkingData,  { withCredentials: true });
	}


	delete = (id: number) => {
		return http.delete(`/parking/${id}`,  { withCredentials: true });
	};
	getById = (pid: number) => {
		return http.get(`/parking/${pid}`);
	};
	updateParking = (parking: ParkingReservations) => {
		return http.put(`/parking/${parking.pid}`, parking,  { withCredentials: true });
	};
}

export default new ParkingService();
