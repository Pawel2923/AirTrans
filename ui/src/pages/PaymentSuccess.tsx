import React from 'react';
import styles from './PaymentSuccess.module.css';
import Footer from '../components/footer';

const PaymentSuccess = () => {
  // Retrieve contact information from sessionStorage
  const contactInfo = JSON.parse(sessionStorage.getItem('contactInfo')) || {
    firstName: 'Nieznane',
    lastName: 'Nieznane',
    email: 'Nieznany',
    phone: 'Nieznany',
  };

  return (
    <div className={styles.successContainer}>
      <header className={styles.header}>
        <h1>Płatność Udana!</h1>
      </header>
      <div className={styles.successContent}>
        <h2>Twoje zamówienie zostało przetworzone, {contactInfo.firstName}!</h2>
        <p>Dziękujemy za dokonanie płatności. Twoje zamówienie zostało pomyślnie zrealizowane.</p>
        
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

export default PaymentSuccess;
