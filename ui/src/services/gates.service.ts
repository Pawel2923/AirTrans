import http from "../http-common";
import { Gates } from "../assets/Data";

class GatesService {
  get = (page: number = 1,limit?:number) => {
    return http.get(`/bramki?page=${page}&limit=${limit}`);
  };
  create = (data: Gates) => {
    return http.post("/bramki", data, { withCredentials: true });
  };
  delete = (id: number) => {
    return http.delete(`/bramki/${id}`, { withCredentials: true });
  };
  updateG = (data: Gates) => {
    return http.put(`/bramki/${data.id}`, data, { withCredentials: true });
  };
  getById = (id: number) => {
    return http.get(`/bramki/${id}`);
  };
}

export default new GatesService();
