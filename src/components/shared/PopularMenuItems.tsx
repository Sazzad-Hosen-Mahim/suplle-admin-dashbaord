import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import foodImage from "@/assets/food.jpg";

interface PopularMenuItemsProps {
  imageUrl: string;
  title: string;
  rating: number; // out of 5
  reviewCount: number;
  likes: string; // e.g., "12k"
}

const PopularMenuItems: React.FC<PopularMenuItemsProps> = ({
  // imageUrl,
  title,
  rating,
  reviewCount,
  likes,
}) => {
  return (
    <div className="w-[260px] bg-white dark:bg-neutral-950 rounded-xl shadow-md overflow-hidden">
      {/* Image */}
      <img
        src={foodImage}
        alt={title}
        className="w-full h-[150px] object-cover"
      />

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-lg font-medium text-gray-800 dark:text-[#FFFFFF]">
          {title}
        </h3>

        {/* Stars & Reviews */}
        <div className="flex items-center mt-1 text-sm text-gray-600">
          {/* Render stars dynamically */}
          <div className="flex text-[#DFB300] mr-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={i < rating ? "fill-current" : "opacity-30"}
              />
            ))}
          </div>
          <span className="text-[#484B52] font-normal text-xs dark:text-[#FFFFFF]">
            ( {reviewCount} Reviews )
          </span>
        </div>

        {/* Likes */}
        <div className="flex items-center gap-2 mt-5 text-sm text-teal-600 bg-teal-50 px-2 py-1 rounded-full w-fit dark:bg-neutral-950">
          <FaHeart />
          <span className="text-xs font-normal text-[#000000]dark:text-[#FFFFFF]">
            {likes} Like it
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularMenuItems;
