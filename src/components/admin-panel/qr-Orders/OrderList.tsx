import React from "react";

import OrderItem from "./OrderItem";
import type { Order, OrderStatus } from "./order";

interface OrderListProps {
  orders: Order[];
  filter: "All" | OrderStatus;
  onOrderClick: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  filter,
  onOrderClick,
}) => {
  // Filter orders based on the selected tab
  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="  overflow-hidden">
      <div className=" ">
        <h2 className="md:text-2xl text-xl text-[#333333] dark:text-[#FFFFFF]">
          Order List
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderItem key={order.id} order={order} onClick={onOrderClick} />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No orders found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
