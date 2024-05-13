import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rentalService from "../../services/rental.service";
import { Rentals } from "../../assets/Data";

const emptyRental: Rentals = {
  id: 0,
  since: "",
  until: "",
  Users_uid: 0,
  Cars_id: 0,
};

const EditRentPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [carRental, setCarRent] = useState<Rentals>(emptyRental);

    useEffect(() => {
        if (id === undefined) return;

        const rentId = parseInt(id);

        rentalService.getById(rentId).then((response) => {
            if (response.status === 200) {
                setCarRent(response.data.data[0]);
            }
        });
    }, [id]);

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await rentalService.updateRent(carRental);
            if (response.status === 200) {
                alert("Edycja zakończona sukcesem!");
                navigate("/zarzadzanie/pojazd");
            }
        } catch (error) {
            console.error("Error while updating rent:", error);
            alert("Wystąpił błąd podczas aktualizacji wypożyczenia. Spróbuj ponownie");
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCarRent({
            ...carRental,
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
                        type="datetime-local"
                        name="since"
                        placeholder="Rental Date"
                        value={carRental.since.toString()}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    Return Date:
                    <input
                        type="datetime-local"
                        name="until"
                        placeholder="Return Date"
                        value={carRental.until.toString()}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    status:
                    <input
                        type="text"
                        name="status"
                        placeholder="status"
                        value={carRental.status}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    Client ID:
                    <input
                        type="number"
                        name="Users_uid"
                        placeholder="Client ID"
                        value={carRental.Users_uid}
                        onChange={inputChangeHandler}
                    />
                </label>
                <label>
                    Car ID:
                    <input
                        type="number"
                        name="Cars_id"
                        placeholder="Car ID"
                        value={carRental.Cars_id}
                        onChange={inputChangeHandler}
                    />
                </label>
                <button type="submit">Zapisz zmiany</button>
            </form>
        </div>
    );
};

export default EditRentPage;
