import { useState, useEffect } from "react";

const Story = () => {
  const [users, setUsers] = useState<number>(0);
  const [restaurants, setRestaurants] = useState<number>(0);
  const [orders, setOrders] = useState<number>(0);

  const animateNumber = (
    setNumber: React.Dispatch<React.SetStateAction<number>>,
    target: number,
    duration: number
  ) => {
    let start = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setNumber(target);
        clearInterval(timer);
      } else {
        setNumber(Math.floor(start));
      }
    }, 50);
  };

  useEffect(() => {
    animateNumber(setUsers, 10000, 2000);
    animateNumber(setRestaurants, 500, 1500);
    animateNumber(setOrders, 3000, 1800);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-10 overflow-hidden ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl text-white lg:text-6xl font-bold leading-tight">
            Numbers <span className="text-primary-gradient">Are Telling</span>{" "}
            Our Story
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Suplle is transforming how restaurants, pubs, and bars operate — and
            the numbers speak for themselves.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 relative">
          {/* <div className="bg-[url('/background/Ellipse33.svg')] bg-no-repeat bg-center bg-contain w-full h-full"> */}
          <div className="relative border border-[#231959] w-full max-w-md mx-auto rounded-2xl shadow-lg py-10 px-6 sm:px-10">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-5xl sm:text-6xl font-bold text-[#540595db]">
                  {users.toLocaleString()}+
                </h2>
                <p className="text-gray-300 mt-2 dark:text-gray-300">
                  Active Users
                </p>
              </div>

              <hr className="border-0 h-px bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9]" />

              <div>
                <h2 className="text-5xl sm:text-6xl font-bold text-[#540595db]">
                  {restaurants.toLocaleString()}+
                </h2>
                <p className="text-gray-300 mt-2 dark:text-gray-300">
                  Restaurants Onboarded
                </p>
              </div>

              <hr className="border-0 h-px bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9]" />

              <div>
                <h2 className="text-5xl sm:text-6xl font-bold text-[#540595db]">
                  {orders.toLocaleString()}+
                </h2>
                <p className="text-gray-300 mt-2 dark:text-gray-300">
                  Orders Processed Monthly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Story;
