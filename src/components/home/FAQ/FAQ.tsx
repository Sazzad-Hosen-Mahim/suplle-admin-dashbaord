import { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
  id: number;
  trigger: string;
  content: string;
}

const accordionData: AccordionItem[] = [
  {
    id: 1,
    trigger: "Is there a free trial available?",
    content: `Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.`,
  },
  {
    id: 2,
    trigger: "Can I change my plan later?",
    content: `Absolutely! You can upgrade or downgrade your plan at any time from your account dashboard. Changes will take effect immediately, and any billing adjustments will be prorated accordingly.`,
  },
  {
    id: 3,
    trigger: "What is your cancellation policy?",
    content: `You can cancel your subscription at any time from your account dashboard. After cancellation, you will retain access to all features until the end of your current billing period. There are no cancellation fees or hidden charges.`,
  },
  {
    id: 4,
    trigger: "Can other info be added to an invoice?",
    content: `Yes, you can add additional information such as notes, tax details, or custom fields to your invoices. This helps you tailor invoices to your business needs and provide all necessary details to your customers.`,
  },
  {
    id: 5,
    trigger: "How does billing work?",
    content: `Billing is handled automatically based on your selected plan. You’ll receive invoices via email and can also access them from your account dashboard. Payments are processed securely, and you can update your billing information or view your billing history at any time.`,
  },
  {
    id: 6,
    trigger: "How do I change my account email?",
    content: `To change your account email, go to your account settings and update your email address. You may be asked to verify the new email before the change takes effect. If you need assistance, contact our support team.`,
  },
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className=" px-4 sm:px-6 ">
      <h1 className="text-white text-center text-3xl sm:text-5xl lg:text-6xl font-bold mb-7">
        Frequently Asked{" "}
        <span className="text-primary-gradient">Questions</span>
      </h1>
      <p className="text-center text-base sm:text-xl text-gray-400 dark:text-gray-300">
        Everything you need to know about the product and billing.
      </p>

      <div className="mt-16 max-w-screen-xl w-full mx-auto mb-24">
        {accordionData.map((item) => (
          <div key={item.id} className="mb-5 border-b border-[#140d3b]">
            <motion.button
              initial={false}
              className="flex justify-between text-white items-center w-full text-lg sm:text-xl py-4"
              onClick={() => toggleItem(item.id)}
            >
              {item.trigger}
              <motion.div
                key={`icon-${item.id}`}
                initial={false}
                animate={{ rotate: 0 }}
              >
                {openItem === item.id ? (
                  <CiCircleMinus className="h-7 w-7 text-[#4b3e94]" />
                ) : (
                  <CiCirclePlus className="h-7 w-7 text-[#4b3e94]" />
                )}
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {openItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    transition: {
                      opacity: { duration: 0.3 },
                      height: { duration: 0.4 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      opacity: { duration: 0.2 },
                      height: { duration: 0.3 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-gray-400 text-base sm:text-lg break-words">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
