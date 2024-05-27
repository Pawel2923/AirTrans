import React,{useState,useEffect} from 'react';
import carService from '../services/car.service';
import { Cars } from '../assets/Data';
import TabelkaCarsk from '../components/tabelkaCarK';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';



const RentCar = () => {
    const [cars,setCars] = useState<Cars[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        carService.getAll().then((response) => {
            setCars(response.data);
        });
    }, []);
    const chooseCar = (car: Cars) => {
        navigate(`data/${car.id}`);
    }

    return (
        <div>
            <div>
                <h1>Wypożycz Auto</h1>
            </div>
            <div>
                <h4>I Wybierz AUTO</h4>
                <TabelkaCarsk cars={cars}
                 onSelect={chooseCar} 
                />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );  
}

export default RentCar;