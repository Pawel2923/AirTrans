import { Filter, Runways, Sort, Taxiways, Terminals } from "../assets/Data";
import http from "../http-common";

class AirfieldService {
  getAll = (
    page: number = 1,
    limit?: number,
    filter?: Filter[],
    sort?: Sort
  ) => {
    let url = `/airfield?page=${page}`;

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

  getTable = (
    tableName: string,
    page: number = 1,
    id?: string,
    limit?: number,
    filter?: Filter[],
    sort?: Sort
  ) => {
    let url = `/airfield?table_name=${tableName}&page=${page}`;

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

    if (id) {
      url += `&filter=[{"by":"id","value":"${id}"}]`;
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

  update = (
    tableName: string,
    data: Runways | Taxiways | Terminals,
    id: string
  ) => {
    return http.put(`/airfield/${id}?table_name=${tableName}`, data, {
      withCredentials: true,
    });
  };
}

export default new AirfieldService();
