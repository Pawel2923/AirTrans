import { useCallback, useState } from "react";
import Toast from "../components/Toast";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const useToast = () => {
	const [toast, setToast] = useState<typeof Toast | null>(null);

	const createToast = useCallback((
		message: string,
		type?: "primary" | "alt" | "warning" | "danger",
		icon?: IconDefinition,
		action?: {
			label: string;
			onClick: () => void;
		},
		timeout = 5000,
		onClose?: () => void
	) => {
		setToast(() => (
			<Toast
				type={type}
				message={message}
				icon={icon}
				timeout={timeout}
				action={action ? {
					label: action.label,
					onClick: () => {
						action.onClick();
						setToast(null);
					},
				} : undefined}
				onClose={() => {
					setToast(null);
					if (onClose) {
						onClose();
					}
				}}
			/>
		));
	}, []);

	return { toast, createToast } as const;
};

export default useToast;
