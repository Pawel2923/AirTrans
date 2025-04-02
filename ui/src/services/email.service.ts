import http from "../http-common";
import { Email } from "../assets/Data.d";

class EmailService {
  sendEmail(emailData: Email) {
    return http.post("/email", emailData);
  }
}

export default new EmailService();
