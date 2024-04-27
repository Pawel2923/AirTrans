import http from "../http-common";

class CarService {
  getAll(page = 1, limit = 10) {
    return http.get(`/cars?page=${page}&limit=${limit}`)
      .then(response => {
        console.log(response.data); 
        return response.data;
      });
  }
}

export default new CarService();