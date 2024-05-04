import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rentalService from "../services/rental.service";
import { CarRental } from "../assets/Data";

const emptyRental: CarRental = {
  Id: 0,
  Rental_date: "",
  Return_date: "",
  Status: "",
  Client_id: 0,
  Cars_id: 0,
};

const EditRentPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [rentData, setRentData] = useState<CarRental>(emptyRental);

    useEffect(() => {
        if (id === undefined) return;

        const rentId = parseInt(id);

        rentalService.getById(rentId).then((response) => {
            if (response.status === 200) {
                setRentData(response.data.data[0]);
            }
        });
    }, [id]);

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const response = await rentalService.updateRent(rentData);
            if (response.status === 200) {
                alert("Edycja zakonczona sukcesem!");
                navigate("/ui/src/pages/zarzadzaniePojazd");
            }
        } catch (error) {
            console.error("Error while updating rent:", error);
            alert("An error occurred while updating the rent. Please try again");
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        setRentData({
            ...rentData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Edit Rent</h1>
            <form onSubmit={formSubmitHandler}>
                <label>
                    Rental Date:
                    <input
                        type="text"
                        name="Rental_date"
                        value={rentData.Rental_date}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    Return Date:
                    <input
                        type="text"
                        name="Return_date"
                        value={rentData.Return_date}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="Status"
                        value={rentData.Status}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    Client ID:
                    <input
                        type="number"
                        name="Client_id"
                        value={rentData.Client_id}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    Car ID:
                    <input
                        type="number"
                        name="Cars_id"
                        value={rentData.Cars_id}
                        onChange={inputChangeHandler}
                    />
                </label>
                <button type="submit">Zapisz zmiany</button>
            </form>
        </div>
    );
};
export default EditRentPage;