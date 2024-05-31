import http from "../http-common";

class ContactInfoService {
  getContactInfo = () => {
    return http.get("/contact-info");
  };
}

export default new ContactInfoService();
