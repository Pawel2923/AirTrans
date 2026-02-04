import http from "../http-common";
import { Announcements } from "../assets/Data";

class AnnouncementService {
  get = (page: number = 1, limit?: number) => {
    return http.get(`/announcements?page=${page}&limit=${limit}`);
  };
  getk = (page: number = 1) => {
    return http.get(`/announcements?page=${page}`);
  };

  create = (data: Announcements) => {
    return http.post("/announcements", data, { withCredentials: true });
  };

  update = (data: Announcements) => {
    return http.put(`/announcements/${data.id}`, data, {
      withCredentials: true,
    });
  };
  getById(id: number) {
    return http.get(`/announcements/${id}`);
  }

  delete = (id: number) => {
    return http.delete(`/announcements/${id}`, { withCredentials: true });
  };
}

export default new AnnouncementService();
