import { Filter, Sort, Users } from "../assets/Data";
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

		return http.get(url);
	};

    getById = (uid: number) => {
		return http.get(`/users?filter=[{"by":"uid","value":"${uid}"}]`);
	};

    update = (uid: number, data: Users) => {
        return http.put(`/users/${uid}`, data);
    }

    delete = (uid: number) => {
        return http.delete(`/users/${uid}`);
    }
}

export default new UsersService();