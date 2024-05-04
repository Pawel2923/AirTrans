
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
  
}


export default new RentalService(); 
