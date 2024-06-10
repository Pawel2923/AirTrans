import { Router, Request, Response } from 'express';
import Stripe from 'stripe';

const stripeSecretKey = process.env['STRIPE_SECRET_KEY'];
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not defined');
}

const stripe = new Stripe(stripeSecretKey, {

});

const router = Router();

/**
 * @openapi
 * /create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     tags:
 *       - Stripe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentIntent'
 *     responses:
 *       200:
 *         description: Successfully created a payment intent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


router.post('/create-payment-intent', async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'pln',
      payment_method_types: ['card', 'p24', 'blik'],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error});
  }
});

export default router;
