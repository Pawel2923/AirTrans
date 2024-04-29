import { useEffect, useState } from "react";
import airplaneService from "../services/airplane.service";
import { useParams, useNavigate } from "react-router-dom";
import { Airplane } from "../assets/Data";

const emptyAirplane: Airplane = {
	serial_no: "",
	model: "",
	type: "",
	production_year: 0,
	num_of_seats: 0,
	fuel_tank: 0,
	fuel_quant: 0,
	crew_size: 0,
	max_cargo: 0,
};

const AirplaneEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [airplane, setAirplane] = useState<Airplane>(emptyAirplane);

	useEffect(() => {
		if (id === undefined) return;

		airplaneService.getById(id).then((response) => {
			if (response.status === 200) {
				setAirplane(response.data.data[0]);
			}
		});
	}, [id]);

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (id === undefined) return;

		airplaneService.update(id, airplane).then((response) => {
			if (response.status === 200) {
				alert("Zaktualizowano samolot");
				navigate("/samoloty");
			}
		});
	};

	if (!airplane) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Edit Airplane</h1>
			<form onSubmit={formSubmitHandler}>
				<div className="form-group">
					<label>Serial No</label>
					<input
						type="text"
						className="form-control"
						value={airplane.serial_no}
						onChange={(e) =>
							setAirplane({
								...airplane,
								serial_no: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Model</label>
					<input
						type="text"
						className="form-control"
						value={airplane.model}
						onChange={(e) =>
							setAirplane({ ...airplane, model: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Type</label>
					<input
						type="text"
						className="form-control"
						value={airplane.type}
						onChange={(e) =>
							setAirplane({ ...airplane, type: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Production Year</label>
					<input
						type="number"
						className="form-control"
						value={airplane.production_year}
						onChange={(e) =>
							setAirplane({
								...airplane,
								production_year: Number(e.target.value),
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Number of Seats</label>
					<input
						type="number"
						className="form-control"
						value={airplane.num_of_seats}
						onChange={(e) =>
							setAirplane({
								...airplane,
								num_of_seats: Number(e.target.value),
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Fuel Tank</label>
					<input
						type="number"
						className="form-control"
						value={airplane.fuel_tank}
						onChange={(e) =>
							setAirplane({
								...airplane,
								fuel_tank: Number(e.target.value),
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Fuel Quantity</label>
					<input
						type="number"
						className="form-control"
						value={airplane.fuel_quant}
						onChange={(e) =>
							setAirplane({
								...airplane,
								fuel_quant: Number(e.target.value),
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Crew Size</label>
					<input
						type="number"
						className="form-control"
						value={airplane.crew_size}
						onChange={(e) =>
							setAirplane({
								...airplane,
								crew_size: Number(e.target.value),
							})
						}
					/>
				</div>
				<div className="form-group">
					<label>Max Cargo</label>
					<input
						type="number"
						className="form-control"
						value={airplane.max_cargo}
						onChange={(e) =>
							setAirplane({
								...airplane,
								max_cargo: Number(e.target.value),
							})
						}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Zapisz
				</button>
			</form>
		</div>
	);
};

export default AirplaneEdit;
