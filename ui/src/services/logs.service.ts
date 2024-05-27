import http from "../http-common";

class LogsService{
    get=(page: number = 1,limit?: number)=>{
        return http.get(`/logi?page=${page}&limit=${limit}`, { withCredentials: true });
    }
}

export default new LogsService();