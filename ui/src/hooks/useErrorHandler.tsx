import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Err } from "../assets/Data";
import useToast from "./useToast";
import useModal from "./useModal";
import { useCallback } from "react";

const useErrorHandler = () => {
	const { alert: errorAlert, createAlertModal } = useModal();
	const { toast: errorToast, createToast } = useToast();

	const handleError = useCallback(
		(error: Err, onAlertClose?: () => void, onToastAction?: () => void) => {
			if (!error.response) {
				createAlertModal(
					"Wystąpił błąd podczas pobierania informacji",
					undefined,
					onAlertClose
				);
				return;
			}

			switch (error.response.status) {
				case 400:
					createToast(
						error.response.data.message || "Nieprawidłowe dane",
						"danger",
						faCircleExclamation,
						{
							label: "Spróbuj ponownie",
							onClick: () => onToastAction && onToastAction(),
						},
						10000
					);
					break;
				case 401:
				case 403:
					createAlertModal(
						error.response.status === 401
							? "Brak dostępu"
							: "Brak uprawnień",
						undefined,
						onAlertClose
					);
					break;
				case 404:
					createToast(
						error.response.data.message ||
							"Nie znaleziono informacji",
						"danger",
						faCircleExclamation,
						{
							label: "Spróbuj ponownie",
							onClick: () => onToastAction && onToastAction(),
						}
					);
					break;
				case 409:
					createToast(
						error.response.data.message ||
							"Nie można wykonać operacji",
						"danger",
						faCircleExclamation,
						{
							label: "Spróbuj ponownie",
							onClick: () => onToastAction && onToastAction(),
						}
					);
					break;
				default:
					createAlertModal(
						error.response.data.message || "Wystąpił błąd",
						undefined,
						onAlertClose
					);
			}
		},
		[createAlertModal, createToast]
	);

	return { errorToast, errorAlert, handleError };
};

export default useErrorHandler;
