import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Logowanie.module.css";
import ToastModalContext from "../../store/toast-modal-context";
import resetPasswdService from "../../services/resetPasswd.service";
import Loader from "../../components/Loader";
import Input from "../../components/input";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const isEmpty = (value: string | number) =>
  (value as string).trim() !== "" && (value as string).trim().length >= 3;

const VerifyResetPasswd = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { createAlertModal, alert, toast, createToast } =
    useContext(ToastModalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  useEffect(() => {
    if (token === undefined) {
      navigate("/logowanie");
      return;
    }

    resetPasswdService
      .verifyToken(token)
      .then((response) => {
        if (response.status === 200) {
          setIsTokenValid(true);
        }
      })
      .catch((error) => {
        let errorMessage = "Wystąpił błąd przy werfikacji tokenu";

        switch (error.response.status) {
          case 404:
            errorMessage = "Nieprawidłowy token";
            break;
          case 409:
            errorMessage = "Token został już użyty";
            break;
          case 410:
            errorMessage = "Token wygasł";
            break;
          case 500:
            errorMessage = "Wystąpił błąd serwera";
            break;
          default:
            errorMessage = "Wystąpił błąd przy werfikacji tokenu";
            break;
        }

        createAlertModal({
          title: "Błąd",
          message: errorMessage,
          onClose: () => {
            navigate("/logowanie");
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [createAlertModal, navigate, token]);

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

  const resetForm = () => {
    setPassword("");
    setRepeatPassword("");
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

    if (password !== repeatPassword) {
      createToast({
        type: "danger",
        message: "Hasła nie są identyczne",
        icon: faTrashCan,
      });
      return;
    }

    if (!token) {
      createAlertModal({
        title: "Błąd",
        message: "Brak tokenu",
      });
      return;
    }

    resetPasswdService
      .resetPasswd(token, password)
      .then((response) => {
        if (response.status === 200) {
          resetForm();
          createAlertModal({
            title: "Sukces",
            message: "Hasło zostało zmienione",
            onClose: () => {
              navigate("/logowanie");
            },
          });
        }
      })
      .catch(() => {
        createAlertModal({
          title: "Błąd",
          message: "Wystąpił błąd podczas zmiany hasła",
        });
      });
  };

  return (
    <>
      <main style={{ backgroundColor: "#f0f0f0" }}>
        <section className="section">
          <div className={`container ${styles.container}`}>
            <div
              className={styles["login-container"]}
              style={{ padding: "2.5rem 5rem" }}
            >
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  isTokenValid && (
                    <>
                      <h2 className="title is-2">Utwórz nowe hasło</h2>
                      <form
                        onSubmit={submitHandler}
                        className="d-flex flex-column gap-2"
                      >
                        <div className={`${styles["form-group"]} m-0`}>
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
                        <div className={`${styles["form-group"]} m-0`}>
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
                        <button
                          type="submit"
                          className="btn btn-primary mt-2 align-self-center"
                          style={{ backgroundColor: "#5DA9DB", width: "50%" }}
                        >
                          Zapisz
                        </button>
                      </form>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      {alert}
      {toast}
    </>
  );
};

export default VerifyResetPasswd;
