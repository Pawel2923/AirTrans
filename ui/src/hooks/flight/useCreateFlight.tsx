import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Flights } from "../../assets/Data";
import flightService from "../../services/flight.service";
import useToast from "../useToast";
import { useState } from "react";
import useErrorHandler from "../useErrorHandler";

export const useCreateFlight = (
	setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const navigate = useNavigate();
	const { toast, createToast } = useToast();
	const [message, setMessage] = useState<string>("");
	const { errorToast, errorAlert, handleError } = useErrorHandler();

	const createFlight = (data: Flights) => {
		flightService
			.create(data)
			.then((response) => {
				if (response.status === 201) {
					const { id } = response.data.data;

					createToast({
						message: "Lot został dodany",
						type: "primary",
						icon: faCircleCheck,
						action: {
							label: "Zobacz",
							onClick: () => {
								navigate(id);
							},
						},
					});
					setMessage(response.data.message);
					setRefreshData && setRefreshData((prev) => !prev);
				}
			})
			.catch((error) => {
				handleError({ error });
			});
	};

	return {
		message,
		toast,
		errorToast,
		errorAlert,
		createFlight,
	};
};
