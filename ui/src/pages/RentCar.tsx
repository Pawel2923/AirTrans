import React,{useState,useEffect} from 'react';
import carService from '../services/car.service';
import { Cars } from '../assets/Data';
import TabelkaCarsk from '../components/tabelkaCarK';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';



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
            <Link to="data" 
                className="btn btn-primary py-2 px-5">
				Wybierz date
                <span>&#10132;</span>
			</Link>
            </div>
            
            <div>
                <Footer />
            </div>
        </div>
    );  
}

export default RentCar;