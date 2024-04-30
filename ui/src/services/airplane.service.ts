import http from "../http-common";
import { Airplane, Filter, Sort } from "../assets/Data";

class AirplaneService {
    getAll = (page: number = 1, limit?: number, filter?: Filter[], sort?: Sort) => {
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
    };

    getById = (serial_no: string) => {
        return http.get(`/airplane?filter=[{"by":"serial_no","value":"${serial_no}"}]`);
    };
    
    create = (data: Airplane) => {
        return http.post("/airplane", data);
    };

    update = (serial_no: string, data: Airplane) => {
        return http.put(`/airplane/${serial_no}`, data);
    };

    delete = (serial_no: string) => {
        return http.delete(`/airplane/${serial_no}`);
    };
}

export default new AirplaneService();