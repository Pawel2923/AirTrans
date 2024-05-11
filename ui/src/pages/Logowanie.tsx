import React, { useState } from "react";
import loginService from "../services/login.service";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import styles from "./Logowanie.module.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeftLong,
  
        
} from "@fortawesome/free-solid-svg-icons";
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const isEmpty = (value: string) => value.trim() !== "" && value.trim().length >= 3;
const isEmail = (value: string) =>
  emailRegex.test(value.toLowerCase()) &&
  value.toLowerCase().trim().length >= 3;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const emailInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const passwordInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setIsFormInvalid(false);
  };

  const submitHandler = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      if (isFormInvalid) {
        alert("Formularz jest niepoprawny");
        return;
      }

      const response = await loginService.create({ email, password });
      if (response.status === 200) {
        const { auth } = response.data;
        if (auth) {
          resetForm();
          alert("Zalogowano");
          navigate("/zarzadzanie");
        } else {
          alert("Błędne dane logowania");
        }
      } else {
        alert("Błąd logowania");
      }
    } catch (error) {
      alert("Błąd logowania - sprawdź konsolę");
    }
  };

  return (
    <main>
      <section className="section">
        <div className={`container ${styles.container}`}>
          <div className={`rounded p-4 bg-white ${styles['login-container']}`}>
            <div className={styles.left}>
              <h1 className="text-center mb-4">LOGOWANIE DO SYSTEMU</h1>
              <p className="text-center">
                Nie masz jeszcze konta? <Link to="/rejestracja">Zarejestruj się</Link>
              </p>
              <p className="text-center">
                Zresetuj hasło <Link to="/resetowanie">tutaj</Link>.
              </p>
              <p >
              <Link to="/" className="link" style={{ color: 'black' }}>
                <FontAwesomeIcon icon={faArrowLeftLong} /> Wróć
                </Link>
              </p>
            </div>
            <div className={styles.right}>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label"></label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    minLength={3}
                    onInput={emailInputHandler}
                    validateInput={isEmail}
                    setIsFormInvalid={setIsFormInvalid}
                    className="form-control"
                    placeholder="E-mail"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label"></label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Hasło"
                    value={password}
                    minLength={3}
                    onInput={passwordInputHandler}
                    validateInput={isEmpty}
                    setIsFormInvalid={setIsFormInvalid}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#5DA9DB" }}>Zaloguj się</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
