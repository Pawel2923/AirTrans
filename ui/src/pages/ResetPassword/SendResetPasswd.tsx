import React, { useContext, useRef, useState } from "react"; // Zmiana importu na pełną ścieżkę do pliku "react"
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import styles from "../Logowanie.module.css";
import ToastModalContext from "../../store/toast-modal-context";
import resetPasswdService from "../../services/resetPasswd.service";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
            message: "Link resetujący został wysłany na podany adres e-mail. Link wygaśnie po 24 godzinach.",
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

  return (
    <>
      <main style={{ backgroundColor: "#f0f0f0" }}>
        <section className="section">
          <div className={`container ${styles.container}`}>
            <div className={styles["login-container"]}>
              <div className={styles.left}>
                <h1 className="display-6 text-center">RESETOWANIE HASŁA</h1>
                <p className="text-center m-0">
                  <Link to="/logowanie">Przejdź do logowania</Link>.
                </p>
              </div>
              <div className={styles.right}>
                <div className="mb-3">
                  <h5>Wprowadź swój adres e-mail</h5>
                  <form onSubmit={submitHandler}>
                    <div className={styles["form-container"]}>
                      <div className={styles["form-group"]}>
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
                      className="btn btn-primary"
                      style={{ backgroundColor: "#5DA9DB" }}
                    >
                      Wyślij link resetujący
                    </button>
                  </form>
                </div>
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
