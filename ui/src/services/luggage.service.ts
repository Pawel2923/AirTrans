import { Luggage } from "../assets/Data";
import http from "../http-common";

class LuggageService {
  getAll({ page = 1, limit = 10, userEmail = "" }) {
    return http.get(
      `/luggage/?page=${page}&limit=${limit}&userEmail=${userEmail}`,
      { withCredentials: true }
    );
  }

  create(data: Luggage) {
    return http.post("/luggage", data, { withCredentials: true });
  }

  update(id: number, data: Luggage) {
    return http.put(`/luggage/${id}`, data, { withCredentials: true });
  }

  delete(id: number) {
    return http.delete(`/luggage/${id}`, { withCredentials: true });
  }
}

export default new LuggageService();
