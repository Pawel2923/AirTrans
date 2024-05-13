import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import flightService from "../../services/flight.service";
import useModal from "../useModal";
import useToast from "../useToast";
import useErrorHandler from "../useErrorHandler";

// Custom hook for deleting a flight
export const useDeleteFlight = (
	setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>,
	useAlert?: boolean
) => {
	const navigate = useNavigate();
	const { toast, createToast } = useToast();
	const { alert, createAlertModal } = useModal();
	const { errorAlert, errorToast, handleError } = useErrorHandler();

	const deleteFlight = (deleteId: string) => {
		flightService
			.delete(deleteId)
			.then((response) => {
				if (response.status === 204) {
					if (useAlert) {
						// Show alert modal if useAlert is true
						createAlertModal(
							"Lot został usunięty",
							"Usunięto lot",
							() => navigate("/zarzadzanie/harmonogram")
						);
					} else {
						// Show success toast if useAlert is false
						createToast(
							"Lot został usunięty",
							"primary",
							faCircleCheck
						);
					}
					setRefreshData && setRefreshData((prev) => !prev);
				}
			})
			.catch((error) => {
				handleError(error);
			});
	};

	return {
		alert,
		toast,
		errorAlert,
		errorToast,
		deleteFlight,
	};
};
