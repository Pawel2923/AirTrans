import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements, P24BankElement } from '@stripe/react-stripe-js';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [paymentMethodType, setPaymentMethodType] = useState<'card' | 'p24'>('card');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const location = useLocation();
  const { totalPrice } = location.state as { totalPrice: number };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (paymentMethodType === 'card') {
      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        });

        if (error) {
          setError(error.message || 'Payment failed');
          setSuccess(false);
        } else {
          try {
            const response = await fetch('http://localhost:6868/stripe/create-payment-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount: totalPrice * 100 }),
            });

            const { clientSecret } = await response.json();

            const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
              payment_method: paymentMethod.id,
            });

            if (confirmError) {
              setError(confirmError.message || 'Payment confirmation failed');
              setSuccess(false);
            } else {
              setError(null);
              setSuccess(true);
              console.log('Payment successful');
              navigate('/payment/success');
            }
          } catch (error) {
            setError('An error occurred while processing your payment');
            setSuccess(false);
          }
        }
      }
    } else if (paymentMethodType === 'p24') {
      const p24Element = elements.getElement(P24BankElement);

      if (p24Element) {
        try {
          const response = await fetch('http://localhost:6868/stripe/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: totalPrice * 100 }),
          });

          const { clientSecret } = await response.json();

          const { error: confirmError } = await stripe.confirmP24Payment(clientSecret, {
            payment_method: {
              p24: p24Element,
              billing_details: {
                name,
                email,
              },
            },
            return_url: 'http://localhost:3000/payment/success',
          });

          if (confirmError) {
            setError(confirmError.message || 'Payment confirmation failed');
            setSuccess(false);
          } else {
            setError(null);
            setSuccess(true);
            console.log('Payment successful');
            navigate('/payment/success');
          }
        } catch (error) {
          setError('An error occurred while processing your payment');
          setSuccess(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-element">Card Details</label>
        <CardElement id="card-element" className="stripe-element card-element" />
      </div>
      <div className="form-group">
        <label htmlFor="p24-element">Przelewy24</label>
        <P24BankElement id="p24-element" className="stripe-element" />
      </div>
      <div className="form-group">
        <label htmlFor="payment-method-type">Payment Method</label>
        <select
          id="payment-method-type"
          value={paymentMethodType}
          onChange={(e) => setPaymentMethodType(e.target.value as 'card' | 'p24')}
        >
          <option value="card">Card</option>
          <option value="p24">Przelewy24</option>
        </select>
      </div>
      <button type="submit" disabled={!stripe}>
        Pay {totalPrice} PLN
      </button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Payment Successful!</div>}
    </form>
  );
};

export default CheckoutForm;
