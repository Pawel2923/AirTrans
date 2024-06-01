import React, { ReactNode } from "react";
import classes from "./Modal.module.css";
import Modal from "./Modal";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  children?: ReactNode;
  confirmBtnText?: string;
  confirmBtnClass?: string;
  modalContentStyle?: React.CSSProperties;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmBtnText,
  confirmBtnClass,
  modalContentStyle,
}: ConfirmModalProps) => {
  return (
    <Modal onClose={onClose} modalContentStyle={modalContentStyle}>
      <div>
        <h2>{title}</h2>
        {message ? <p>{message}</p> : children}
        <div className={classes["modal-buttons"]}>
          <button className="btn" onClick={onClose}>
            Anuluj
          </button>
          <button
            className={`btn ${confirmBtnClass ? confirmBtnClass : "btn-danger"}`}
            onClick={onConfirm}
          >
            {confirmBtnText || "Tak, usuń"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
