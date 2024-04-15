import http from "../http-common";

interface Client {
    email: string;
    password: string;
    
}

class LoginService {
    // Metoda do tworzenia użytkownika lub logowania
    create = (data: Client) => {
      return http.post("/fetch_client", data);
    }
  
    
    createPassword = (data: Client) => {
      return http.post("/password", data);
    }
  
    
    findByLogin = (email: string) => {
      return http.get(`/fetch_client?email=${email}`);
    }
  }

export default new LoginService();