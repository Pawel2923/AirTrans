import React, { CSSProperties, useEffect } from "react";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  modalContentStyle?: CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  modalContentStyle,
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={classes["modal"]}>
      <div className={classes["modal-content"]} style={modalContentStyle}>
        <span className={classes["close"]} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        {children}
      </div>
      <div className={classes["modal-backdrop"]} onClick={onClose}></div>
    </div>
  );
};

export default Modal;
