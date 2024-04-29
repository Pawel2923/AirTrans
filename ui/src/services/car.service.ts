import { Car } from "../assets/Data";
import http from "../http-common";

class CarService {
  getAll(page = 1, limit = 10) {
    return http.get(`/cars?page=${page}&limit=${limit}`)
      .then(response => {
       
        return response.data;
      });
  }

 
  create(carData:Car) {
    return http.post("/cars", carData)
      .then(response => {
        console.log("Car created:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error creating car:", error);
        throw error;
      });

  }

  update(carData:Car) {
    return http.put(`/cars/${carData.Id}`, carData)
      .then(response => {
        console.log("Car updated:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error updating car:", error);
        throw error;
      });

  }

  delete(id:number) {
    return http.delete(`/cars/${id}`)
      .then(response => {
        console.log("Car deleted:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error deleting car:", error);
        throw error;
      });

  }
}




export default new CarService();