import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51PLpKiLf3hT6aonR3kaPwxJfnsO8Xo0dRa4EQgdMeMoAXIMKPdqV7ob9RSmYZ0NhWxFTzhK9wYiUnudxC5hBpbyB00XxvKrKAl"
);

export default stripePromise;
