import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  // fetchPendingQrOrders,
  changeQrOrderStatus,
  fetchAllOrders,
  fetchQrOrdersByStatus,
} from "@/store/features/admin/qrOrderSlice";

// const statusOptions = [
//   "pending",
//   "approved",
//   "processing",
//   "completed",
//   "cancel",
// ];

const statusTabs = ["all", "pending", "approved", "processing"];
const status = ["pending", "processing", "approved", "completed", "cancel"];

const QROrderComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.qrOrders);
  const [activeTab, setActiveTab] = useState("pending");

  // console.log(activeTab, "tabbbbbb");

  useEffect(() => {
    if (activeTab === "all") {
      dispatch(fetchAllOrders());
    } else {
      dispatch(fetchQrOrdersByStatus(activeTab));
    }
  }, [dispatch, activeTab]);

  // useEffect(() => {
  //   dispatch(fetchPendingQrOrders());
  // }, [dispatch]);

  const handleStatusChange = (id: string, status: string) => {
    dispatch(changeQrOrderStatus({ id, status }));
  };

  return (
    <div className="p-4">
      <h2 className="md:text-2xl text-xl text-[#333333] dark:text-[#FFFFFF] mb-6">
        QR Orders
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="lg:flex gap-4 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 my-1 rounded ${
              activeTab === tab ? "bg-primary text-white" : "bg-primary-dark text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-[#161616] rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Design</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Table Qty</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Change Status</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{order.user}</td>
                <td className="px-4 py-2">{order.qrCodeDesign}</td>
                <td className="px-4 py-2">${order.price}</td>
                <td className="px-4 py-2">{order.tableQuantity}</td>
                <td className="px-4 py-2 capitalize">{order.status}</td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    {status.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QROrderComponent;
