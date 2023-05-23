import "./checkout.css";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/cart`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage(
        <>
          <span style={{ marginBottom: 10 }}>Payment accepted. 🎉</span> <br /> <br />
          <span>Thank you for choosing us!</span>
        </>
      );
      setPaymentCompleted(true);
    } else {
      setMessage("Unexpected error");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements || paymentCompleted} id="submit">
        <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
