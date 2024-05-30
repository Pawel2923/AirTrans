import { useContext, useEffect, useState } from "react";
import airplaneService from "../../services/airplane.service";
import { useParams, useNavigate } from "react-router-dom";
import { Airplanes } from "../../assets/Data";
import useErrorHandler from "../../hooks/useErrorHandler";
import ToastModalContext from "../../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const emptyAirplane: Airplanes = {
	serial_no: "",
	model: "",
	type: "",
	production_year: 0,
	num_of_seats: 0,
	fuel_tank: 0,
	fuel_quant: 0,
	num_of_crew: 0,
	max_cargo: 0,
};

const AirplaneEdit = () => {
	const navigate = useNavigate();
	const { createToast } = useContext(ToastModalContext);
	const { handleError } = useErrorHandler();
	const { id } = useParams<{ id: string }>();
	const [airplane, setAirplane] = useState<Airplanes>(emptyAirplane);

	useEffect(() => {
		if (id === undefined) return;

		airplaneService.getById(id).then((response) => {
			if (response.status === 200) {
				setAirplane(response.data.data[0]);
			}
		});
	}, [id]);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAirplane((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (id === undefined) return;

		airplaneService
			.update(id, airplane)
			.then((response) => {
				if (response.status === 200) {
					createToast({
						message: "Dane samolotu zostały zaktualizowane",
						type: "primary",
						icon: faCircleCheck,
						timeout: 10000,
					});
					navigate("/zarzadzanie/samoloty");
				}
			})
			.catch((error) => {
				handleError({ error });
			});
	};

	return (
		<div>
			<h1>Edytuj dane samolotu</h1>
			<form onSubmit={formSubmitHandler}>
				<div className="form-group">
					<label htmlFor="serial_no">Serial No</label>
					<input
						type="text"
						className="form-control"
						name="serial_no"
						id="serial_no"
						value={airplane.serial_no}
						readOnly={true}
						aria-readonly={true}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="model">Model</label>
					<input
						type="text"
						className="form-control"
						name="model"
						id="model"
						value={airplane.model}
						onChange={inputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="type">Type</label>
					<input
						type="text"
						className="form-control"
						name="type"
						id="type"
						value={airplane.type}
						onChange={inputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="production_year">Production Year</label>
					<input
						type="number"
						className="form-control"
						name="production_year"
						id="production_year"
						value={airplane.production_year}
						onChange={inputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="num_of_seats">Number of Seats</label>
					<input
						type="number"
						className="form-control"
						name="num_of_seats"
						id="num_of_seats"
						value={airplane.num_of_seats}
						onChange={inputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="fuel_tank">Fuel Tank</label>
					<input
						type="number"
						className="form-control"
						name="fuel_tank"
						id="fuel_tank"
						value={airplane.fuel_tank}
						onChange={inputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="fuel_quant">Fuel Quantity</label>
					<input
						type="number"
						className="form-control"
						name="fuel_quant"
						id="fuel_quant"
						value={airplane.fuel_quant}
						onChange={inputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="num_of_crew">Crew Size</label>
					<input
						type="number"
						className="form-control"
						name="num_of_crew"
						id="num_of_crew"
						value={airplane.num_of_crew}
						onChange={inputChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="max_cargo">Max Cargo</label>
					<input
						type="number"
						className="form-control"
						name="max_cargo"
						id="max_cargo"
						value={airplane.max_cargo}
						onChange={inputChangeHandler}
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
