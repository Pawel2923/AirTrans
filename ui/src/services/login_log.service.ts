import http from "../http-common";

class LoginLogService {
  get = (page: number = 1, limit?: number) => {
    return http.get(`/login_log?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  };
}

export default new LoginLogService();
