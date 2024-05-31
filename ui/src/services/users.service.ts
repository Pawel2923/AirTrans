import { Filter, Sort, UserInfo } from "../assets/Data";
import http from "../http-common";

class UsersService {
  getAll = (
    page: number = 1,
    limit?: number,
    filter?: Filter[],
    sort?: Sort
  ) => {
    let url = `/users?page=${page}`;

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

    return http.get(url, { withCredentials: true });
  };

  getById = (id: number) => {
    return http.get(`/users?filter=[{"by":"id","value":"${id}"}]`, {
      withCredentials: true,
    });
  };

  getByEmail = (email: string) => {
    return http.get(`/users?filter=[{"by":"email","value":"${email}"}]`, {
      withCredentials: true,
    });
  };

  getRoles = () => {
    return http.get("/users/roles", { withCredentials: true });
  };

  update = (id: number, data: UserInfo) => {
    return http.put(`/users/${id}`, data, { withCredentials: true });
  };

  updateRole = (id: number, role: string) => {
    return http.patch(`/users/${id}`, { role }, { withCredentials: true });
  };

  updateImg = (id: number, img: string) => {
    return http.patch(`/users/${id}/img`, { img }, { withCredentials: true });
  };

  delete = (id: number) => {
    return http.delete(`/users/${id}`, { withCredentials: true });
  };
}

export default new UsersService();
