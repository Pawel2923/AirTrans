import { Rentals } from "../assets/Data";
import http from "../http-common";

class RentalService {
  getAll(page = 1, limit = 10) {
    return http.get(`/rent?page=${page}&limit=${limit}`).then((response) => {
      return response.data;
    });
  }
  createRental(carRental: Rentals) {
    return http.post("/rent", carRental, { withCredentials: true });
  }

  removeRent(id: number) {
    return http.delete(`/rent/${id}`, { withCredentials: true });
  }

  getById(id: number) {
    return http.get(`/rent/${id}`);
  }

  updateRent(carRental: Rentals) {
    return http.put(`/rent/${carRental.id}`, carRental, {
      withCredentials: true,
    });
  }

  getByUserEmail({ page = 1, limit = 10, userEmail = "" }) {
    return http.get(
      `/rent/?page=${page}&limit=${limit}&userEmail=${userEmail}`,
      {
        withCredentials: true,
      }
    );
  }
}

export default new RentalService();
