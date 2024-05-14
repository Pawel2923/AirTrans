
import React,{useState,useEffect} from "react";
import {useParams, useNavigate } from "react-router-dom";
import parkingService from "../../services/parking.service";
import { ParkingReservations } from "../../assets/Data";

const emptyParking: ParkingReservations = {
    pid: 0,
    Users_uid: 0,
    since: "",
    until: "",
    parking_level: "",
    space_id: "",
    license_plate: "",
    status: undefined,
};

const EditParkingPage =()=>{
const navigate = useNavigate();
const { pid } = useParams<{pid:string}>();
const [parking, setParking] = useState<ParkingReservations>(emptyParking);
useEffect(()=>{

    if(pid === undefined) return;

    const parkingId = parseInt(pid);

    parkingService.getById(parkingId).then((response)=>{
        if(response.status === 200){
            setParking(response.data.data[0]);
        }
    });
},[pid]);

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
                name="Users_uid"
                placeholder="Client ID"
                value={parking.Users_uid}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Since:
                <input
                type="datetime-local"
                name="since"
                placeholder="Since"
                value={parking.since?.toString()}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Until:
                <input
                type="datetime-local"
                name="until"
                placeholder="Until"
                value={parking.until?.toString()}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Parking Level:
                <input
                type="text"
                name="parking_level"
                placeholder="Parking level"
                value={parking.parking_level}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Space ID:
                <input
                type="number"
                name="space_id"
                placeholder="Space ID"
                value={parking.space_id}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                License Plate:
                <input
                type="text"
                name="license_plate"
                placeholder="License plate"
                value={parking.license_plate}
                onChange={inputChangeHandler}
                />
            </label>
            <label>
                Status:
                <input
                type="text"
                name="status"
                placeholder="Status"
                value={parking.status}
                onChange={inputChangeHandler}
                />
            </label>
            <button type="submit">Zapisz zmiany</button>
        </form>  
    </div>
);
};

export default EditParkingPage;
