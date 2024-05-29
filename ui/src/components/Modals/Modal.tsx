import React from "react";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }: ModalProps) => {
	return (
		<div className={classes["modal"]}>
			<div className={classes["modal-content"]}>
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
