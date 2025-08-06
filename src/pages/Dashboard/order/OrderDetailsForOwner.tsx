import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchOrderById } from "@/store/features/orders/orderSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdGroup, MdOutlineAccessTime } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
const OrderDetailsForOwner = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // Extract loading, error, and order from Redux state
  const { loading, error, current: order } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!order) return <div>No order found.</div>;
  console.log(order);

  // Map API fields to UI fields
  const {
    orderId,
    orderType,
    createdAt,
    status,
    menus,
    paymentMethod,
    customerName,
    customerPhone,
    specialRequest,
    person,
  } = order;

  // For compatibility with your UI
  const items = menus?.map((item) => ({
    name: item.menu?.itemName,
    quantity: item.quantity,
    priceEach: item.menu?.price,
    size: item.menu?.size,
  })) || [];

  // If you want to show subtotal/discount, you can calculate here if needed
  const subtotal = items.reduce((sum, item) => sum + (item.priceEach * item.quantity), 0);
  const discountPercent = 0; // Set this if you have discount logic
  const discount = subtotal * (discountPercent / 100);
  const totalPrice = subtotal - discount;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded-xl space-y-6 dark:bg-primary-dark">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-black dark:text-white">
          Order #{orderId}
        </h2>
        <p className="text-sm text-black font-semibold dark:text-white">
          Delivery Status : <span className="text-green-400">{status}</span>
        </p>
      </div>
      <div className="text-sm text-[#7D7D7D] flex flex-wrap gap-4 dark:text-white">
        <span>🍴 {orderType}</span>
        {/* <span className="flex flex-row items-center justify-center gap-2"><FaLocationDot /> Table {table?.capacity}</span> */}
        {/* <span ><GiFireplace /> Floor {floor?.floorName}</span> */}
        <span className="flex flex-row items-center justify-center gap-2"><MdGroup className="text-lg"/> Person: {person}</span>
        <span className="flex flex-row items-center justify-center gap-2"><IoPersonSharp className="text-md"/> Customer: {customerName} ({customerPhone})</span>
        <span className="flex flex-row items-center justify-center gap-2"><MdOutlineAccessTime /> {new Date(createdAt)
            .toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(",", " -")}</span>
      </div>
      {specialRequest && (
        <div className="text-sm text-[#7D7D7D] dark:text-white">
          <strong>Special Request:</strong> {specialRequest}
        </div>
      )}

      <div>
        <h3 className="font-normal text-black border-b pb-1 mb-3 dark:text-white">
          Order Items
        </h3>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-start border-b"
            >
              <div>
                <p className="font-normal text-black text-lg dark:text-white">
                  {item.name} x {item.quantity}
                </p>
                <p className="text-sm text-[#7D7D7D] font-normal dark:text-white">
                  Size: {item.size}
                </p>
              </div>
              <div className="text-right">
                <p className="font-normal text-black text-lg dark:text-white">
                  ${(item.quantity * item.priceEach).toFixed(2)}
                </p>
                <p className="text-sm text-[#7D7D7D] font-normal dark:text-white">
                  ${item.priceEach?.toFixed(2)} each
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg p-4">
        <h3 className="font-normal text-lg text-black mb-2 dark:text-white">
          Bill Details
        </h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-sm font-normal text-[#7D7D7D] dark:text-white">
              Subtotal
            </span>
            <span className="text-sm font-normal text-[#7D7D7D] dark:text-white">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-normal text-[#7D7D7D] dark:text-white">
              Discount
            </span>
            <span className="text-sm font-normal text-[#7D7D7D] dark:text-white">
              {discountPercent}%
            </span>
          </div>
        </div>
        <div className="mt-3 border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="mt-2 text-sm">
          <div className="flex justify-between dark:text-white">
            <span>Payment Method</span>
            <span className="text-[#7AC29C] font-normal text-sm">
              {paymentMethod?.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsForOwner;