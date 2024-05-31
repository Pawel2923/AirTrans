import { Cars } from "../assets/Data";
import http from "../http-common";

class CarService {
  getAll(page = 1, limit = 10) {
    return http.get(`/cars?page=${page}&limit=${limit}`).then((response) => {
      return response.data;
    });
  }

  getOne(id: number) {
    return http
      .get(`/cars/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  getById(id: number) {
    return http.get(`/cars/${id}`);
  }

  create(carData: Cars) {
    return http.post("/cars", carData, { withCredentials: true });
  }

  update(carData: Cars) {
    return http.put(`/cars/${carData.id}`, carData, {
      withCredentials: true,
    });
  }

  delete = (id: number) => {
    return http.delete(`/cars/${id}`, { withCredentials: true });
  };
}

export default new CarService();
