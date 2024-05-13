import { useCallback, useState } from "react";
import flightService from "../../services/flight.service";
import useErrorHandler from "../useErrorHandler";

const useGetFlight = () => {
	const { errorAlert, errorToast, handleError } = useErrorHandler();
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
                handleError(error);
            });
	}, [handleError]);

	return {
        flightIds,
		errorAlert,
		errorToast,
		getFlightIds,
	};
};

export default useGetFlight;
