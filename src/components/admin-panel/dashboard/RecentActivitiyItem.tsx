import React from "react";
import { GrCart } from "react-icons/gr";
import { ChevronRight } from "lucide-react";

export interface RecentItem {
  id: string;
  vendor: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  time: string;
}

interface OrderItemProps {
  item: RecentItem;
  onClick: (orderId: string) => void;
}

const RecentyActivityItem: React.FC<OrderItemProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={() => onClick(item.id)}
      className="flex flex-col lg:flex-row md:items-center justify-between md:gap-4 gap-3 md:py-4  py-3 border-b border-[#DDDDDD] cursor-pointer"
    >
      <div className="flex items-center gap-3 w-full md:w-auto">
        <GrCart className="h-6 w-6 text-[#333333] dark:text-[#FFFFFF]" />
        <div className="flex items-center gap-1 ">
          <span className="text-[#333333] dark:text-[#FFFFFF] text-base">
            Order
          </span>
          <span className="text-[#333333] dark:text-[#FFFFFF] text-base">
            #{item.id}
          </span>
        </div>
      </div>

      <div className="text-sm md:text-base text-[#203849] dark:text-[#FFFFFF] font-medium w-full md:w-auto ">
        {item.vendor}
      </div>

      <div className="text-sm md:text-base font-normal text-black dark:text-[#FFFFFF] w-full md:w-auto">
        {item.status}
      </div>

      <div className="text-black dark:text-[#FFFFFF] text-sm md:text-base  font-normal w-full md:w-auto">
        {item.time}
      </div>

      <div className="w-full md:w-auto flex justify-end lg:justify-center">
        <ChevronRight className="h-6 w-6 text-[#333333] dark:text-[#FFFFFF]" />
      </div>
    </div>
  );
};

export default RecentyActivityItem;
