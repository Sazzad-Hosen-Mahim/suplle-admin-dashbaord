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
import axios from "axios";

// interface StepThreeProps {
//   clientSecret: string;
// }

const StepThree = () => {
  const stripe = useStripe();
  const elements = useElements();

  const user = Cookies.get("user");
  const token = Cookies.get("accessToken");
  const parsedUser = JSON.parse(user || "{}");
  const userEmail = parsedUser.email;

  // console.log(userEmail, "emailInStepFour");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://yourdomain.com/payment-success", // replace with your actual return URL
          receipt_email: userEmail, // dynamically use the user's email
          payment_method_data: {
            billing_details: {
              email: userEmail,
            },
          },
        },
        redirect: "if_required", // this is for redirecting in case additional authentication is needed
      });

      if (error) {
        console.error(error.message);
        toast.error("Payment failed!");
      } else if (paymentIntent?.status === "succeeded") {
        console.log("Payment successful!", paymentIntent);

        // Send the paymentIntent ID to your backend to activate the subscription
        const response = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/subscription/activate-subscription`,
          { paymentIntentId: paymentIntent.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ?? "",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Subscription activated!");
        } else {
          toast.error("Failed to activate subscription.");
        }
      }
    } catch (error) {
      console.error("Error confirming payment", error);
      toast.error("Payment confirmation failed");
    } finally {
      setLoading(false);
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

export default StepThree;
