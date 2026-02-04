import http from "../http-common";

class ResetPasswdService {
  sendResetPasswdEmail(email: string) {
    return http.post("/reset-passwd", { email });
  }

  verifyToken(token: string) {
    return http.post(`/reset-passwd/${token}`);
  }

  resetPasswd(token: string, password: string) {
    return http.patch(`/reset-passwd/${token}`, { password });
  }
}

export default new ResetPasswdService();
