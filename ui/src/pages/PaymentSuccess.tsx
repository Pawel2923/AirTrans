import {useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentSuccess.module.css';
import Footer from '../components/footer';
import Loader from '../components/Loader';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); 
    
    return () => clearTimeout(timer);
  }, [navigate]);
 

  const contactInfo = JSON.parse(sessionStorage.getItem('contactInfo') as string) || {

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
      
      <Loader/>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
