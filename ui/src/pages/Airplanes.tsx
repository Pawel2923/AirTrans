import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import airplaneService from "../services/airplane.service";
import { Airplane, PageData } from "../assets/Data";
import Pagination from "../components/Pagination";

const emptyAirplane: Airplane = {
    serial_no: "",
    model: "",
    type: "",
    production_year: 1987,
    num_of_seats: 0,
    fuel_tank: 0,
    fuel_quant: 0,
    crew_size: 0,
    max_cargo: 0,
};

const Airplanes = () => {
    const navigate = useNavigate();
	const [airplaneData, setAirplaneData] = useState<Airplane[]>([]);
	const [pageData, setPageData] = useState<PageData>({ page: 1, pages: 1 });
    const [createData, setCreateData] = useState<Airplane>(emptyAirplane);
    const [deleteSerialNo, setDeleteSerialNo] = useState<string>("");

	useEffect(() => {
		airplaneService.getAll(pageData.page, 4).then((response) => {
			if (response.status === 200) {
				setAirplaneData(response.data.data);
				setPageData(response.data.meta);
			}
		});
	}, [pageData.page]);

    const createInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreateData({
            ...createData,
            [e.target.name]: e.target.value,
        });
    }

    const createFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        airplaneService.create(createData).then((response) => {
            if (response.status === 201) {
                setCreateData(emptyAirplane);
                alert("Airplane added successfully!");
                navigate(0);
            }
        });
    }

    const deleteInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteSerialNo(e.target.value);
    }

    const deleteFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        airplaneService.delete(deleteSerialNo).then((response) => {
            if (response.status === 200) {
                setDeleteSerialNo("");
                alert("Airplane deleted successfully!");
                navigate(0);
            }
        });
    }

	return (
		<>
			<h1>Airplanes</h1>
			<div className="container-fluid">
				<div className="row gap-3 mx-auto">
					{airplaneData.map((airplane: Airplane) => (
						<div
							key={airplane.serial_no}
							className="card g-col-4 mx-auto"
							style={{ width: "18rem" }}
						>
							<div className="card-body">
								<h5 className="card-title">{airplane.model}</h5>
								<h6 className="card-subtitle mb-2 text-body-secondary">
									{airplane.serial_no}
								</h6>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										Model: {airplane.model}
									</li>
									<li className="list-group-item">
										Rok produkcji:{" "}
										{airplane.production_year}
									</li>
									<li className="list-group-item">
										Ilość siedzeń: {airplane.num_of_seats}
									</li>
									<li className="list-group-item">
										Zbiornik paliwa: {airplane.fuel_tank}
									</li>
									<li className="list-group-item">
										Ilość paliwa: {airplane.fuel_quant}
									</li>
									<li className="list-group-item">
										Stanowiska załogi: {airplane.crew_size}
									</li>
									<li className="list-group-item">
										Maksymalny ładunek: {airplane.max_cargo}
									</li>
								</ul>
							</div>
						</div>
					))}
				</div>
				<Pagination pageData={pageData} setPageData={setPageData} className="mt-3" />
			</div>
            <form onSubmit={createFormSubmitHandler} className="container ms-0" style={{ width: "20rem" }}>
                <div className="mb-3">
                    <label htmlFor="serial_no" className="form-label">
                        Serial number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="serial_no"
                        name="serial_no"
                        value={createData.serial_no}
                        onChange={createInputChangeHandler}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                        Model
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="model"
                        name="model"
                        value={createData.model}
                        onChange={createInputChangeHandler}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Type
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        name="type"
                        value={createData.type}
                        onChange={createInputChangeHandler}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="production_year" className="form-label">
                        Production year
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="production_year"
                        name="production_year"
                        value={createData.production_year}
                        onChange={createInputChangeHandler}
                        min={1902}
                        max={new Date().getFullYear()}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="num_of_seats" className="form-label">
                        Number of seats
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="num_of_seats"
                        name="num_of_seats"
                        value={createData.num_of_seats}
                        onChange={createInputChangeHandler}
                        min={1}
                        max={1000}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fuel_tank" className="form-label">
                        Fuel tank
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="fuel_tank"
                        name="fuel_tank"
                        value={createData.fuel_tank}
                        onChange={createInputChangeHandler}
                        min={1}
                        max={320000}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fuel_quant" className="form-label">
                        Fuel quantity
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="fuel_quant"
                        name="fuel_quant"
                        value={createData.fuel_quant}
                        onChange={createInputChangeHandler}
                        min={0}
                        max={320000}
                        required
                    />
                    <input
                        type="range"
                        className="form-range"
                        id="fuel_quant_range"
                        name="fuel_quant"
                        value={createData.fuel_quant}
                        onChange={createInputChangeHandler}
                        min={0}
                        max={320000}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="crew_size" className="form-label">
                        Crew size
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="crew_size"
                        name="crew_size"
                        value={createData.crew_size}
                        onChange={createInputChangeHandler}
                        min={1}
                        max={30}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="max_cargo" className="form-label">
                        Max cargo
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="max_cargo"
                        name="max_cargo"
                        value={createData.max_cargo}
                        onChange={createInputChangeHandler}
                        min={0}
                        max={100000}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Dodaj
                </button>
            </form>
            <form onSubmit={deleteFormSubmitHandler} className="container ms-0" style={{ width: "20rem" }}>
                <div className="mb-3">
                    <label htmlFor="serial_no" className="form-label">
                        Serial number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="serial_no"
                        name="serial_no"
                        value={deleteSerialNo}
                        onChange={deleteInputChangeHandler}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger">
                    Usuń
                </button>
            </form>
		</>
	);
};

export default Airplanes;
