import http from "../http-common";

interface Client {
    email: string;
    password: string;
    
}

class LoginService {
    
    create = (data: Client) => {
      return http.post("/fetch_client", data);
    }
  
    
    createPassword = (data: Client) => {
      return http.post("/password", data);
    }
  
   
  }

export default new LoginService();