import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export default stripe;

export async function createPaymentIntent(amount: number, currency: string = "usd") {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method_types: ['card', 'paypal'],
      automatic_payment_methods: {
        enabled: false,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

export async function confirmPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error("Error confirming payment intent:", error);
    throw new Error("Failed to confirm payment intent");
  }
}