import { Runways, Taxiways, Terminals } from "../assets/Data";
import http from "../http-common";

class AirfieldService {
	getAll = (page: number = 1, limit?: number) => {
		let url = `/airfield?page=${page}`;

		if (limit) {
			url += `&limit=${limit}`;
		}

		return http.get(url);
	};

	getTable = (tableName: string, page: number = 1, limit?: number) => {
		let url = `/airfield/${tableName}?page=${page}`;

		if (limit) {
			url += `&limit=${limit}`;
		}

		return http.get(url);
	};

	update = (
		tableName: string,
		id: string,
		data: Runways | Taxiways | Terminals
	) => {
		return http.put(`/airfield/${id}`, { tableName, data });
	};
}

export default new AirfieldService();
