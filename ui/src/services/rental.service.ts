
import {CarRental} from "../assets/Data";
import http from "../http-common";


class RentalService { 
  getAll(page = 1, limit = 10) {
    return http.get(`/rent?page=${page}&limit=${limit}`) 
      .then(response => {
        
        return response.data;
      });
  }
  createRental(carRental: CarRental) {
    return http.post("/rent", carRental)
  }

  removeRent(id: number) {
    return http.delete(`/rent/${id}`)
  }

  getById(id: number) {
    return http.get(`/rent/${id}`)
  }
 
  updateRent(carRental: CarRental) {
    return http.put(`/rent/${carRental.Id}`, carRental);
  }
}


export default new RentalService(); 
