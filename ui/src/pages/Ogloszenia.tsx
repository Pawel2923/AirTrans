import Nav from "../components/Nav";
import Tabela from "../components/table";

const Ogloszenia = () => {
    const myStyle: React.CSSProperties = {
        backgroundColor: "#f8f9fb",
        textAlign: "center",
        padding: "10px",
    };
   
    return (
        <div>
            <Nav />
            <h1 style={myStyle}>Ogłosznia</h1>
            <Tabela />
        </div>
    );
};
export default Ogloszenia;