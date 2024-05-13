import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import flightService from "../../services/flight.service";
import { Flights } from "../../assets/Data";
import { flightsDataParser } from "../../utils/data-parser";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import { useDeleteFlight } from "../../hooks/flight/useDeleteFlight";

const ScheduleDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [flightData, setFlightData] = useState<Flights[]>([]);
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);
	const { deleteFlight, toast, alert } = useDeleteFlight(undefined, true);

	useEffect(() => {
		if (id === undefined) return;

		flightService.getById(id).then((response) => {
			if (response.status === 200) {
				setFlightData(flightsDataParser([response.data.data][0]));
			}
		});
	}, [id]);

	const breadcrumbItems: BreadcrumbItem[] = [
		{
			path: "/zarzadzanie/harmonogram",
			title: "Harmonogram",
		},
		{
			path: `/zarzadzanie/harmonogram/${id}`,
			title: "Szczegóły lotu",
		},
	];

	return (
		<>
			<Breadcrumb items={breadcrumbItems} />
			<h2>Szczegóły lotu</h2>
			<ul>
				{flightData.map((flight: Flights) =>
					Object.entries(flight).map(([key, value]) => (
						<li key={key}>
							<strong>{key}:</strong> {value}
						</li>
					))
				)}
			</ul>
			<Link
				to={`/zarzadzanie/harmonogram/${id}/edytuj`}
				className="btn btn-primary me-3"
			>
				Edytuj
			</Link>
			<button
				className="btn btn-danger"
				onClick={() => setOpenConfirm(true)}
			>
				Usuń
			</button>
			{openConfirm && (
				<ConfirmModal
					onClose={() => setOpenConfirm(false)}
					onConfirm={() => {
						deleteFlight(id || "null");
						setOpenConfirm(false);
					}}
					title="Potwierdź usunięcie"
					message="Czy na pewno chcesz usunąć lot?"
				/>
			)}
			{alert}
			{toast}
		</>
	);
};

export default ScheduleDetails;
