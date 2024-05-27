import React,{useState,useEffect} from 'react';
import carService from '../services/car.service';
import { Cars } from '../assets/Data';
import TabelkaCarsk from '../components/tabelkaCarK';
import Footer from '../components/footer';



const RentCar = () => {
    const [cars,setCars] = useState<Cars[]>([]);

    useEffect(() => {
        carService.getAll().then((response) => {
            setCars(response.data);
        });
    }, []);

    return (
        <div>
            <div>
                <h1>Wypożycz Auto</h1>
            </div>
            <div>
                <h4>I Wybierz AUTO</h4>
                <TabelkaCarsk cars={cars} onSelect={(car) => console.log(car)} />
            </div>
            <div>
                <h4>II Wybierz TERMIN</h4>

            </div>
            <div>
                <h4>III Uzupelnij dane </h4>
            </div>
            <div>
                <h4>IV Podsumowanie</h4>
            </div>
            
            <div>
                <Footer />
            </div>
        </div>
    );  
}

export default RentCar;