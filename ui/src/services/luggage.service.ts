import http from "../http-common";

class LuggageService {
  getAll({ page = 1, limit = 10, userEmail = "" }) {
    return http.get(`/luggage/?page=${page}&limit=${limit}&userEmail=${userEmail}`, { withCredentials: true });
  }
}

export default new LuggageService();
