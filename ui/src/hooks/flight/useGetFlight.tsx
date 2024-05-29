import { useCallback, useState } from "react";
import flightService from "../../services/flight.service";
import useErrorHandler from "../useErrorHandler";

const useGetFlight = () => {
	const { handleError } = useErrorHandler();
    const [flightIds, setFlightIds] = useState<string[]>([]);

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
            });
	}, [handleError]);

	return {
        flightIds,
		getFlightIds,
	};
};

export default useGetFlight;
