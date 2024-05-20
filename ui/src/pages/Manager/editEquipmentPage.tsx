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
        <div>
            <h1>Edytuj urządzenie</h1>
            <form onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="serial_no">Numer seryjny</label>
                    <input
                        type="text"
                        id="serial_no"
                        name="serial_no"
                        value={equipment.serial_no}
                        onChange={inputChangeHandler}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Typ</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={equipment.type}
                        onChange={inputChangeHandler}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nazwa</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={equipment.name}
                        onChange={inputChangeHandler}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Lokalizacja</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={equipment.location}
                        onChange={inputChangeHandler}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Employee_id">Pracownik</label>
                    <input
                        type="number"
                        id="Employee_id"
                        name="Employee_id"
                        value={equipment.Employee_id}
                        onChange={inputChangeHandler}
                        className="form-control"
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary me-3">
                        Zapisz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEquipmentPage;
