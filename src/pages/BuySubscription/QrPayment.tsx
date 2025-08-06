import type React from "react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// interface StepThreeProps {
//   clientSecret: string;
// }

const QrPayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const user = Cookies.get("user");
  const parsedUser = JSON.parse(user || "{}");
  const userEmail = parsedUser.email;

  // console.log(userEmail, "emailInStepFour");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://yourdomain.com/payment-success", // optional
        receipt_email: userEmail,
        payment_method_data: {
          billing_details: {
            email: userEmail, // Add this to include email in billing details
          },
        },
      },
      redirect: "if_required", // prevents redirect in embedded flows
    });
    setLoading(false);
    toast.success("Payment Successful");

    if (error) {
      console.error(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment successful!", paymentIntent);
      // Show success UI or route to QR page
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements}
        className="w-full bg-green-500 text-white rounded-md py-2 px-3 mt-4"
      >
        {loading ? (
          <span className="animate-spin mr-2 h-5 w-5 border-2 rounded-full"></span>
        ) : null}
        {loading ? "Processing..." : "Complete Purchase"}
      </button>
    </form>
  );
};

export default QrPayment;
