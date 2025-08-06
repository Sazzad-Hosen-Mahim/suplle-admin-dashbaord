import React from "react";

interface PricingCardProps {
  price: string;
  name: string;
  features: string[];
  onUpdateClick: () => void; // Changed from setShowUpdateModal
  onDeleteClick: () => void; // Changed from setShowDeleteModal
}

const PricingCard: React.FC<PricingCardProps> = ({
  price,
  name,
  features,
  onUpdateClick,
  onDeleteClick,
}) => {
  return (
    <div
      className={`flex flex-col dark:bg-[#161616]
          rounded-lg shadow-lg bg-white overflow-hidden
          transform transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-xl`}
    >
      <div className="md:px-6 py-8 px-3 flex-grow">
        <h3 className="text-center md:text-[40px] text-4xl font-medium bg-gradient-to-r from-[#56DAAB] to-[#0F9996] bg-clip-text text-transparent tracking-tight dark:text-white">
          {price}
          <span className="">/mth</span>
        </h3>
        <p className="mt-3 text-center text-lg font-normal text-[#101828] dark:text-gray-400">
          {name}
        </p>
        <ul className="mt-7 h-[140px] space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="h-[20px] w-[20px] rounded-full bg-[#D1FADF] flex items-center justify-center dark:bg-black">
                <div className="flex-shrink-0 text-[#11A8A5] dark:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.65476 0.839288L3.57995 6.70199L1.96792 4.97966C1.67097 4.69968 1.20433 4.68271 0.864951 4.92027C0.53406 5.16632 0.440732 5.59902 0.644357 5.94688L2.55334 9.05216C2.74 9.34063 3.0624 9.5188 3.42723 9.5188C3.77509 9.5188 4.10598 9.34063 4.29264 9.05216C4.59808 8.6534 10.4268 1.70469 10.4268 1.70469C11.1904 0.924131 10.2656 0.236897 9.65476 0.830803V0.839288Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              <p className="ml-3 text-sm text-[#667085] dark:text-white font-normal">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 pb-8 w-full flex justify-center items-center gap-4 mt-auto">
        <button
          className="w-full px-4 py-2 bg-gradient-to-b from-[#56DAAB] to-[#0F9996] text-white rounded-md md:text-base text-sm cursor-pointer hover:opacity-70 transition-opacity"
          onClick={onUpdateClick} // Changed to use callback
        >
          Edit
        </button>
        <button
          className="w-full px-4 py-2 bg-red-500/90 dark:bg-red-500/60 text-white rounded-md md:text-base text-sm cursor-pointer hover:opacity-70 transition-opacity"
          onClick={onDeleteClick} // Changed to use callback
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
