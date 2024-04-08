import { Link } from "react-router-dom";
import { useState } from "react"; 
import homeStyles from "./Home.module.css";
import Input from "../components/input"; 

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;



const Logowanie = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormInvalid, setIsFormInvalid] = useState(true);
    const submitHandler = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        validateForm();
        if (isFormInvalid) {
            return;
        }
    };

    const emailInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value);
    };

    const passwordInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(ev.target.value);
    };

    const validateForm = () => {
        const emailIsValid = email.trim() !== "" && emailRegex.test(email.toLowerCase());
        const passwordIsValid = password.trim() !== "" && password.length >= 3;
        setIsFormInvalid(!emailIsValid || !passwordIsValid);
    };

    

    return (
        <div className={`container-fluid ${homeStyles["content-wrapper"]}`} style={{ backgroundColor: "#B3D3E8", margin: "auto", borderRadius: "10px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55vh', marginTop:'10%',width:'120vh'}}>
            <div className="container-fluid row text-center text-lg-start justify-content-between gap-5 ms-0">
                <div className="col-lg-6" style={{ width: "200%" }}>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>LOGOWANIE DO SYSTEMU</h3>
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={submitHandler}>
                                <div className="form-group d-flex justify-content-start">
                                    <p>Formularz logowania</p>
                                </div>
                                <div className="form-group d-flex justify-content-start">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onInput={emailInputHandler}
                                        setIsFormInvalid={setIsFormInvalid}
                                        required
                                    />
                                </div>
                                
                                <div className="form-group d-flex justify-content-start">
                                    <label htmlFor="password">Hasło</label>
                                    <Input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onInput={passwordInputHandler}
                                        setIsFormInvalid={setIsFormInvalid}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary text-center" disabled={isFormInvalid}>Zaloguj</button>
                            </form>
                        </div>
                    </div>
                    <p>Nie masz jeszcze konta?</p>
                    <Link to="/rejestracja">Zarejestruj się</Link>
                </div>
            </div>
        </div>
     );
};

export default Logowanie;