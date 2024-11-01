import React from "react";
import Modal from "./Modal";
import classes from "./Modal.module.css";

interface AlertModalProps {
  message: string;
  onClose: () => void;
  title?: string;
}

export interface Alert {
  message: string;
  title?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  message,
  onClose,
  title = "Uwaga!",
}: AlertModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={classes["modal-buttons"]}>
          <button className="btn btn-primary" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
