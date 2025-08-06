import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
// import StepOne from "./StepOne";
import { cn } from "@/lib/utils";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepTwoPointFive from "./StepTwoPointFive";
// import QrDesign from "./QrDesign";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const steps = [
  // { label: "Qr Codes", description: "Select your QR code" },
  { label: "Standard Plan", description: "Purchase your plan" },
  { label: "Select Month", description: "Select your preferred month" },
  { label: "Payment Details", description: "Complete Purchase" },
];

export default function MultiStep() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("1");
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const stepComponents = [
    <StepTwo selectedId={selectedPlanId} setSelectedId={setSelectedPlanId} />,
    <StepTwoPointFive
      planId={selectedPlanId}
      month={selectedMonth}
      setMonth={setSelectedMonth}
      setClientSecret={setClientSecret}
    />,
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {clientSecret && <StepThree />}
    </Elements>,
  ];

  // console.log(subscriptions);
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
        {/* <div className="mt-10 space-y-1 ">
          <p className="text-gray-900 dark:text-white  font-normal">
            Purchase QR Codes & Subscription
          </p>
          <p className="text-[8px] sm:text-xs text-green-800 dark:text-white  font-light">
            Generate branded QR codes for your tables and unlock powerful
            restaurant management features
          </p>
        </div> */}
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
            currentStep === 0 && "cursor-not-allowed"
          )}
        >
          Back
        </button>
        <button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
          disabled={
            (currentStep === 0 && !selectedPlanId) ||
            (currentStep === 1 && !clientSecret) || // << disable when no month confirmed
            currentStep === steps.length - 1
          }
          className={cn(
            "px-8 font-light cursor-pointer py-2 bg-green-600 text-white rounded hover:bg-green-600 transition",
            currentStep === 2 && "hidden"
          )}
        >
          Next
        </button>
      </div>

      {/* <QrDesign /> */}
    </>
  );
}
