import http from "../http-common";
import { Flights, Filter, Sort } from "../assets/Data";

class FlightService {
	getAll = (
		page: number = 1,
		limit?: number,
		filter?: Filter[],
		sort?: Sort
	) => {
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
	};

	getByArrivalOrDeparture = (page: number = 1, limit: number = -1) => {
		if (limit > 0) {
			return http.get(
				`/flights/?isarrdep=true&page=${page}&limit=${limit}`
			);
		} else {
			return http.get(`/flights/?isarrdep=true&page=${page}`);
		}
	};

	getById = (id: string) => {
		return http.get(`/flights?filter=[{"by":"id","value":"${id}"}]`);
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
