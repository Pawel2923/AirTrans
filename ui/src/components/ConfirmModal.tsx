import React from "react";
import classes from "./ConfirmModal.module.css";
import Modal from "./Modal";

interface ConfirmModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	open,
	onClose,
	onConfirm,
	title,
	message,
}: ConfirmModalProps) => {
	return (
		<Modal open={open} onClose={onClose}>
			<div className={classes["confirm-modal"]}>
				<h2>{title}</h2>
				<p>{message}</p>
				<div className={classes["modal-buttons"]}>
					<button className="btn" onClick={onClose}>Anuluj</button>
					<button className="btn btn-danger" onClick={onConfirm}>Tak, usuń</button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
