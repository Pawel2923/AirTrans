import { useCallback, useState } from "react";
import AlertModal from "../components/Modals/AlertModal";
import ConfirmModal from "../components/Modals/ConfirmModal";
import { AlertModalProps, ConfirmModalProps } from "../assets/Data";

const useModal = () => {
  const [alert, setAlert] = useState<JSX.Element | null>(null);
  const [confirm, setConfirm] = useState<JSX.Element | null>(null);

  const createAlertModal = useCallback(
    ({ message, title, onClose }: AlertModalProps) => {
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
    },
    []
  );

  const createConfirmModal = useCallback(
    ({
      message,
      title,
      onConfirm,
      onClose,
      confirmBtnText,
      confirmBtnClass,
    }: ConfirmModalProps) => {
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
          confirmBtnText={confirmBtnText}
          confirmBtnClass={confirmBtnClass}
        />
      ));
    },
    []
  );

  return { alert, confirm, createAlertModal, createConfirmModal } as const;
};

export default useModal;
