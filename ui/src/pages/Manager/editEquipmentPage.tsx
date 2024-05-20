import React, { useState, useEffect } from "react";
import { Equipment } from '../../assets/Data';
import { useParams, useNavigate } from 'react-router-dom';
import equipmentService from '../../services/equipment.service';

const emptyEquipment: Equipment = {
    serial_no: "",
    type: "",
    name: "",
    location: "",
    Employee_id: 0,
};

const EditEquipmentPage = () => {
    const navigate = useNavigate();
    const { serial_no } = useParams<{ serial_no: string }>();
    const [equipment, setEquipment] = useState<Equipment>(emptyEquipment);

    useEffect(() => {
        if (serial_no === undefined) return;

        const fetchEquipment = async () => {
            try {
                const response = await equipmentService.getById(serial_no);
                if (response.status === 200) {
                    const data = response.data.data;
                    setEquipment(data);
                }
            } catch (error) {
                console.error("Error while fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, [serial_no]);

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await equipmentService.updateEquipment(equipment);
            if (response.status === 200) {
                alert("Edycja zakończona sukcesem!");
                navigate("/zarzadzanie/sprzet");
            }
        } catch (error) {
            console.error("Error while updating equipment:", error);
            alert("Wystąpił błąd podczas aktualizacji urządzenia. Spróbuj ponownie.");
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setEquipment((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h2>Edytuj urządzenie</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formSubmitHandler}>
                                <div className="form-group">
                                    <label htmlFor="serial_no">Numer seryjny</label>
                                    <input
                                        type="text"
                                        name="serial_no"
                                        id="serial_no"
                                        className="form-control"
                                        value={equipment.serial_no}
                                        onChange={inputChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Typ</label>
                                    <input
                                        type="text"
                                        name="type"
                                        id="type"
                                        className="form-control"
                                        value={equipment.type}
                                        onChange={inputChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Nazwa</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        value={equipment.name}
                                        onChange={inputChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Lokalizacja</label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        className="form-control"
                                        value={equipment.location}
                                        onChange={inputChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Employee_id">Pracownik</label>
                                    <input
                                        type="number"
                                        name="Employee_id"
                                        id="Employee_id"
                                        className="form-control"
                                        value={equipment.Employee_id}
                                        onChange={inputChangeHandler}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Zapisz
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEquipmentPage;
