import http from "../http-common";

class CarService {
  getAll(page: number = 1) {
    return http.get(`/cars?page=${page}`);
  }
}

export default new CarService();