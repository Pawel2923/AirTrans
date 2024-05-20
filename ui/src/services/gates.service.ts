import http from "../http-common";
import { Gates } from "../assets/Data";

class GatesService{
    get=(page: number = 1)=>{
        return http.get(`/bramki?page=${page}`);
    }
    create=(data: Gates)=>{
        return http.post("/bramki",data);
    }
    delete=(id: number)=>{
        return http.delete(`/bramki/${id}`);
    }
    updateG=(data: Gates)=>{
        return http.put(`/bramki/${data.id}`,data);
    }
    getById=(id: number)=>{
        return http.get(`/bramki/${id}`);
    }
}

export default new GatesService();