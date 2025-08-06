import type { Order } from "@/Types/OrderTypes";
import React from "react";
import { FaUserFriends, FaEye, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import type { Order } from "../dashboard/dashboardItem/data/Type";

const statusStyles: Record<string, string> = {
  pending: "bg-blue-100 text-blue-800",
  inProgress: "bg-yellow-100 text-yellow-800",
  delivered: "bg-green-100 text-green-800",
  cancel: "bg-red-100 text-red-800",
  ready: "bg-green-200 text-green-800",
  preparing: "bg-orange-200 text-orange-800",
  completed: "bg-slate-200 text-slate-800",
};

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();
  const handleOrderDetails = () => {
    // Handle order details logic here
    navigate(`/dashboard/order/details/${order._id}`);
  };
  const handleOrderEdit = () => {
    // Handle order edit logic here
    navigate(`/dashboard/order/edit/${order._id}`);
  };
  return (
    <div className="bg-white dark:bg-[#161616] rounded-xl shadow-md p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-base text-[#465049] dark:text-[#FFFFFF]">
              {order._id}
            </p>
            <div className="flex items-center gap-1 text-xs dark:bg-secondary-dark bg-green-100 text-green-700 px-2 py-[2px] rounded">
              <FaUserFriends className="text-xs" />
              <span className="text-[12px] font-medium dark:text-[#FFFFFF]">
                {order.person}
              </span>
            </div>
          </div>
          {/* <p className="text-sm font-normal text-[#7D7D7D] dark:text-[#FFFFFF]">
            {order.table} • {order.orderType}
          </p> */}
        </div>
        <span
          className={`text-xs bg-[#E7F3FF] text-[#203849] px-3 py-1 rounded-full dark:text-[#FFFFFF] dark:bg-[#030303] ${
            statusStyles[order.status]
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Items List */}
      <div className="space-y-1">
        {order?.menus.map((item, index) => (
          <p
            key={index}
            className="text-sm text-[#203849] font-normal dark:text-[#FFFFFF]"
          >
            {item.menu.itemName} x {item.quantity}
          </p>
        ))}
      </div>

      {/* Time and Total */}
      <div className="flex justify-between items-center text-sm text-gray-700 border-t pt-3">
        <span className="text-xs dark:text-[#FFFFFF]">
          {new Date(order.createdAt)
            .toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(",", " -")}
        </span>
        <span className="text-base font-medium text-gray-900 dark:text-[#FFFFFF]">
          {order.total}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 text-teal-600 text-lg border-t pt-3">
        <FaEye onClick={handleOrderDetails} className="cursor-pointer" />
        <FaPen onClick={handleOrderEdit} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default OrderCard;
