import {CarRental} from "../assets/Data";
import http from "../http-common";


class RentalService { 
  getAll(page = 1, limit = 10) {
    return http.get(`/rent?page=${page}&limit=${limit}`) 
      .then(response => {
        
        return response.data;
      });
  }
  create(carRental: CarRental) {
    return http.post("/rentals", carRental)
      .then(response => {
        console.log("Rental created:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error creating rental:", error);
        throw error;
      });
  }
  
}


export default new RentalService(); 
