import React,{useState,useEffect} from "react";
import {useParams, useNavigate } from "react-router-dom";
import parkingService from "../services/parking.service";
import { ParkingZ } from "../assets/Data";

const emptyParking: ParkingZ = {
    Id: 0,
    Client_id: 0,
    Since: "",
    Until: "",
    Parking_level: "",
    Space_id: 0,
    License_plate: "",
    Price_per_day: 0,
};

const EditParkingPage =()=>{
const navigate = useNavigate();
const { id } = useParams<{id:string}>();
const [parking, setParking] = useState<ParkingZ>(emptyParking);
useEffect(()=>{
    if(id === undefined) return;
    const parkingId = parseInt(id);
    parkingService.getById(parkingId).then((response)=>{
        if(response.status === 200){
            setParking(response.data.data[0]);
        }
    });
},[id]);

const formSubmitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
        const response = await parkingService.updateParking(parking);
        if(response.status === 200){
            alert("Edycja zakończona sukcesem!");
            navigate("/parking");
        }
    }catch(error){
        console.error("Error while updating parking:", error);
        alert("Wystąpił błąd podczas aktualizacji parkingu. Spróbuj ponownie");
    }
};
const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setParking({
        ...parking,
        [e.target.name]: e.target.value,
    });
}

return(
    <div>
        <h1> Edit Parking</h1>
        <form onSubmit={formSubmitHandler}>
            <label>
                Client ID:
                <input
                type="number"
                name="Client_id"
                value={parking.Client_id}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Since:
                <input
                type="datetime-local"
                name="Since"
                value={parking.Since.toString()}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Until:
                <input
                type="datetime-local"
                name="Until"
                value={parking.Until.toString()}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Parking Level:
                <input
                type="text"
                name="Parking_level"
                value={parking.Parking_level}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Space ID:
                <input
                type="number"
                name="Space_id"
                value={parking.Space_id}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                License Plate:
                <input
                type="text"
                name="License_plate"
                value={parking.License_plate}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Price per day:
                <input
                type="number"
                name="Price_per_day"
                value={parking.Price_per_day}
                onChange={inputChangeHandler}
                />
            </label>
            <button type="submit">Zapisz Zmiany</button>
        </form>  

    </div>
);




};

export default EditParkingPage;