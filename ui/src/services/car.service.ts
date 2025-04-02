import { Cars } from "../assets/Data";
import http from "../http-common";

class CarService {
  getAll = (page: number = 1, limit?: number) => {
    return http.get(`/cars?page=${page}&limit=${limit}`);
  };
  getAllC = (page: number = 1) => {
    return http.get(`/cars?page=${page}`);
  };

  getOne = (id: number) => {
    return http.get(`/cars/${id}`);
  };

  getById = (id: number) => {
    return http.get(`/cars/${id}`);
  };

  create = (carData: Cars) => {
    return http.post("/cars", carData, { withCredentials: true });
  };

  update = (carData: Cars) => {
    return http.put(`/cars/${carData.id}`, carData, {
      withCredentials: true,
    });
  };
  updateImg = (id: number, img: string) => {
    return http.patch(`/cars/${id}/img`, { img }, { withCredentials: true });
  };
  delete = (id: number) => {
    return http.delete(`/cars/${id}`, { withCredentials: true });
  };
}

export default new CarService();
