import http from "../http-common";

class OfferService {
  getData = () => {
    return http.get("/offer");
  };
}

export default new OfferService();
