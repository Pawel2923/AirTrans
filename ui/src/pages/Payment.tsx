import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './stipeContainer';
import CheckoutForm from '../components/formPayment';

const Payment=() => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
