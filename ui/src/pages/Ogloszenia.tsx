import Nav from "../components/Nav";
import Footer from "../components/footer";

import Tabela from "../components/table";

import './ogloszenia.css';


const Ogloszenia = () => {
    return (
        <div className="container">
            <Nav/>
            <div style={{width: '100%', backgroundColor: '#ECEFF2',height: '70%',borderRadius:'10px'}}>
                <h1 style={{marginTop:'2%'}}>Ogłoszenia</h1>
                <div className="tabela-container" style={{marginTop:'5%'}}>
                <Tabela />
                <Tabela />
                <Tabela />
            </div>
            </div>
            <Footer/>
        </div>   
        
    );
};

export default Ogloszenia;