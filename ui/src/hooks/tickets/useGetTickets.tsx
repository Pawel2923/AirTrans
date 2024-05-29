import { useCallback, useState } from "react";
import { Filter, Sort, Tickets } from "../../assets/Data";
import useErrorHandler from "../useErrorHandler";
import ticketsService from "../../services/tickets.service";

const useGetTickets = () => {
	const [ticketsData, setTicketsData] = useState<Tickets[]>();
	const { handleError } = useErrorHandler();

	const getAllTickets = useCallback(
		(page: number = 1, limit?: number, filter?: Filter[], sort?: Sort) => {
			ticketsService
				.getAll(page, limit, filter, sort)
				.then((response) => {
					if (response.status === 200) {
						setTicketsData(response.data.data);
					}
				})
				.catch((error) => {
					handleError({ error });
				});
		},
		[handleError]
	);

	const getTicketById = useCallback(
		(id: number) => {
			ticketsService
				.getById(id)
				.then((response) => {
					if (response.status === 200) {
						setTicketsData(response.data.data);
					}
				})
				.catch((error) => {
					handleError({ error });
				});
		},
		[handleError]
	);

	const getTicketIds = useCallback(
		() =>
			new Promise((resolve) => {
				ticketsService
					.getIds()
					.then((response) => {
						if (response.status === 200) {
							resolve(response.data.data as string[]);
						}
					})
					.catch((error) => {
						handleError({ error });
					});
			}),
		[handleError]
	);

	return {
		ticketsData,
		getAllTickets,
		getTicketById,
		getTicketIds,
	} as const;
};

export default useGetTickets;
