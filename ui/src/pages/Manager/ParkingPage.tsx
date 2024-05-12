import React,{ useState, useEffect } from "react";
import parkingService from "../../services/parking.service";
import TableParking from "../../components/tableParking";
import { PageData, ParkingReservations } from "../../assets/Data";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import tableStyle from "../../components/tableCars.module.css";

const Parking = () => {
	const [searchParams] = useSearchParams();
	const [parkings, setParkings] = useState<ParkingReservations[]>([]);
	const navigate = useNavigate();
	const [pageData, setPageData] = useState<PageData>({
		page: parseInt(searchParams.get("page") || "1"),
		pages: 1,
	});
	const [newParking, setNewParking] = useState<ParkingReservations>({
		pid: 0,
		Users_uid: 0,
		since: "",
		until: "",
		parking_level: "",
		space_id: "",
		license_plate: "",
		status: undefined,
	});

	
	const retrieveParkings = () => {
		parkingService
			.getAllParking(pageData.page, 5)
			.then((response) => {
				setParkings(response.data);
				setPageData(response.meta);
			})
			.catch((error) => {
				console.log("Error while retrieving parkings:", error);
			});
	};

	useEffect(() => {
		retrieveParkings();
	}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [pageData.page]
		
	)
	;

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setNewParking((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const submitNewParking = async () => {
		try {
			const response = await parkingService.createParking(newParking);
			setParkings([...parkings, response.data]);
			setNewParking({
				pid: 0,
				Users_uid: 0,
				since: "",
				until: "",
				parking_level: "",
				space_id: "",
				license_plate: "",
				status: undefined,
			});
			alert("Dodano nowy parking");
			navigate(0);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteParking = async (id: number) => {
		try {
			await parkingService.delete(id);
			setParkings(parkings.filter((park) => park.id !== id));
			alert("Usunięto parking");
			navigate(0);
		} catch (error) {
			console.error(error);
		}
	};

	const editParking = async (parking: ParkingReservations) => {
		navigate(`edit-parking/${parking.pid}`);
	};

	return (
		<div>
			<div className="parking-header">
				<h1>Zarządzanie Parkingami</h1>
			</div>
			<div className={tableStyle.tableContainer}>
				<TableParking
					parkings={parkings}
					onEdit={editParking}
					onDelete={deleteParking}
				/>
				<Pagination
					className="mt-3"
					pageData={pageData}
					setPageData={setPageData}
				/>
				<div className="tableContainer">
					<h2>Dodaj nowy parking</h2>
					<input
						type="number"
						name="Users_uid"
						placeholder="Client ID"
						value={newParking.Users_uid}
						onChange={handleInputChange}
					/>
					<input
						type="datetime-local"
						name="since"
						placeholder="Since"
						value={newParking.since.toString()}
						onChange={handleInputChange}
					/>
					<input
						type="datetime-local"
						name="until"
						placeholder="until"
						value={newParking.until.toString()}
						onChange={handleInputChange}
					/>
					<input
						type="text"
						name="parking_level"
						placeholder="Parking level"
						value={newParking.parking_level}
						onChange={handleInputChange}
					/>
					<input
						type="number"
						name="space_id"
						placeholder="Space ID"
						value={newParking.space_id}
						onChange={handleInputChange}
					/>
					<input
						type="text"
						name="license_plate"
						placeholder="License plate"
						value={newParking.license_plate}
						onChange={handleInputChange}
					/>
					<input
						type="text"
						name="status"
						placeholder="Status"
						value={newParking.status}
						onChange={handleInputChange}
					/>
					<button onClick={submitNewParking}>Dodaj</button>
				</div>
			</div>
		</div>
	);
};
export default Parking;