import { useCallback } from "react";
import useErrorHandler from "../useErrorHandler";
import ticketsService from "../../services/tickets.service";

const useUpdateTickets = () => {
	const { handleError } = useErrorHandler();

	const updateStatus = useCallback(
		(id: number, status: string) =>
			new Promise((resolve) => {
				ticketsService
					.updateStatus(id, status)
					.then((response) => {
						if (response.status === 200) {
							resolve(response.data.data);
						}
					})
					.catch((error) => {
						handleError({ error });
					});
			}),
		[handleError]
	);

	return {
		updateStatus,
	} as const;
};

export default useUpdateTickets;
