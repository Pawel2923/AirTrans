import { useCallback, useState } from "react";
import { Err, Runways, Taxiways, Terminals } from "../../assets/Data";
import airfieldService from "../../services/airfield.service";
import useErrorHandler from "../useErrorHandler";

const useGetAirfield = () => {
	const { handleError } = useErrorHandler();
	const [terminalData, setTerminalData] = useState<Terminals[]>();
	const [taxiwayData, setTaxiwayData] = useState<Taxiways[]>();
	const [runwayData, setRunwayData] = useState<Runways[]>();

	const getAirfieldInfo = useCallback(() => {
		airfieldService
			.getAll()
			.then((response) => {
				if (response.status === 200) {
					setTerminalData(response.data.data.terminals);
					setTaxiwayData(response.data.data.taxiways);
					setRunwayData(response.data.data.runways);
				}
			})
			.catch((error) => {
				handleError({ error });
			});
	}, [handleError]);

	const getAirfieldTable = useCallback(
		(tableName: string, id: string) => {
			if (!tableName) throw new Error("Table name is not defined");

			airfieldService
				.getTable(tableName, 1, id)
				.then((response) => {
					if (response.status === 200) {
						if (tableName === "Terminals") {
							setTerminalData(response.data.data);
						} else if (tableName === "Taxiways") {
							setTaxiwayData(response.data.data);
						} else if (tableName === "Runways") {
							setRunwayData(response.data.data);
						}
					}
				})
				.catch((error: Err) => {
					handleError({ error });
				});
		},
		[handleError]
	);

	return {
		terminalData,
		taxiwayData,
		runwayData,
		getAirfieldInfo,
		getAirfieldTable,
	};
};

export default useGetAirfield;
