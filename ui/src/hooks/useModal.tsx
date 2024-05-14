import { useCallback, useState } from "react";
import AlertModal from "../components/Modals/AlertModal";
import ConfirmModal from "../components/Modals/ConfirmModal";

const useModal = () => {
	const [alert, setAlert] = useState<typeof AlertModal | null>(null);
	const [confirm, setConfirm] = useState<typeof ConfirmModal | null>(null);

	const createAlertModal = useCallback((
		message: string,
		title?: string,
		onClose?: () => void
	) => {
		setAlert(() => (
			<AlertModal
				title={title || "Uwaga!"}
				message={message}
				onClose={() => {
					onClose && onClose();
					setAlert(null);
				}}
			/>
		));
	}, []);

	const createConfirmModal = useCallback((
		message: string,
		title?: string,
		onConfirm?: () => void,
		onClose?: () => void
	) => {
		setConfirm(() => (
			<ConfirmModal
				title={title || "Potwierdzenie"}
				message={message}
				onConfirm={() => {
					onConfirm && onConfirm();
					setConfirm(null);
				}}
				onClose={() => {
					onClose && onClose();
					setConfirm(null);
				}}
			/>
		));
	}, []);

	return { alert, confirm, createAlertModal, createConfirmModal } as const;
};

export default useModal;
