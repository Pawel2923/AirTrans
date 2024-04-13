import React, { useState } from "react"; // Zmiana importu na pełną ścieżkę do pliku "react"
import loginService from "../services/login.service";
import { Link } from "react-router-dom";
import Input from "../components/input";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const isEmpty = (value: string) => value.trim() !== "" && value.trim().length >= 3;
const isEmail = (value: string) =>
  emailRegex.test(value.toLowerCase()) &&
  value.toLowerCase().trim().length >= 3;

const Login = () => {
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
        console.error("Formularz jest niepoprawny");
        alert("Formularz jest niepoprawny");
        return;
      }
  
      const response = await loginService.findByLogin(email);
      if (response.status === 200) {
        const userDataArray = response.data.message; 
        console.log("userDataArray", userDataArray);

        let found = false;
        for (let i = 0; i < userDataArray.length; i++) {
          const userData = userDataArray[i];
          if ( userData.Password === password) {
            found = true;
            break; 
          }
        }
  
        if (found) {
          resetForm();
          console.log("Zalogowano");
          alert("Zalogowano");
        } else {
          console.error("Błędne hasło");
          alert("Błędne hasło");
        }
      } else {
        console.error("Błędny e-mail");
        alert("Błędny e-mail");
      }
    } catch (error) {
      console.error("Błąd logowania", error);
      alert("Błąd logowania - sprawdź konsolę");
    }
  };
  console.log("password", password)
  const loginForm = (
    <form onSubmit={submitHandler}>
      <label>
        <p>E-mail*</p>
        <Input
          type="email"
          id="email"
          value={email}
          minLength={3}
          onInput={emailInputHandler}
          validateInput={isEmail}
          setIsFormInvalid={setIsFormInvalid}
          required
        />
      </label>
      <label>
        <p>Hasło*</p>
        <Input
          type="password"
          id="password"
          value={password}
          minLength={3}
          onInput={passwordInputHandler}
          validateInput={isEmpty}
          setIsFormInvalid={setIsFormInvalid}
          required
        />
      </label>
      <button type="submit">Zaloguj się</button>
      <p>
        Nie masz jeszcze konta? <Link to="/rejestracja">Zapisz się</Link>
      </p>
    </form>
  );

  return (
    <>
      <main>
        <section className="section">
          <h1>Zaloguj się</h1>
          <h2>Wypełnij formularz logowania</h2>
          {loginForm}
        </section>
      </main>
    </>
  );
};

export default Login;