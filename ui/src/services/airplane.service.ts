import http from "../http-common";

interface Airplane {
    code: string;
    model: string;
    passengerCapacity: number;
}

class AirplaneService {
    create = (data: Airplane) => {
        return http.post("/airplanes", data);
    };

    findaAll = () => { 
        return http.get("/airplanes");
    };

    findOne = (id: string) => {
        return http.get(`/airplanes/${id}`);
    };

    update = (id: string, data: Airplane) => {
        return http.put(`/airplanes/${id}`, data);
    };

    delete = (id: string) => {
        return http.delete(`/airplanes/${id}`);
    };
}

export default new AirplaneService();