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
		return http.post("/parking", parkingData);
	}

	delete = (id: number) => {
		return http.delete(`/parking/${id}`);
	};
	getById = (id: number) => {
		return http.get(`/parking/${id}`);
	};
	updateParking = (parking: ParkingReservations) => {
		return http.put(`/parking/${parking.pid}`, parking);
	};
}

export default new ParkingService();
