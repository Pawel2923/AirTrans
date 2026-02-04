import http from "../http-common";
import { FlightData, Filter, Sort } from "../assets/Data";

interface FlightServiceGetAllParams {
  page: number;
  limit?: number;
  filter?: Filter[];
  sort?: Sort;
  isarrdep?: boolean;
}

class FlightDataService {
  getAll = ({ page = 1, limit, filter, sort }: FlightServiceGetAllParams) => {
    let url = `/flight_data?page=${page}`;

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

  getByFlightId = (flightId: string) => {
    return http.get(
      `/flight_data?filter=[{"by":"Flight_id","value":"${flightId}"}]`
    );
  };

  create = (data: FlightData) => {
    return http.post("/flight_data", data, {
      withCredentials: true,
    });
  };

  update = (id: number, data: FlightData) => {
    return http.put(`/flight_data/${id}`, data, {
      withCredentials: true,
    });
  };
}

export default new FlightDataService();
