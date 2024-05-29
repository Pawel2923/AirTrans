import React, { useState } from 'react';
import styles from './formPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

const FormPage= () => {
    const [contactInfo, setContactInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setContactInfo(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/wynajemC/summary', { state: contactInfo });
    };

    return (
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
                                <label htmlFor="firstName" className="form-label">Imię:</label>
                                <input type="text" className="form-control" id="firstName" value={contactInfo.firstName} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Nazwisko:</label>
                                <input type="text" className="form-control" id="lastName" value={contactInfo.lastName} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail:</label>
                                <input type="email" className="form-control" id="email" value={contactInfo.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Nr Telefonu:</label>
                                <input type="tel" className="form-control" id="phone" value={contactInfo.phone} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Przejdź do podsumowania</button>
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
    );
};

export default FormPage;
