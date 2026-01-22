import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import rejestracjaService from "../services/rejestracja.service";
import styles from "./Logowanie.module.css";
import { faArrowLeft, faArrowRight, faEnvelope, faLock, faUser, faEarthEurope, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const isEmpty = (value: string | number) =>
  (value as string).trim() !== "" && (value as string).trim().length >= 3;
const isEmail = (value: string | number) =>
  emailRegex.test((value as string).toLowerCase()) &&
  (value as string).toLowerCase().trim().length >= 3;

const Rejestracja = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const emailInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const passwordInputHandler = async (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(ev.target.value);
  };

  const repeatPasswordInputHandler = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(ev.target.value);
  };

  const firstNameInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(ev.target.value);
  };

  const lastNameInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
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
    <form onSubmit={submitHandler} className={styles["login-form"]}>
      <div className={styles["form-container"]}>
        <div className={styles["form-group"]}>
          <FontAwesomeIcon icon={faEnvelope} />
          <Input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            minLength={3}
            onInput={emailInputHandler}
            validateInput={isEmail}
            setIsFormInvalid={setIsFormInvalid}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <FontAwesomeIcon icon={faLock} />
          <Input
            type="password"
            id="password"
            placeholder="Hasło"
            value={password}
            minLength={3}
            onInput={passwordInputHandler}
            validateInput={isEmpty}
            setIsFormInvalid={setIsFormInvalid}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <FontAwesomeIcon icon={faLock} />
          <Input
            type="password"
            id="repeatPassword"
            placeholder="Powtórz hasło"
            value={repeatPassword}
            minLength={3}
            onInput={repeatPasswordInputHandler}
            validateInput={isEmpty}
            setIsFormInvalid={setIsFormInvalid}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <FontAwesomeIcon icon={faUser} />
          <Input
            type="text"
            id="firstName"
            placeholder="Imię"
            value={firstName}
            minLength={2}
            onInput={firstNameInputHandler}
            validateInput={isEmpty}
            setIsFormInvalid={setIsFormInvalid}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <FontAwesomeIcon icon={faUser} />
          <Input
            type="text"
            id="lastName"
            placeholder="Nazwisko"
            value={lastName}
            minLength={2}
            onInput={lastNameInputHandler}
            validateInput={isEmpty}
            setIsFormInvalid={setIsFormInvalid}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className={`btn btn-primary ${styles["submit-btn"]}`}
      >
        Zarejestruj się
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </form>
  );

  return (
    <>
      <main>
        <section className="section">
          <div className={styles.container}>
            <FontAwesomeIcon icon={faEarthEurope} className={styles["background-icon"]} />
            <div className={styles["login-container"]}>
              <FontAwesomeIcon icon={faPlane} className={styles["plane-icon"]} />
              <Link to="/" className={`text-decoration-none ${styles["back-link"]}`}>
                <FontAwesomeIcon icon={faArrowLeft} /> Wróć
              </Link>
              <div className={styles.header}>
                <h1 className="display-6 text-center">Rejestracja do systemu</h1>
                <div className={styles["header-divider"]}></div>
              </div>
              <div className={styles.form}>
                <h5 className="text-center">Utwórz nowe konto</h5>
                {registrationForm}
              </div>
              <div className={styles.links}>
                <p className="text-center">
                  Masz już konto?{" "}
                  <Link to="/logowanie">Zaloguj się</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Rejestracja;
