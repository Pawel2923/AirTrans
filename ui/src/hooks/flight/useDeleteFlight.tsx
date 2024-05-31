import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import flightService from "../../services/flight.service";
import useErrorHandler from "../useErrorHandler";
import { useContext } from "react";
import ToastModalContext from "../../store/toast-modal-context";

// Custom hook for deleting a flight
export const useDeleteFlight = (
  setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>,
  useAlert?: boolean
) => {
  const navigate = useNavigate();
  const { createAlertModal, createToast } = useContext(ToastModalContext);
  const { handleError } = useErrorHandler();

  const deleteFlight = (deleteId: string) => {
    flightService
      .delete(deleteId)
      .then((response) => {
        if (response.status === 204) {
          if (useAlert) {
            // Show alert modal if useAlert is true
            createAlertModal({
              message: "Lot został usunięty",
              title: "Usunięto lot",
              onClose: () => navigate("/zarzadzanie/harmonogram"),
            });
          } else {
            // Show success toast if useAlert is false
            createToast({
              message: "Lot został usunięty",
              type: "primary",
              icon: faCircleCheck,
            });
          }
          setRefreshData && setRefreshData((prev) => !prev);
        }
      })
      .catch((error) => {
        handleError({ error });
      });
  };

  return {
    deleteFlight,
  };
};
