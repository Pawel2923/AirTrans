import http from "../http-common";

class AirplaneService {
    create = (data) => {
        return http.post("/airplanes", data);
    };

    findaAll = () => { 
        return http.get("/airplanes");
    };

    findOne = (id) => {
        return http.get(`/airplanes/${id}`);
    };

    update = (id, data) => {
        return http.put(`/airplanes/${id}`, data);
    };

    delete = (id) => {
        return http.delete(`/airplanes/${id}`);
    };
}

export default new AirplaneService();