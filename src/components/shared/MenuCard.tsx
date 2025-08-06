import React from "react";
import foodImage from "@/assets/food.jpg";

interface MenuCardProps {
  title: string;
  size: string;
  availability: string;
  price: string;
  description: string;
  imageUrl: string;
}

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  size,
  availability,
  price,
  description,
}) => {
  return (
    <div className="w-[260px] h-[228px] bg-white dark:bg-[#161616] rounded-xl shadow p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-medium text-[#333333] dark:text-[#FFFFFF]">
            {title}
          </h3>
          <p className="text-sm font-normal text-[#333333] dark:text-[#FFFFFF]">
            {size}
          </p>
          <p className="text-base font-medium text-[#333333] dark:text-[#FFFFFF]">
            {availability}
          </p>
          <p className="text-2xl font-medium text-[#EEBD4F] mt-3">{price}</p>
        </div>
        <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden">
          <img
            src={foodImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-white bg-opacity-60 rounded-tl-4xl px-3 py-2">
            <span className="text-white rounded-full bg-black text-lg font-bold">
              +
            </span>
          </div>
        </div>
      </div>
      <p className="text-base font-normal text-[#333333] mt-4 dark:text-[#FFFFFF]">
        {description}
      </p>
    </div>
  );
};

export default MenuCard;
