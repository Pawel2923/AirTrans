import React, { useState, useEffect, useCallback } from "react";
import parkingService from "../../services/parking.service";
import TableParking from "../../components/tableParking";
import { PageData, ParkingReservations } from "../../assets/Data";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

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
        Users_id: 0,
        since: "",
        until: "",
        parking_level: "",
        space_id: "",
        license_plate: "",
		status: undefined,
    });

    const retrieveParkings = useCallback(() => {
        parkingService
            .getAllParking(pageData.page, 5)
            .then((response) => {
                setParkings(response.data);
                setPageData(response.meta);
            })
            .catch((error) => {
                console.log("Error while retrieving parkings:", error);
            });
    }, [pageData.page]);

    useEffect(() => {
        retrieveParkings();
    }, [pageData.page, retrieveParkings]);

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
                Users_id: 0,
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
            setParkings(parkings.filter((park) => park.pid !== id));
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
        <div className="container">
            <h1 className="text-center">Zarządzanie Parkingami</h1>
            <div className="row">
                <div className="col-12">
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
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Dodaj nowy parking</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="Users_id">ID klienta</label>
                                <input
                                    type="number"
                                    name="Users_id"
                                    className="form-control"
                                    value={newParking.Users_id}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="since">Data rozpoczęcia</label>
                                <input
                                    type="datetime-local"
                                    name="since"
                                    className="form-control"
                                    value={newParking.since.toString()}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="until">Data zakończenia</label>
                                <input
                                    type="datetime-local"
                                    name="until"
                                    className="form-control"
                                    value={newParking.until.toString()}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="parking_level">Poziom parkingu</label>
                                <input
                                    type="text"
                                    name="parking_level"
                                    className="form-control"
                                    value={newParking.parking_level}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="space_id">ID miejsca</label>
                                <input
                                    type="number"
                                    name="space_id"
                                    className="form-control"
                                    value={newParking.space_id}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="license_plate">Numer rejestracyjny</label>
                                <input
                                    type="text"
                                    name="license_plate"
                                    className="form-control"
                                    value={newParking.license_plate}
                                    onChange={handleInputChange}
                                />
                            </div>
							<div className="form-group">
								<label htmlFor="status">Status</label>
								<input
									type="text"
									name="status"
									className="form-control"
									value={newParking.status}
									onChange={handleInputChange}
								/>
							</div>
							<button
                                className="btn btn-primary"
                                onClick={submitNewParking}
                            >
                                Dodaj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Parking;
