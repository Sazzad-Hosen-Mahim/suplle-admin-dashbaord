import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import QrAllDesign from "./QrAllDesign";
import TableQuantity from "./TableQuantity";
import QrPayment from "./QrPayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PurchaseQrCode from "./PurchaseQrCode";

export interface PurchaseDetails {
  _id: string;
  qrCodeDesign: string;
  tableQuantity: number;
  price: number;
  status: string;
  createdAt: string;
  // add more fields if needed
}

// interface PurchaseResponse {
//   success: boolean;
//   status: number;
//   message: string;
//   data: PurchaseDetails;
// }

const BuySubscription = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseDetails | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>();

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const stepComponents = [
    <QrAllDesign setSelectId={setSelectedId} />,
    <TableQuantity
      selectId={selectedId}
      setPurchaseDetails={setPurchaseDetails}
      setClientSecret={setClientSecret}
    />,
    <PurchaseQrCode
      purchaseDetails={purchaseDetails}
      setClientSecret={setClientSecret}
    />,
    clientSecret ? (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <QrPayment />
      </Elements>
    ) : (
      <div>Please complete previous steps to proceed to payment.</div>
    ),
  ];
  const steps = [
    { label: "Select QR Design", description: "Purchase your plan" },
    { label: "Table Quantity", description: "How much table you want?" },
    { label: "Qr Code Purchase", description: "Purchase QR code" },
    { label: "Payment Details", description: "Complete Purchase" },
  ];

  return (
    <>
      <div className="w-full max-w-3xl px-4">
        <div className="relative flex justify-between items-center">
          {/* Line Background */}
          <div className="absolute top-5 left-0 w-full h-[5px] bg-cyan-100 z-0" />

          {/* Animated Progress Line */}
          <motion.div
            className="absolute top-5 left-0 h-[5px] bg-teal-500 z-10"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-20 flex flex-col items-center text-center cursor-pointer"
              onClick={() => setCurrentStep(index)}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  index <= currentStep
                    ? "bg-teal-500 border-teal-500 text-white"
                    : "bg-white border-cyan-300 text-cyan-400"
                } transition-colors duration-300`}
              >
                {index < currentStep ? <Check size={16} /> : index + 1}
              </div>
              <div className="mt-2 text-sm font-semibold text-gray-800 dark:text-green-100 dark:font-light">
                {step.label}
              </div>
              <div className="text-xs text-gray-500">{step.description}</div>
            </div>
          ))}
        </div>

        {/* Step Content (Optional) */}
        <div className="mt-10 space-y-1 ">
          {/* <p className="text-gray-900 dark:text-white font-normal">
            Purchase QR Codes & Subscription
          </p> */}
          {/* <p className="text-[8px] sm:text-xs text-green-800 dark:text-white  font-light">
            Generate branded QR codes for your tables and unlock powerful
            restaurant management features
          </p> */}
        </div>
        {/* ELEMENTS */}
        {/* Render step-specific child */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {stepComponents[currentStep]}
        </motion.div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-baseline items-center gap-x-5 mt-6">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
          className={cn(
            "px-8 font-light cursor-pointer py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50",
            currentStep === -1 && "cursor-not-allowed"
          )}
        >
          Back
        </button>
        <button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
          disabled={currentStep === steps.length - 1}
          className={cn(
            "px-8 font-light cursor-pointer py-2 bg-green-600 text-white rounded hover:bg-green-600 transition"
          )}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BuySubscription;
