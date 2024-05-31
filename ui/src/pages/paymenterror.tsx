import React from 'react';
import styles from './PaymentSuccess.module.css';
import Footer from '../components/footer';

const PaymentError = () => {
  // Retrieve contact information from sessionStorage
  const contactInfo = JSON.parse(sessionStorage.getItem('contactInfo')) || {
    firstName: 'Nieznane',
    lastName: 'Nieznane',
    email: 'Nieznany',
    phone: 'Nieznany',
  };

  return (
    <div className={styles.errorContainer}>
      <header className={styles.header}>
        <h1>Płatność Nieudana</h1>
      </header>
      <div className={styles.errorContent}>
        <h2>Nie udało się przetworzyć Twojego zamówienia, {contactInfo.firstName}.</h2>
        <p>Przepraszamy, ale wystąpił problem z przetworzeniem Twojej płatności. Proszę spróbuj ponownie.</p>
        
        <h2>Dane kontaktowe</h2>
        <p>Imię: {contactInfo.firstName}</p>
        <p>Nazwisko: {contactInfo.lastName}</p>
        <p>E-mail: {contactInfo.email}</p>
        <p>Nr Telefonu: {contactInfo.phone}</p>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentError;
