import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './formPage.module.css'
import { Link } from 'react-router-dom';    

const FormPage: React.FC = () => {
    return (
        <div className={styles.formContainer}>
            <header className={styles.header}>
                <h1>WPROWADŹ DANE</h1>
            </header>
            <div className="row">
                <div className="col-md-6">
                    <div className={styles.contactForm}>
                        <h2>Dane kontaktowe</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Imię:</label>
                                <input type="text" className="form-control" id="firstName" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Nazwisko:</label>
                                <input type="text" className="form-control" id="lastName" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail:</label>
                                <input type="email" className="form-control" id="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Nr Telefonu:</label>
                                <input type="tel" className="form-control" id="phone" />
                            </div>
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
                        <Link to="/rejestracja" 
                        className="btn btn-primary py-2 px-5">
                         Zarejestruj się
                        <span>&#10132;</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.payButtonContainer}>
                <button className="btn btn-primary">
                    Zapłać <span>&#10132;</span>
                </button>
            </div>
        </div>
    );
};

export default FormPage;
