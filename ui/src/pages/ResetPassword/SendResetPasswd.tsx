import React, { useContext, useRef, useState } from "react"; // Zmiana importu na pełną ścieżkę do pliku "react"
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import styles from "../Logowanie.module.css";
import ToastModalContext from "../../store/toast-modal-context";
import resetPasswdService from "../../services/resetPasswd.service";
import {
  faTrashCan,
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faEarthEurope,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../components/Loader";
import classes from "./Reset.module.css";

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const isEmail = (value: string | number) =>
  emailRegex.test((value as string).toLowerCase()) &&
  (value as string).toLowerCase().trim().length >= 3;

const SendResetPasswd = () => {
  const navigate = useNavigate();
  const loading = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const { createAlertModal, alert, toast, createToast } =
    useContext(ToastModalContext);
  const [isLoading, setIsLoading] = useState(false);

  const emailInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const resetForm = () => {
    setEmail("");
    setIsFormInvalid(false);
  };

  const submitHandler = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (isFormInvalid) {
      createToast({
        type: "danger",
        message: "Formularz jest niepoprawny",
        icon: faTrashCan,
      });
      return;
    }

    setIsLoading(true);

    resetPasswdService
      .sendResetPasswdEmail(email)
      .then((response) => {
        if (response.status === 200)
          createAlertModal({
            title: "Sukces",
            message:
              "Link resetujący został wysłany na podany adres e-mail. Link wygaśnie po 24 godzinach.",
            onClose: () => {
              resetForm();
              navigate("/logowanie");
            },
          });
      })
      .catch(() => {
        createToast({
          type: "danger",
          message: "Wystąpił błąd podczas wysyłania linku resetującego",
          icon: faTrashCan,
        });
      })
      .finally(() => {
        if (!loading.current) return;

        loading.current.classList.add(classes.loaded);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  };

  const resetForm_jsx = (
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
      </div>
      <button
        type="submit"
        className={`btn btn-primary ${styles["submit-btn"]}`}
      >
        Wyślij link
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </form>
  );

  return (
    <>
      <main>
        <section className="section">
          <div className={styles.container}>
            <FontAwesomeIcon
              icon={faEarthEurope}
              className={styles["background-icon"]}
            />
            <div className={styles["login-container"]}>
              <FontAwesomeIcon
                icon={faPlane}
                className={styles["plane-icon"]}
              />
              <Link
                to="/"
                className={`text-decoration-none ${styles["back-link"]}`}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Wróć
              </Link>
              <div className={styles.header}>
                <h1 className="display-6 text-center">Resetowanie hasła</h1>
                <div className={styles["header-divider"]}></div>
              </div>
              <div className={styles.form}>
                <h5 className="text-center">Wprowadź swój adres e-mail</h5>
                {resetForm_jsx}
              </div>
              <div className={styles.links}>
                <p className="text-center">
                  Pamiętasz hasło? <Link to="/logowanie">Zaloguj się</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {alert}
      {toast}
      {isLoading && (
        <div ref={loading} className={classes.loading}>
          <Loader loadingText="Ładowanie..." />
        </div>
      )}
    </>
  );
};

export default SendResetPasswd;
