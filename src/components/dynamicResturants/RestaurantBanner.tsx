import { Clock3, Bike, ClipboardList } from "lucide-react"; // Or your own icons
import Wrapper from "../shared/Wrapper";

const RestaurantBanner = () => {
  return (
    <Wrapper>
      <div className="px-5">
        <div className="w-full bg-cover rounded-2xl relative bg-no-repeat bg-center  bg-[url(/dynamicResturents/Rectangle-44.png)]">
          <div className="flex flex-col px-5 md:flex-row justify-between items-center bg-white/90 dark:bg-primary-dark/70  p-6 md:p-10 rounded-2xl shadow-lg">
            {/* Left Section */}
            <div className="flex-1 space-y-4">
              <p className="text-xl text-[#03081F] dark:text-white font-normal">
                I'm loving' it!
              </p>
              <h2 className="text-5xl font-semibold text-[#03081F] dark:text-white">
                Urban Bistro Menu
              </h2>

              {/* Badges */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                <div className="flex items-center bg-black text-white px-4 py-2 rounded-full text-lg">
                  <ClipboardList size={18} className="mr-2" />
                  Minimum Order: 12 USD
                </div>
                <div className="flex items-center bg-black text-white px-4 py-2 rounded-full text-lg">
                  <Bike size={18} className="mr-2" />
                  Delivery in 20–25 Minutes
                </div>
              </div>

              {/* Open Tag */}
              <div className="mt-4 absolute -bottom-5 left-0">
                <span className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg text-lg font-semibold">
                  <Clock3 size={20} className="mr-2" />
                  Open until 3:00 AM
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="relative mt-10 md:mt-0 md:ml-8">
              <img
                src="/dynamicResturents/Rectangle-44.png"
                alt="Burger Meal"
                className="w-[300px] md:w-[360px] rounded-lg object-cover"
              />

              {/* Rating Card */}
              <div className="absolute -bottom-3 -left-6 bg-white px-4 py-2 rounded-xl shadow-md text-center">
                <p className="text-6xl font-bold dark:text-[#03081F]">3.4</p>
                <div className="flex justify-center text-yellow-500">
                  {"★".repeat(3)}
                  {"☆".repeat(2)}
                </div>
                <p className="text-base text-[#484B52]">1,340 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default RestaurantBanner;
