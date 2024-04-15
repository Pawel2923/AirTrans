import http from "../http-common";

class AnnouncementService {
    getAll = (page: number = 1) => {
        return http.get(`/announcements?page=${page}`);
    }
}

export default new AnnouncementService();