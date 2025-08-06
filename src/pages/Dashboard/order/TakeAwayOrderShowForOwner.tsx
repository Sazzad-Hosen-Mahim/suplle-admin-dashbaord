import type { Order } from "@/Types/OrderTypes";
import OrderListRow from "@/components/dashboard/orders/OrderListRow";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "@/components/icons/ListIcon";
import InputComponent from "@/components/shared/input/auth/TextInput";
import OrderCard from "@/components/shared/OrderCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchOrders } from "@/store/features/orders/orderSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function TakeAwayOrderShowForOwner() {
  const { register } = useForm();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const filtered = data
      .filter((order) => order.orderType === "take away")
      .filter((order) => {
        // Status filter
        if (statusFilter !== "all") {
          const orderStatus = order.status?.toLowerCase().trim();
          const filterStatus = statusFilter.toLowerCase().trim();
          if (orderStatus !== filterStatus) {
            return false;
          }
        }

        // Search filter
        if (searchQuery) {
          const searchTerm = searchQuery.toLowerCase().trim();
          
          // Check food items
          const foodItemsMatch = order.menus?.some(
            (menuItem) => menuItem.menu?.itemName?.toLowerCase().includes(searchTerm)
          );

          // Check order ID
          const orderIdMatch = order.orderId?.toLowerCase().includes(searchTerm);

          return foodItemsMatch || orderIdMatch;
        }

        return true;
      });

    setFilteredOrders(filtered);
    console.log("Filtered orders:", filtered);
  }, [data, statusFilter, searchQuery]);

  const handleCreateOrder = () => {
    navigate("/dashboard/order/create");
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
        <h5 className="text-[#333333] dark:text-white text-xl font-medium">
          Takeaway Orders
        </h5>
        <Button onClick={handleCreateOrder}>+ Add Order</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-5 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row w-[70%]">
          <div className="w-1/2">
            <p className="text-base dark:text-white font-normal text-[#203849]">
              Order Status
            </p>
            <Select onValueChange={handleStatusChange} value={statusFilter}>
              <SelectTrigger className="h-[42px]">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer">
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancel">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/2 flex flex-row items-center justify-center gap-2">
            <InputComponent
              name="search_table"
              label=""
              labelClassName="text-[#203849] text-base font-normal"
              inputClassName="border-[#E1E9ED] rounded-lg focus:outline-none h-[42px]"
              type="text"
              placeholder="Search food or order ID"
              value={searchQuery}
              onChange={handleSearchChange}
              register={register}
            />
          </div>
        </div>

        <div className="gap-8">
          <button
            className="dark:text-white"
            onClick={() => setViewMode("grid")}
          >
            <GridIcon
              className={`${
                viewMode === "grid" ? "text-primary" : "text-gray-400"
              }`}
            />
          </button>
          <button onClick={() => setViewMode("list")}>
            <ListIcon
              className={`${
                viewMode === "list" ? "text-primary" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        Showing {filteredOrders.length} orders (Filter: {statusFilter})
      </div>

      <div className="mt-6">
        {viewMode === "grid" ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order: Order) => (
                <OrderCard key={order._id} order={order} />
              ))
            ) : (
              <p className="text-gray-500">No orders found matching your criteria</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-sm border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-[#2A3342] text-sm font-medium dark:bg-black dark:text-[#FFFFFF]">
                <tr>
                  <th className="py-3 px-4 text-left">Order No.</th>
                  <th className="py-3 px-4 text-left">Table</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Items Name</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Price per Item</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Delivery Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#161616]">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order: Order) => (
                    <OrderListRow key={order._id} order={order} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-4 text-center text-gray-500">
                      No orders found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeAwayOrderShowForOwner;