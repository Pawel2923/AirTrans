import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Flights } from "../../assets/Data";
import flightService from "../../services/flight.service";
import { useContext, useState } from "react";
import useErrorHandler from "../useErrorHandler";
import ToastModalContext from "../../store/toast-modal-context";

export const useCreateFlight = (
  setRefreshData?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();
  const { createToast } = useContext(ToastModalContext);
  const [message, setMessage] = useState<string>("");
  const { handleError } = useErrorHandler();

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
    createFlight,
  };
};
