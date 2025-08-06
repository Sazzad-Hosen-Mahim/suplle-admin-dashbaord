import { useAppDispatch } from "@/hooks/useRedux";
import { fetchRestaurants } from "@/store/features/restaurant/restaurantSlice";
import React from "react";
import { toast } from "react-toastify";

const RestaurantForm = () => {
  const dispatch = useAppDispatch();
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const restaurant = formData.get("restaurant");
    const email = formData.get("email");
    const address = formData.get("address");
    const image = formData.get("image") as File;
    const imageName = image.name;
    const data = {
      restaurant,
      email,
      address,
      imageName,
    };
    console.log(data, "17 no");
    toast.success("Restaurant details saved successfully");
    dispatch(fetchRestaurants());
    form.reset();
  };
  return (
    <div className="mt-4 font-rubik">
      <h1 className="font-rubik text-sm sm:text-[18px] ">Restaurant Details</h1>
      <section className="mt-4">
        <form onSubmit={handleForm} className="space-y-5">
          <div className="">
            <label className="text-[10px] sm:text-[14px]">
              Restaurant Name
            </label>
            <input
              name="restaurant"
              type="text"
              placeholder="Enter Restaurant Name"
              className="w-full rounded p-2 bg-white dark:bg-primary-dark dark:text-green-50 mt-3 text-[12px] sm:text-[14px] text-green-900 focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>
          <div className="">
            <label className="text-[10px] sm:text-[14px]">E-mail</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded p-2 dark:bg-primary-dark dark:text-green-50 bg-white mt-3 text-[12px] sm:text-[14px] text-green-900 focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>
          <div className="">
            <label className="text-[10px] sm:text-[14px]">Address</label>
            <textarea
              name="address"
              cols={20}
              rows={5}
              placeholder="Enter address"
              className="w-full rounded p-2 dark:bg-primary-dark dark:text-green-50 bg-white mt-3 text-[12px] sm:text-[14px] text-green-900 focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>
          <div className="">
            <label className="text-[10px] sm:text-[14px]">Image</label>
            <input
              name="image"
              type="file"
              placeholder="Paste image URl or upload"
              className="w-full rounded p-2 dark:bg-primary-dark dark:text-green-50 bg-white mt-3 text-[12px] sm:text-[14px] text-green-900 focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 cursor-pointer font-light py-2.5 px-5 rounded text-white text-sm sm:text-[14px]"
          >
            Save Restaurant
          </button>
        </form>
      </section>
    </div>
  );
};

export default RestaurantForm;
