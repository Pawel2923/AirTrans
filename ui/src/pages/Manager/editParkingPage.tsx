import React,{useState,useEffect} from "react";
import {useParams, useNavigate } from "react-router-dom";
import parkingService from "../../services/parking.service";
import { ParkingReservations } from "../../assets/Data";

const emptyParking: ParkingReservations = {
    
    Users_uid: 0,
    since: "",
    until: "",
    parking_level: "",
    space_id: "",
    license_plate: "",
};

const EditParkingPage =()=>{
const navigate = useNavigate();
const { id } = useParams<{id:string}>();
const [parking, setParking] = useState<ParkingReservations>(emptyParking);
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
            navigate("/zarzadzanie/parking");
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
};

return(
    <div>
        <h1> Edit Parking</h1>
        <form onSubmit={formSubmitHandler}>
            <label>
                Client ID:
                <input
                type="number"
                name="Client_id"
                placeholder="Client ID"
                value={parking.Users_uid}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Since:
                <input
                type="datetime-local"
                name="Since"
                placeholder="Since"
                value={parking.since.toString()}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Until:
                <input
                type="datetime-local"
                name="Until"
                placeholder="Until"
                value={parking.until.toString()}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Parking Level:
                <input
                type="text"
                name="Parking_level"
                placeholder="Parking level"
                value={parking.parking_level}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Space ID:
                <input
                type="number"
                name="Space_id"
                placeholder="Space ID"
                value={parking.space_id}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                License Plate:
                <input
                type="text"
                name="License_plate"
                placeholder="License plate"
                value={parking.license_plate}
                onChange={inputChangeHandler}
                />
            </label>
            <button type="submit">Zapisz zmiany</button>
        </form>  
    </div>
);
};

export default EditParkingPage;