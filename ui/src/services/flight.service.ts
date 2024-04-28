import http from "../http-common";

interface Filter {
    by: string;
    operator?: string;
    value: string;
}

interface Sort {
    by: string[];
    order?: string;
}

class FlightService {
    getAll = (page: number = 1, limit: number = -1, filter: Filter[] = [], sort: Sort = { by: [""] }) => {
        if (filter.length > 0) {
            return http.get(`/flights?page=${page}&limit=${limit}&filter=${JSON.stringify(filter)}&sort=${JSON.stringify(sort)}`);
        }
        else if (sort.by.length > 0) {
            return http.get(`/flights?page=${page}&limit=${limit}&sort=${JSON.stringify(sort)}`);
        }
        else if (limit > 0){
            return http.get(`/flights?page=${page}&limit=${limit}`);
        }
        else {
            return http.get(`/flights?page=${page}`);
        }
    }

    getByArrivalOrDeparture = (page: number = 1, limit: number = -1) => {
        if (limit > 0) {
            return http.get(`/flights/?isarrdep=true&page=${page}&limit=${limit}`);
        }
        else {
            return http.get(`/flights/?isarrdep=true&page=${page}`);
        }
    }
}

export default new FlightService();