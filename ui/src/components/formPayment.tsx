import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './formPayment.module.css'; 
import parkingService from '../services/parking.service';
import rentalService from '../services/rental.service';
import emailService from '../services/email.service';
import { Email,ParkingReservations } from '../assets/Data.d';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const location = useLocation();
  const { totalPrice } = location.state as { totalPrice: number };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      setError("Stripe has not loaded correctly.");
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      setError("Card element is not available.");
      return;
    }
  
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { name, email },
      });
  
      if (paymentMethod.error) {
        throw new Error(paymentMethod.error.message || 'Payment method creation failed');
      }
  
      const response = await fetch('http://localhost:6868/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }
  
      const { clientSecret } = await response.json();
  
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.paymentMethod.id,
      });
  
      if (confirmError) {
        throw new Error(confirmError.message || 'Payment confirmation failed');
      }
  
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setError(null);
        setSuccess(true);
  
        const licensePlate = sessionStorage.getItem('licensePlate');
        const carId = sessionStorage.getItem('carId');
  
        if (licensePlate) {
          saveReservation();
        } else if (carId) {
          saveRentalCar();
        } else {
          console.error('Neither rental car nor parking reservation information found in session storage.');
          navigate('/payment/error');
        }
        setPaymentSuccess(true);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      navigate('/payment/error');
      sessionStorage.removeItem('licensePlate');
      sessionStorage.removeItem('carId');
      sessionStorage.removeItem('reservationDates');
      sessionStorage.removeItem('rentalDates');
      sessionStorage.removeItem('parkingLevel');
      sessionStorage.removeItem('spaceId');
      sessionStorage.removeItem('userId');
    }
  };
  
  
  useEffect(() => {
    if (success && paymentSuccess) {
      navigate('/payment/success');
      sessionStorage.removeItem('licensePlate');
      sessionStorage.removeItem('carId');
      sessionStorage.removeItem('reservationDates');
      sessionStorage.removeItem('rentalDates');
      sessionStorage.removeItem('parkingLevel');
      sessionStorage.removeItem('spaceId');
      sessionStorage.removeItem('userId');
    }
  }, [success, paymentSuccess, navigate]);

  const saveRentalCar = async () => {
    const rentalDates = JSON.parse(sessionStorage.getItem('rentalDates') || '{}');
    if (!rentalDates.startDate || !rentalDates.endDate) {
      console.error('Rental dates are missing');
      navigate('/payment/error');
      return;
    }

    const since = new Date(rentalDates.startDate);
    const until = new Date(rentalDates.endDate);
    const carId = sessionStorage.getItem('carId');
    const userId = sessionStorage.getItem('userId');

    if (!carId || !userId) {
      console.error('Car ID or User ID is missing');
      navigate('/payment/error');
      return;
    }

    const carRental = {
      id: 0,
      Cars_id: parseInt(carId),
      Users_id: parseInt(userId),
      status: 'RENTED',
      since: since.toISOString().slice(0, 19).replace('T', ' '),
      until: until.toISOString().slice(0, 19).replace('T', ' '),
    };

    try {
      const response = await rentalService.createRental({ ...carRental, status: 'RENTED' });
      sendConfirmationEmailC();
      console.log('Rental created:', response);
    } catch (error) {
      console.error('Error creating rental:', error);
      navigate('/payment/error');
    }
  };

  const saveReservation = async () => {
    const reservationDates = JSON.parse(sessionStorage.getItem('reservationDates') || '{}');
    if (!reservationDates.startDate || !reservationDates.endDate) {
      console.error('Reservation dates are missing');
      navigate('/payment/error');
      return;
    }
  
    const sinceDate = new Date(reservationDates.startDate);
    const untilDate = new Date(reservationDates.endDate);
    const licensePlate = sessionStorage.getItem('licensePlate');
    const parkingLevel = sessionStorage.getItem('parkingLevel');
    const spaceId = sessionStorage.getItem('spaceId');
    const userId = sessionStorage.getItem('userId');
  
    if (!licensePlate || !parkingLevel || !spaceId || !userId) {
      console.error('Missing reservation details');
      navigate('/payment/error');
      return;
    }
  
    const parkingReservation: ParkingReservations = {
      id: 0,
      parking_level: parkingLevel,
      space_id: spaceId,
      Users_id: parseInt(userId),
      status: undefined,
      license_plate: licensePlate,
      since: sinceDate.toISOString().slice(0, 19).replace('T', ' '),
      until: untilDate.toISOString().slice(0, 19).replace('T', ' '),
    };
  
    try {
      const response = await parkingService.createParking({ ...parkingReservation, status: 'RESERVED' });
      sendConfirmationEmail();
      console.log('Reservation created:', response);
    } catch (error) {
      console.error('Error creating reservation:', error);
      navigate('/payment/error');
    }
  };
  
  const sendConfirmationEmail = async () => {
    try {
      const emailContent: Email = {
        to: email,
        title: 'Potwierdzenie rezerwacji',
        subject: 'Potwierdzenie rezerwacji',
        text: `Twoja rezerwacja została potwierdzona. Dziękujemy za skorzystanie z naszych usług.`,
        content: `Twoja rezerwacja została potwierdzona. Dziękujemy za skorzystanie z naszych usług. Pamiętaj, że rezerwacja jest ważna od momentu rozpoczęcia do zakończenia okresu rezerwacji.
        Aby uzyskać więcej szczegółów dotyczących Twojej rezerwacji, zapraszamy do odwiedzenia panelu użytkownika.`,
      };

      const response = await emailService.sendEmail(emailContent);

      if (response.status === 200) {
        console.log("E-mail potwierdzający został wysłany na podany adres e-mail.");
      } else {
        throw new Error('Failed to send confirmation email');
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const sendConfirmationEmailC = async () => {
    try {
      const emailContent: Email = {
        to: email,
        title: 'Potwierdzenie wynajmu samochodu',
        subject: 'Potwierdzenie wynajmu samochodu',
        text: `Twoja rezerwacja samochodu została potwierdzona. Dziękujemy za skorzystanie z naszych usług.`,
        content: `Twoja rezerwacja samochodu została potwierdzona. Dziękujemy za skorzystanie z naszych usług. Pamiętaj, że rezerwacja jest ważna od momentu rozpoczęcia do zakończenia okresu rezerwacji.
        Aby uzyskać więcej szczegółów dotyczących Twojej rezerwacji, zapraszamy do odwiedzenia panelu użytkownika.`,
      };

      const response = await emailService.sendEmail(emailContent);

      if (response.status === 200) {
        console.log("E-mail potwierdzający został wysłany na podany adres e-mail.");
      } else {
        throw new Error('Failed to send confirmation email');
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mx-auto my-5 p-4" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4">Zapłać teraz</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Imię</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="payment-method-type">Wybierz metodę płatności</label>
            <select
              id="payment-method-type"
              className="form-control"
              value="card"
              onChange={() => {}}
              disabled
            >
              <option value="card">Karta</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="card-element">Szczegóły Karty</label>
            <CardElement id="card-element" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-4" disabled={!stripe}>
            Zapłać {totalPrice} PLN
          </button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">Płatność zakończona sukcesem!</div>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
