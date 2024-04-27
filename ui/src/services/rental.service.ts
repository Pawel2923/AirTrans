import http from "../http-common";

class RentalService { 
  getAll(page = 1, limit = 10) {
    return http.get(`/rentals?page=${page}&limit=${limit}`) 
      .then(response => {
        console.log(response.data); 
        return response.data;
      });
  }
}

export default new RentalService(); 
