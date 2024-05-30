import { useCallback, useState } from "react";
import flightService from "../../services/flight.service";
import useErrorHandler from "../useErrorHandler";
import { Departures } from "../../assets/Data";
import { arrDepDataParser } from "../../utils/data-parser";

const useGetFlight = () => {
	const { handleError } = useErrorHandler();
    const [flightIds, setFlightIds] = useState<string[]>([]);
	const [departureData, setDepartureData] = useState<Departures[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getDepartures = useCallback((page: number, limit = 5) => {
		flightService
			.getByArrivalOrDeparture(page, limit)
			.then((response) => {
				if (response.status === 200) {
					const departures = response.data.data;

					if (departures.length > 0) {
						const parsedData = arrDepDataParser(departures);
						setDepartureData(parsedData);
					}
				}
			})
			.catch((error) => {
				handleError({ error });
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [handleError]);

	const getFlightIds = useCallback(() => {
		flightService
			.getIds()
			.then((response) => {
				if (response.status === 200) {
					setFlightIds(response.data.data);
				}
			})
			.catch((error) => {
                handleError({ error });
            })
			.finally(() => {
				setIsLoading(false);
			});
	}, [handleError]);

	return {
		departureData,
		flightIds,
		getDepartures,
		getFlightIds,
		isLoading,
	};
};

export default useGetFlight;
