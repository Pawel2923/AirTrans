import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Runways, Taxiways, Terminals, Err } from "../../assets/Data";
import airfieldService from "../../services/airfield.service";
import useErrorHandler from "../useErrorHandler";
import { useContext } from "react";
import ToastModalContext from "../../store/toast-modal-context";

const useUpdateAirfield = () => {
	const { createToast } = useContext(ToastModalContext);
	const { handleError } = useErrorHandler();

	const updateAirfield = (
		tableName: string,
		newData: Runways | Taxiways | Terminals,
		id: string
	) => {
		if (!id) throw new Error("Id is not defined");

		airfieldService
			.update(tableName, newData, id)
			.then((response) => {
				if (response.status === 200) {
					createToast({
						message: `Zaktualizowano dane dla ${tableName} ${id}`,
						type: "primary",
						icon: faCircleCheck,
					});
				}
			})
			.catch((error: Err) => {
				handleError({ error });
			});
	};

	return { updateAirfield };
};

export default useUpdateAirfield;
