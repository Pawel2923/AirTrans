import http from "../http-common";
import { Airplane, Filter, Sort } from "../assets/Data";

class AirplaneService {
    getAll (page: number = 1, limit?: number, filter?: Filter[], sort?: Sort) {
        let url = `/airplane?page=${page}`;

        if (limit) {
            url += `&limit=${limit}`;
        }

        if (filter) {
            // Check if filter is valid
            filter.forEach((f) => {
                if (!f.by || !f.value) {
                    throw new Error("Invalid filter");
                }
            });

            url += `&filter=${JSON.stringify(filter)}`;
        }

        if (sort) {
            // Check if sort is valid
            if (!sort.by) {
                throw new Error("Invalid sort");
            }

            url += `&sort=${JSON.stringify(sort)}`;
        }

        return http.get(url);
    }

    getById = (id: string) => {
        return http.get(`/airplane?filter=[{"by":"id","value":"${id}"}]`);
    };
    
    create = (data: Airplane) => {
        return http.post("/airplane", data);
    };

    update = (id: string, data: Airplane) => {
        return http.put(`/airplane/${id}`, data);
    };

    delete = (id: string) => {
        return http.delete(`/airplane/${id}`);
    };
}

export default new AirplaneService();