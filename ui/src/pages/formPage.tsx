import React, { useEffect, useState, useContext } from "react";
import styles from "./formPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import AuthContext from "../store/auth-context";
import useGetUsers from "../hooks/users/useGetUsers";

const FormPage= () => {
  const { user } = useContext(AuthContext);
  const { usersData: userInfo, getUserByEmail } = useGetUsers();
  const [contactInfo, setContactInfo] = useState({
    id:0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUserByEmail(user.email);
    }
  }, [getUserByEmail, user]);

  useEffect(() => {
    if (userInfo && userInfo.length > 0) {
      setContactInfo({
        id: userInfo[0].id as number,
        firstName: userInfo[0].first_name as string,
        lastName: userInfo[0].last_name as string,
        email: userInfo[0].email,
        phone: userInfo[0].phone_number as string,
      });
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setContactInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/WynajemC/summary", { state: contactInfo });
  };
  const handleBack = () => {
    navigate(-1); 
};
  return (
    <>
      <Nav />
      <div className={styles.formContainer}>
        <header className={styles.header}>
          <h1>WPROWADŹ DANE</h1>
        </header>
        <div className="row">
          <div className="col-md-6">
            <div className={styles.contactForm}>
              <h2>Dane kontaktowe</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Imię:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={contactInfo.firstName}
                    onChange={handleChange}
                    disabled={!!user}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Nazwisko:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={contactInfo.lastName}
                    onChange={handleChange}
                    disabled={!!user}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={contactInfo.email}
                    onChange={handleChange}
                    disabled={!!user}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Nr Telefonu:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={contactInfo.phone}
                    onChange={handleChange}
                    disabled={!!user}
                  />
                </div>
                <button className="btn btn-secondary" onClick={handleBack} style={{ fontWeight: 'bold' }}>
                <span>&#10229;</span> Wróć
                </button>
                <button type="submit" className="btn btn-primary">
                  Przejdź do podsumowania
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.registerBox}>
              <h2>Załóż konto</h2>
              <ul>
                <li>Zapisz swoje dane kontaktowe</li>
                <li>Przeglądaj listę swoich wypożyczeń</li>
                <li>Zarządzaj rezerwacjami miejsc parkingowych</li>
              </ul>
              <Link to="/rejestracja" className="btn btn-primary py-2 px-5">
                Zarejestruj się
                <span>&#10132;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPage;
