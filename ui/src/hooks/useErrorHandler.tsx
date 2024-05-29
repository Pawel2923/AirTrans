import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Err } from "../assets/Data";
import { useCallback, useContext } from "react";
import ToastModalContext from "../store/toast-modal-context";

interface HandleErrorProps {
	error: Err;
	onModalClose?: () => void;
	onToastAction?: () => void;
}

const useErrorHandler = () => {
	const { createAlertModal, createToast, setIsError } = useContext(ToastModalContext);

	const handleError = useCallback(
		({ error, onModalClose, onToastAction }: HandleErrorProps) => {
			if (!error.response) {
				createAlertModal({
					message: "Wystąpił błąd podczas pobierania informacji",
					onClose: onModalClose,
				});
				return;
			}

			switch (error.response.status) {
				case 400:
					createToast({
						message:
							error.response.data.message || "Nieprawidłowe dane",
						type: "danger",
						icon: faCircleExclamation,
						action: {
							label: "Spróbuj ponownie",
							onClick: () => onToastAction && onToastAction(),
						},
						timeout: 10000,
					});
					break;
				case 401:
				case 403:
					createAlertModal({
						message:
							error.response.status === 401
								? "Brak dostępu"
								: "Brak uprawnień",
						onClose: onModalClose,
					});
					break;
				case 404:
					createToast({
						message:
							error.response.data.message ||
							"Nie znaleziono informacji",
						type: "danger",
						icon: faCircleExclamation,
						action: {
							label: "Spróbuj ponownie",
							onClick: () => onToastAction && onToastAction(),
						},
					});
					break;
				case 409:
					createToast({
						message:
							error.response.data.message ||
							"Nie można wykonać operacji",
						type: "danger",
						icon: faCircleExclamation,
						action: {
							label: "Spróbuj ponownie",
							onClick: () => onToastAction && onToastAction(),
						},
					});
					break;
				default:
					createAlertModal({
						message: error.response.data.message || "Wystąpił błąd",
						onClose: onModalClose,
					});
			}

			setIsError(true);
		},
		[createAlertModal, createToast, setIsError]
	);

	return { handleError } as const;
};

export default useErrorHandler;
