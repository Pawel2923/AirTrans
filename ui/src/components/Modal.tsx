import React from "react";
import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
	open,
	onClose,
	children,
}: ModalProps) => {
	return (
		<div
			className={classes["modal"]}
			style={{ display: open ? "block" : "none" }}
		>
			<div className={classes["modal-content"]}>
				<span className={classes["close"]} onClick={onClose}>
					<FontAwesomeIcon icon={faTimes} />
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
