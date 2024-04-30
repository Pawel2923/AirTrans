import http from "../http-common";
import { Flight, Filter, Sort } from "../assets/Data";

class FlightService {
    getAll = (page: number = 1, limit?: number, filter?: Filter[], sort?: Sort) => {
        let url = `/flights?page=${page}`;

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

    getByArrivalOrDeparture = (page: number = 1, limit: number = -1) => {
        if (limit > 0) {
            return http.get(`/flights/?isarrdep=true&page=${page}&limit=${limit}`);
        }
        else {
            return http.get(`/flights/?isarrdep=true&page=${page}`);
        }
    }

    getById = (id: string) => {
        return http.get(`/flights?filter=[{"by":"id","value":"${id}"}]`);
    }

    create = (data: Flight) => {
        return http.post("/flights", data);
    }

    update = (id: string, data: Flight) => {
        return http.put(`/flights/${id}`, data);
    }

    delete = (id: string) => {
        return http.delete(`/flights/${id}`);
    }
}

export default new FlightService();