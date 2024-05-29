import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Flights } from "../../assets/Data";
import flightService from "../../services/flight.service";
import useErrorHandler from "../useErrorHandler";
import { useContext } from "react";
import ToastModalContext from "../../store/toast-modal-context";

const useUpdateFlight = (
	setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const navigate = useNavigate();
	const { createToast } = useContext(ToastModalContext);
	const { handleError } = useErrorHandler();

	const updateFlight = (id: string, data: Flights) => {
		flightService
			.update(id, data)
			.then((response) => {
				if (response.status === 200) {
					// Show success toast with an action to navigate to the updated flight
					createToast({
						message: "Lot został zaktualizowany",
						type: "primary",
						icon: faCircleCheck,
						action: {
							label: "Zobacz",
							onClick: () => {
								navigate(`/zarzadzanie/harmonogram/${id}`);
							},
						},
					});
					setRefreshData && setRefreshData((prev) => !prev);
				}
			})
			.catch((error) => {
				handleError({ error });
			});
	};

	return {
		updateFlight,
	};
};

export default useUpdateFlight;
