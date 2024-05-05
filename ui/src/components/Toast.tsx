import React, { useState, useEffect, CSSProperties } from "react";
import classes from "./Toast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faTimes } from "@fortawesome/free-solid-svg-icons";

interface ToastProps {
	message: string;
	type?: "primary" | "alt" | "warning" | "danger";
	icon?: IconDefinition;
	action?: {
		label: string;
		onClick: () => void;
	};
	timeout?: number;
}

const slideOutAnimation: CSSProperties = {
	animation: `${classes.slideOut} 0.5s forwards`,
};

const Toast: React.FC<ToastProps> = ({
	message,
	type,
	icon,
	action,
	timeout = 5000,
}: ToastProps) => {
	const [open, setOpen] = useState<boolean>(true);
	const [styles, setStyles] = useState<CSSProperties>({});

	useEffect(() => {
		const timer = setTimeout(() => {
			closeHandler();
		}, timeout);

		return () => {
			clearTimeout(timer);
		};
	}, [timeout]);

	const closeHandler = async () => {
		await new Promise((resolve) => {
			setStyles(slideOutAnimation);
			setTimeout(() => {
				setOpen(false);
				resolve(true);
			}, 500);
		}).then(() => {
			setStyles({});
		});
	};

	return (
		open && (
			<div className={classes.toast} style={styles}>
				<div
					className={`${classes["toast-content"]} ${
						type ? classes[type] : ""
					}`}
				>
					{icon && <FontAwesomeIcon icon={icon} />}
					<p>{message}</p>
					{action && (
						<button
							className={`btn ${
								type ? `btn-outline-${type}` : ""
							} ${classes["toast-btn"]}`}
							onClick={action.onClick}
						>
							{action.label}
						</button>
					)}
					<span className={classes.close} onClick={closeHandler}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</div>
			</div>
		)
	);
};

export default Toast;
