import { Link } from "react-router-dom";
import homeStyles from "./Home.module.css";

const Logowanie = () => {
    return (
        <div className={`container-fluid ${homeStyles["content-wrapper"]}`} style={{ backgroundColor: "#B3D3E8", margin: "auto", borderRadius: "10px", display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '55vh', marginTop:'10%',width:'100vh'}}>
            <div className="container-fluid row text-center text-lg-start justify-content-between gap-5 ms-0">
                <div className="col-lg-3" style={{ width: "100%" }}>
                    <h1>LOGOWANIE DO SYSTEMU</h1>
                    <form>
                        <div className="form-group d-flex justify-content-start">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" style={{ marginLeft: "5px" }} />
                        </div>
                        <div className="form-group d-flex justify-content-start">
                            <label htmlFor="password">Hasło</label>
                            <input type="password" className="form-control" id="password" style={{ marginLeft: "5px" }} />
                        </div>
                        <button type="submit" className="btn btn-primary">Zaloguj</button>
                    </form>

                    <p>Nie masz konta? <Link to="/rejestracja">Zarejestruj się</Link></p>
                </div>
            </div>
        </div>
    );
};
export default Logowanie;
