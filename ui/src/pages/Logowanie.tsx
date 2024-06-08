import React, { useContext, useState } from "react"; // Zmiana importu na pełną ścieżkę do pliku "react"
import loginService from "../services/login.service";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import AuthContext from "../store/auth-context";
import styles from "./Logowanie.module.css";
import ToastModalContext from "../store/toast-modal-context";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const isEmpty = (value: string | number) =>
  (value as string).trim() !== "" && (value as string).trim().length >= 3;
const isEmail = (value: string | number) =>
  emailRegex.test((value as string).toLowerCase()) &&
  (value as string).toLowerCase().trim().length >= 3;

const Login = () => {
  const navigate = useNavigate();
  const { setAuth, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(true);
const { createToast } = useContext(ToastModalContext);

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
        createToast({
          message: "Zalogowano pomyślnie",
          icon: faCircleCheck,
          type: "primary",
          timeout: 10000,
        });
        const { auth, user } = response.data;

        setAuth(auth);
        setUser({ ...user, exp: Date.now() + 86400, iat: Date.now() });

        if (auth) {
          resetForm();
          if (user.role === "client") {
            navigate("/");
          } else {
            navigate("/zarzadzanie");
          }
        } else {
          alert("Błąd logowania");
        }
      } else {
        alert("Błąd logowania");
      }
    } catch (error) {
      
      createToast({
        message: "Błąd logowania",
        type: "danger",
        icon: faCircleCheck,
        timeout: 10000,
      });
    }
  };
  const loginForm = (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">
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
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
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
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ backgroundColor: "#5DA9DB" }}
      >
        Zaloguj się
      </button>
    </form>
  );

  return (
    <>
      <main>
        <section className="section">
          <div className={`container ${styles.container}`}>
            <div
              className={`rounded p-4 bg-white ${styles["login-container"]}`}
            >
              <div className={styles.left}>
                <h1 className="text-center mb-4">LOGOWANIE DO SYSTEMU</h1>
                <p className="text-center">
                  Nie masz jeszcze konta?{" "}
                  <Link to="/rejestracja">Zarejestruj się</Link>
                </p>
                <p className="text-center">
                  Zresetuj hasło <Link to="/resetowanie">tutaj</Link>.
                </p>
              </div>
              <div className={styles.right}>
                <div className="mb-3">
                  <h2 className="text-center mb-4">
                    Wypełnij formularz logowania
                  </h2>
                  {loginForm}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
