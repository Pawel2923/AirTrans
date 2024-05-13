import http from "../http-common";
import { Announcements } from "../assets/Data";

class AnnouncementService {
    get = (page: number = 1) => {
        return http.get(`/announcements?page=${page}`);
    }

    create = (data: Announcements) => {
        return http.post("/announcements", data);
    }

    update = (id: number, data: Announcements) => {
        return http.put(`/announcements/${id}`, data);
    }


    delete = (id: number) => {
        return http.delete(`/announcements/${id}`);
    }
}



export default new AnnouncementService();