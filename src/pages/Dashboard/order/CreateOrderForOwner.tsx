import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
// import InputComponent from "@/components/shared/input/auth/TextInput";
import { useForm, useWatch } from "react-hook-form";
import OrderCardForOwner from "@/components/order/OrderCardForOwner";
import PrimaryButton from "@/components/shared/PrimaryButton";
// import SelectInput from "@/components/order/SelectInput";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/sectionHeader";

import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleSelect from "@/components/Forms/SuppleDropdown";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
// import { orderSchema, type OrderFormData } from "@/utils/CreateOrderSchema";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchMenus } from "@/store/features/menu/fetchMenuSlice";
import Cookies from "js-cookie";
import {
  createOrderSchema,
  type CreateOrderFormData,
} from "@/utils/CreateOrderSchema";
import axios from "axios";
import SuppleInput from "@/components/Forms/SuppleInput";
import { toast } from "react-toastify";

export interface Floor {
  _id: string;
  floorName: string;
}

export interface Table {
  _id: string;
  name: string;
}

const CreateOrderForOwner = () => {
  // const { register } = useForm();

  const dispatch = useAppDispatch();

  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});

  const [orderItems, setOrderItems] = useState<
    { menu: string; title: string; amount: number; quantity: number }[]
  >([]);
  // const [orders, setOrders] = useState([]);

  const { menus } = useAppSelector((state) => state.fetchMenu);
  // const { user } = useAppSelector((state) => state.auth);
  const userString = Cookies.get("user");
  const user = userString ? JSON.parse(userString) : null;
  console.log(user, "userFromCookies");

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  // console.log(menus);

  //floor and table
  const [floors, setFloors] = useState([]);
  const [tables, setTables] = useState([]);
  // const [selectedFloor, setSelectedFloor] = useState("");

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "delivered", label: "Delivered" },
    { value: "cancel", label: "Cancelled" },
    { value: "inProgress", label: "Processing" },
  ];

  const token = Cookies.get("accessToken");

  //form
  const methods = useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      table: "",
      floor: "",
    },
  });

  const selectedFloor = useWatch({
    control: methods.control,
    name: "floor",
  });

  // Fetch floors on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/floor/all-floor`, {
      headers: {
        Authorization: `${token}`,
        // "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFloors(data?.data?.result))
      .catch((err) => console.error("Error fetching floors:", err));
  }, [token]);

  // console.log(floors, tables, "floorAndTable");

  // Fetch tables when a floor is selected
  useEffect(() => {
    if (selectedFloor) {
      fetch(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/table/get-all-table/${selectedFloor}`,
        {
          headers: {
            Authorization: `${token}`,
            // "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setTables(data?.data?.result))
        .catch((err) => console.error("Error fetching tables:", err));
    } else {
      setTables([]);
    }
  }, [token, selectedFloor]);

  const handleAddToOrder = (menuId: string, title: string, amount: number) => {
    const quantity = quantities[menuId] ?? 1;
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.menu === menuId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.menu === menuId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { menu: menuId, title, amount, quantity }];
      }
    });
    setQuantities((prev) => ({ ...prev, [menuId]: 1 }));
  };

  // const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    0
  );

  return (
    <Wrapper>
      <SectionHeader title="Create Order" showBackButton={true} />

      <div className="flex flex-col gap-4 md:flex-row mt-5">
        {/* LEFT SIDE */}
        <div className="bg-white flex flex-col gap-4 p-4 rounded-lg shadow-md md:w-2/3 w-full dark:bg-primary-dark">
          {/* Customer Info */}

          {/* Order Type */}
          <div>
            <p className="text-base font-medium text-[#021433] dark:text-white">
              Order Type
            </p>
            <div className="flex flex-col gap-4 md:flex-row w-full py-4">
              <Button className="font-normal">{user?.role}</Button>
              {/* <Button className="bg-green-50 text-green-500 font-normal">
                Takeaway
              </Button> */}
            </div>
          </div>
          <SuppleForm<CreateOrderFormData>
            {...methods}
            onSubmit={(data) => {
              // handle order creation with data
              console.log("Order form data:", data);
            }}
            defaultValues={{
              customerName: "",
              customerPhone: "",
              table: "",
              floor: "",
            }}
            resolver={zodResolver(createOrderSchema)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4 md:flex-row w-full py-4">
              <SuppleInput
                name="customerName"
                label="Customer Name"
                placeholder="Customer Name"
                required
              />
              <SuppleInput
                name="customerPhone"
                label="Phone Number"
                placeholder="Phone Number"
                type="text"
                required
              />
            </div>
            <SuppleSelect
              name="floor"
              label="Floor"
              placeholder="Select Floor"
              required
            >
              {floors.map((floor: Floor) => (
                <SelectItem value={floor._id}>{floor.floorName}</SelectItem>
              ))}
            </SuppleSelect>
            <SuppleSelect
              name="table"
              label="Table"
              placeholder="Select Table"
              required
            >
              {tables.map((table: Table) => (
                <SelectItem value={table._id}>{table.name}</SelectItem>
              ))}
            </SuppleSelect>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {menus.map((item) => (
                <OrderCardForOwner
                  key={item._id}
                  title={item.itemName}
                  amount={item.price}
                  quantity={quantities[item._id] ?? 1}
                  onQuantityChange={(quantity) =>
                    setQuantities((prev) => ({
                      ...prev,
                      [item._id]: quantity,
                    }))
                  }
                  onAddToOrder={() =>
                    handleAddToOrder(item._id, item.itemName, item.price)
                  }
                />
              ))}
            </div>
            <SuppleSelect
              name="status"
              label="Order Status"
              placeholder="Select Status"
              required
            >
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SuppleSelect>
            {/* Right Side  */}
            <div className="md:w-1/3 w-full dark:bg-primary-dark bg-white flex flex-col gap-4 p-4 rounded-lg shadow-md">
              <p className="text-base font-medium text-[#021433] dark:text-white">
                Order Summary
              </p>

              <div className="flex flex-col gap-2 max-h-[200px] overflow-auto">
                {orderItems.length === 0 ? (
                  <p className="text-sm text-gray-500">No items added yet.</p>
                ) : (
                  orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm border-b py-1"
                    >
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>${(item.amount * item.quantity).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-row justify-between items-center pt-4 border-t">
                <p className="text-base font-bold text-black dark:text-white">
                  Total
                </p>
                <p className="text-base font-bold text-black dark:text-white">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="pb-8">
                <p className="text-base font-medium text-[#021433] dark:text-white ">
                  Payment Method
                </p>
                {/* <SelectInput /> */}
                <SuppleSelect
                  name="payment"
                  label="Payment Method"
                  placeholder="Select a method"
                  required
                >
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SuppleSelect>
              </div>

              <div className="flex justify-end">
                <PrimaryButton
                  children="Create Order"
                  className="dark:bg-primary dark:text-white"
                  onClick={async () => {
                    const orderType =
                      user?.role === "dine in"
                        ? "dine in"
                        : user?.role === "take away"
                        ? "take away"
                        : "";
                    const payload = {
                      customerName: methods.getValues("customerName"),
                      customerPhone: methods.getValues("customerPhone"),
                      floor: methods.getValues("floor"),
                      table: methods.getValues("table"),
                      menus: orderItems.map((item) => ({
                        menu: item.menu,
                        quantity: item.quantity,
                      })),
                      orderType,
                      person: 2,
                      paymentMethod: {
                        type: methods.getValues("payment"),
                      },
                      status: "pending",
                    };

                    try {
                      const response = await axios.post(
                        `${
                          import.meta.env.VITE_BACKEND_BASE_URL
                        }/orders/create-order`,
                        payload,
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`,
                          },
                        }
                      );
                      // handle response
                      console.log("Order Created", response.data);
                      if (response.data.success === true) {
                        toast.success("Order created successfully");
                      }
                    } catch (error) {
                      // handle error
                      console.error(error);
                    }
                  }}
                />
              </div>
            </div>
          </SuppleForm>
        </div>

        {/* RIGHT SIDE */}
      </div>
    </Wrapper>
  );
};

export default CreateOrderForOwner;
