import { createContext } from "react";
import { ToastProps, AlertModalProps, ConfirmModalProps } from "../assets/Data";

interface ToastModalContextProps {
  toast: JSX.Element | null;
  createToast: (props: ToastProps) => void;
  alert: JSX.Element | null;
  createAlertModal: (props: AlertModalProps) => void;
  confirm: JSX.Element | null;
  createConfirmModal: (props: ConfirmModalProps) => void;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToastModalContext = createContext({} as ToastModalContextProps);

export default ToastModalContext;
