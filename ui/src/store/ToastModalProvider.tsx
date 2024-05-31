import { useState } from "react";
import useModal from "../hooks/useModal";
import useToast from "../hooks/useToast";
import ToastModalContext from "./toast-modal-context";

interface ToastModalProviderProps {
  children: React.ReactNode;
}

const ToastModalProvider: React.ComponentType<ToastModalProviderProps> = ({
  children,
}: ToastModalProviderProps) => {
  const { alert, confirm, createAlertModal, createConfirmModal } = useModal();
  const { toast, createToast } = useToast();
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <ToastModalContext.Provider
      value={{
        toast,
        alert,
        confirm,
        createAlertModal,
        createConfirmModal,
        createToast,
        isError,
        setIsError,
      }}
    >
      {children}
    </ToastModalContext.Provider>
  );
};

export default ToastModalProvider;
