import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './formPayment.module.css'; 
import parkingService from '../services/parking.service';
import rentalService from '../services/rental.service';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const location = useLocation();
  const { totalPrice } = location.state as { totalPrice: number };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });

      if (paymentMethod.error) {
        throw new Error(paymentMethod.error.message || 'Payment failed');
      }

      const response = await fetch('http://localhost:6868/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      });

      const { clientSecret } = await response.json();

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message || 'Payment confirmation failed');
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setError(null);
        setSuccess(true);

        saveRentalCar();
        saveReservation();
      
        navigate('/payment/success');
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setError('An error occurred while processing your payment');
      setSuccess(false);
      console.error(error); // Log the error for debugging
      navigate('/payment/error');
    }
  };

  const saveRentalCar = async () => {
    const rentalDates = JSON.parse(sessionStorage.getItem('rentalDates') || '{}') || {};
    const since = new Date(rentalDates.startDate);
    const until = new Date(rentalDates.endDate);
    const carId = sessionStorage.getItem('carId') || '';
    const id = sessionStorage.getItem('userId') || '';

    const carRental = {
      id: 0,
      Cars_id: parseInt(carId),
      Users_id: parseInt(id),
      status: 'Rented',
      since: since.toISOString().slice(0, 19).replace('T', ' '),
      until: until.toISOString().slice(0, 19).replace('T', ' '),
    };

    try {
      if (carRental.Cars_id && carRental.since && carRental.until) {
        const response = await rentalService.createRental({ ...carRental, status: 'RENTED' });
        console.log('Rental created:', response);
      } else {
        console.error('Missing required fields:', carRental);
      }
    } catch (error) {
      console.error('Error creating rental:', error);
    }
  }

  const saveReservation = async () => {
    const reservationDates = JSON.parse(sessionStorage.getItem('reservationDates') || '{}') || {};
    const sinceDate = new Date(reservationDates.startDate);
    const untilDate = new Date(reservationDates.endDate);
    const licensePlate = sessionStorage.getItem('licensePlate') || '';
    const parkingLevel = sessionStorage.getItem('parkingLevel') || '';
    const spaceId = sessionStorage.getItem('spaceId') || '';
    const id = sessionStorage.getItem('userId') || '';

    const parkingReservation = {
      pid: 0,
      parking_level: parkingLevel,
      space_id: spaceId,
      Users_id: parseInt(id),
      status: 'Reserved',
      license_plate: licensePlate,
      since: sinceDate.toISOString().slice(0, 19).replace('T', ' '),
      until: untilDate.toISOString().slice(0, 19).replace('T', ' '),
    };

    try {
      if (parkingReservation.parking_level && parkingReservation.license_plate && parkingReservation.since && parkingReservation.until) {
        const response = await parkingService.createParking({ ...parkingReservation, status: 'RESERVED' });
        console.log('Reservation created:', response);
      } else {
        console.error('Missing required fields:', parkingReservation);
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
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
