import React from 'react';
import { GrCart } from "react-icons/gr";
import { ChevronRight } from 'lucide-react';
import type { Order } from './order';

interface OrderItemProps {
  order: Order;
  onClick: (orderId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onClick }) => {
  return (
    <div 
      onClick={() => onClick(order.id)}
      className="flex flex-col md:flex-row md:items-center md:justify-between  md:gap-4 gap-3 md:py-4  py-3 border-b border-[#DDDDDD] cursor-pointer"
    >
      <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-1/4  text-center">
        <GrCart className="h-6 w-6 text-[#333333] dark:text-[#FFFFFF]" />
        <div className="flex items-center gap-1 ">
          <span className="text-[#333333] dark:text-[#FFFFFF] text-base">Order</span>
          <span className="text-[#333333] dark:text-[#FFFFFF] text-base">#{order.id}</span>
        </div>
      </div>

      <div className="text-sm md:text-base text-[#203849] dark:text-[#FFFFFF] font-medium w-full md:w-1/4 items-center text-center">
        {order.vendor}
      </div>

      <div className="text-sm md:text-base font-normal text-black dark:text-[#FFFFFF] w-full md:w-1/4 items-center text-center">
        {order.status}
      </div>

      <div className="text-black dark:text-[#FFFFFF] text-sm md:text-base  font-normal w-full md:w-1/4 flex flex-col md:flex-row  justify-between   items-center text-center">
        {order.time}
        
      <div className="mt-2 md:mt-0">
        <ChevronRight className="h-6 w-6 text-[#333333] dark:text-[#FFFFFF]" />
      </div>
      </div>

    </div>
  );
};

export default OrderItem;
