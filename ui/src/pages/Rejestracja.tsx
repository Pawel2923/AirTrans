import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import rejestracjaService from "../services/rejestracja.service";



const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const isEmpty = (value:string) => value.trim() !== "" && value.trim().length >= 3;
const isEmail = (value:string) =>
  emailRegex.test(value.toLowerCase()) &&
  value.toLowerCase().trim().length >= 3;
  
const Rejestracja = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const emailInputHandler =  (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const passwordInputHandler = async (ev:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  const repeatPasswordInputHandler = (ev:React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(ev.target.value);
  };

  const firstNameInputHandler = (ev:React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(ev.target.value);
  };

  const lastNameInputHandler = (ev:React.ChangeEvent<HTMLInputElement>) => {
    setLastName(ev.target.value);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setFirstName("");
    setLastName("");
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
  
      if (password !== repeatPassword) {
        console.error("Hasła nie są identyczne");
        alert("Hasła nie są identyczne");
        return;
      }      
  
      const response = await rejestracjaService.create({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
  
      if (response.status === 201) {
        resetForm();
        console.log("Zarejestrowano pomyślnie");
        alert("Zarejestrowano pomyślnie");
      } else if (response.status === 409) {
        console.error("Użytkownik o podanym adresie e-mail już istnieje");
        alert("Użytkownik o podanym adresie e-mail już istnieje");
      } else {
        console.error("Błąd rejestracji");
        alert("Błąd rejestracji - sprawdź konsolę");
      }
    } catch (error) {
      console.error("Błąd rejestracji", error);
      alert("Błąd rejestracji - sprawdź konsolę");
    }
  };

  const registrationForm = (
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
      <label>
        <p>Powtórz hasło*</p>
        <Input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          minLength={3}
          onInput={repeatPasswordInputHandler}
          validateInput={isEmpty}
          setIsFormInvalid={setIsFormInvalid}
          required
        />
      </label>
      <label>
        <p>Imię*</p>
        <Input
          type="text"
          id="firstName"
          value={firstName}
          minLength={2}
          onInput={firstNameInputHandler}
          validateInput={isEmpty}
          setIsFormInvalid={setIsFormInvalid}
          required
        />
      </label>
      <label>
        <p>Nazwisko*</p>
        <Input
          type="text"
          id="lastName"
          value={lastName}
          minLength={2}
          onInput={lastNameInputHandler}
          validateInput={isEmpty}
          setIsFormInvalid={setIsFormInvalid}
          required
        />
      </label>
      <button type="submit">Zarejestruj się</button>
      <p>
        Masz już konto? <Link to="/logowanie">Zaloguj się</Link>
      </p>
    </form>
  );

  return (
    <>
      <main>
        <section className="section">
          <h1>Zarejestruj się</h1>
          <h2>Wypełnij formularz rejestracji</h2>
          {registrationForm}
        </section>
      </main>
    </>
  );
};

export default Rejestracja
