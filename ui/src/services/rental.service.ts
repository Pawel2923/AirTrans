import http from "../http-common";

class RentalService { 
  getAll(page = 1, limit = 10) {
    return http.get(`/rent?page=${page}&limit=${limit}`) 
      .then(response => {
        
        return response.data;
      });
  }
}

export default new RentalService(); 
