import React from "react";
import Wrapper from "../shared/Wrapper";
// import { dummyOfferData } from "@/utils/dummyOfferData";
import type { IMenuItem } from "@/Types/customerMenuTypes";

type Props = {
  selectedCategory: string;
  menus: IMenuItem[];
};

const FoodList: React.FC<Props> = ({ menus }) => {
  // const filteredFoods = dummyOfferData.filter(
  //   (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
  // );

  console.log(menus, "menus in foodlist mmmmmmmm");

  return (
    <Wrapper>
      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menus.map((food) => (
            <div
              key={food._id}
              className="w-full border border-gray-200 dark:border-primary-dark rounded-xl font-sans shadow-sm relative overflow-hidden hover:shadow-md transition-shadow bg-white dark:bg-primary-dark"
            >
              {/* Discount Badge */}
              {/* <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                -{food.}%
              </div> */}

              {/* Food Image */}
              <div className="w-full h-40 sm:h-48 md:h-52 lg:h-56 bg-gray-100 rounded-t-xl overflow-hidden">
                <img
                  src={food.image}
                  alt={food.itemName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Size and Price */}
              <div className="flex justify-between items-center mt-4 px-4">
                <span className="text-sm text-[#484B52] dark:text-white">
                  {food.size}
                </span>
                <span className="text-xl font-semibold text-[#EEBD4F]">
                  ${food.price}
                </span>
              </div>

              {/* Name */}
              <h2 className="text-lg md:text-xl font-medium text-[#393A45] dark:text-white mt-2 px-4">
                {food.itemName}
              </h2>

              {/* Description */}
              <p className="text-sm text-[#484B52] dark:text-white px-4 pt-1 pb-4 leading-relaxed">
                {food.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default FoodList;
