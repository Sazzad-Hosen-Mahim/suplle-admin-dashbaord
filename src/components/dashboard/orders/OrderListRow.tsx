import React from "react";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Order } from "@/Types/OrderTypes";

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

const OrderListRow: React.FC<OrderCardProps> = ({ order }) => {
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
    <tr className="border-b text-sm text-[#2A3342] dark:text-[#FFFFFF] ">
      <td className="py-3 px-4 font-medium">{order._id}</td>
      <td>
        {typeof order.table === "string"
          ? order.table
          : order.table?.name || order.table?._id || ""}
      </td>
      <td className="py-3 px-4 font-semibold">{order.orderType}</td>
      <td className="py-3 px-4">
        {order?.menus?.map((item, index) => (
          <p key={index}>
            {index + 1}. {item.menu.itemName}
          </p>
        ))}
      </td>
      <td className="py-3 px-4">
        {order?.menus?.map((item, index) => (
          <p key={index}>{item.quantity}</p>
        ))}
      </td>
      <td className="py-3 px-4">
        {order.menus.map((item, index) => (
          <p key={index}>${item.menu.price}</p>
        ))}
      </td>
      <td className="py-3 px-4">$ {order?.total}</td>
      <td className="py-3 px-4">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            statusStyles[order.status]
          }`}
        >
          {order.status}
        </span>
      </td>
      <td className="py-3 px-4 flex items-center gap-2">
        <Eye
          onClick={handleOrderDetails}
          size={16}
          className="text-green-600 cursor-pointer"
        />
        <span className="text-gray-300">|</span>
        <Pencil
          onClick={handleOrderEdit}
          size={16}
          className="text-green-600 cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default OrderListRow;
