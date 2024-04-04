import Nav from "../components/Nav";
import Tabela from "../components/table";
import './ogloszenia.css';


const Ogloszenia = () => {
    return (
        <div className="container">
            <Nav />
            <h1>Ogłoszenia</h1>
            <div className="tabela-container">
                <Tabela />
                <Tabela />
                <Tabela />
                
            </div>
           
        </div>   
    );
};

export default Ogloszenia;