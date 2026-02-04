import http from "../http-common";
import { Flights, Filter, Sort } from "../assets/Data";

interface FlightServiceGetAllParams {
  page: number;
  limit?: number;
  filter?: Filter[];
  sort?: Sort;
  isarrdep?: boolean;
}

interface FlightServiceGetByTermParams {
  searchTerm: string;
  page: number;
  limit?: number;
  filter?: Filter[];
  sort?: Sort;
}

class FlightService {
  getAll = ({
    page = 1,
    limit,
    filter,
    sort,
    isarrdep,
  }: FlightServiceGetAllParams) => {
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

    if (isarrdep) {
      url += `&isarrdep=${isarrdep}`;
    }

    return http.get(url);
  };

  getByTerm = ({
    searchTerm,
    page = 1,
    limit,
    filter,
    sort,
  }: FlightServiceGetByTermParams) => {
    let url = `/flights/${searchTerm}?page=${page}`;

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

  getById = (id: string) => {
    return http.get(`/flights?filter=[{"by":"id","value":"${id}"}]`);
  };

  getData = (column: string) => {
    return http.get("/flights/data?column=" + column);
  };

  create = (data: Flights) => {
    return http.post("/flights", data, {
      withCredentials: true,
    });
  };

  update = (id: string, data: Flights) => {
    return http.put(`/flights/${id}`, data, {
      withCredentials: true,
    });
  };

  delete = (id: string) => {
    return http.delete(`/flights/${id}`, {
      withCredentials: true,
    });
  };
}

export default new FlightService();
