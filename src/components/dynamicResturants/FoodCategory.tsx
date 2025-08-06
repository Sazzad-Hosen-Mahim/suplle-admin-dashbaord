// components/dynamicResturants/FoodCategory.tsx
import React from "react";
import Wrapper from "../shared/Wrapper";
import type { IMenuItem } from "@/Types/customerMenuTypes"; // Make sure to import your IMenuItem interface

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  menus: IMenuItem[]; // Add menus prop
};

const FoodCategory: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  menus,
}) => {
  // Extract unique categories from menus
  const categories = menus.reduce(
    (acc: { id: string; name: string }[], menu) => {
      const existingCategory = acc.find((cat) => cat.id === menu.category._id);
      if (!existingCategory) {
        acc.push({
          id: menu.category._id,
          name: menu.category.categoryName,
        });
      }
      return acc;
    },
    []
  );

  // Add "Offers" as the first category
  // { id: "offers", name: "Offers" }
  const allCategories = [...categories];

  return (
    <Wrapper>
      <div className="bg-[#F3F3F3] dark:bg-secondary-dark w-full rounded-xl p-5 mt-16">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {allCategories.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`${
                item.id === selectedCategory
                  ? "text-white bg-black"
                  : "text-white bg-[#009689]"
              } transition hover:bg-[#009689]/80 cursor-pointer hover:text-white 
                rounded-xl font-semibold text-sm sm:text-base md:text-lg lg:text-xl
                px-3 sm:px-4 py-1 whitespace-nowrap`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default FoodCategory;
