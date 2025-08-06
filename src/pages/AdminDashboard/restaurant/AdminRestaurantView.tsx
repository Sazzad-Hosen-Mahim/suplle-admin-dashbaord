import Activity from "@/components/restaurant/Activity";
import AllRestaurant from "@/components/restaurant/AllRestaurant";
import Pending from "@/components/restaurant/Pending";
import RestaurantForm from "@/components/restaurant/RestaurantForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useState } from "react";

type Status = "ACTIVE" | "PENDING" | "RESTAURANT";
const AdminRestaurantView = () => {
  const [tabs, setTabs] = useState<Status>("RESTAURANT");
  const [restaurantForm, setRestaurantForm] = useState(false);
  return (
    <div className="font-rubik">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Admin Panel</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Restaurant</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="inline-flex sm:flex flex-col sm:flex-row sm:items-center space-y-4 justify-between mt-7">
          <h1 className="font-rubik text-sm sm:text-[18px] ">
            {!restaurantForm ? "Restaurants List" : "Add Restaurants"}
          </h1>
          <Button
            onClick={() => setRestaurantForm(!restaurantForm)}
            className={cn(
              "bg-gradient-to-br from-green-400 font-light to-green-800 rounded sm:py-5 sm:px-5 cursor-pointer tracking-wide",
              restaurantForm && "hidden"
            )}
          >
            Add Restaurant
          </Button>
        </div>
      </div>
      {/*  TABS */}
      <div className={cn(restaurantForm && "hidden", "")}>
        <div className="flex items-center space-x-5 border-b-[2px]">
          <button
            onClick={() => setTabs("RESTAURANT")}
            className={cn(
              "py-[8px] sm:py-[12px] pr-[15px] sm:pr-[25px] text-[10px] sm:text-[15px] font-light cursor-pointer",
              tabs === "RESTAURANT" &&
                "border-b-[2px] font-normal border-green-600"
            )}
          >
            All Restaurants
          </button>
          <button
            onClick={() => setTabs("ACTIVE")}
            className={cn(
              "py-[8px] sm:py-[12px] pr-[15px] sm:pr-[25px] text-sm sm:text-[15px] font-light cursor-pointer",
              tabs === "ACTIVE" && "border-b-[2px] border-green-600 font-normal"
            )}
          >
            Active
          </button>
          <button
            onClick={() => setTabs("PENDING")}
            className={cn(
              "py-[8px] sm:py-[12px] pr-[15px] sm:pr-[25px] text-sm sm:text-[15px] font-light cursor-pointer",
              tabs === "PENDING" &&
                "border-b-[2px] border-green-600 font-normal"
            )}
          >
            Pending
          </button>
        </div>
        {/* TABLE */}
        {tabs === "RESTAURANT" ? (
          <AllRestaurant />
        ) : tabs === "ACTIVE" ? (
          <Activity />
        ) : (
          tabs === "PENDING" && <Pending />
        )}{" "}
      </div>
      {/* ADD RESTAURANT FORM HERE */}
      {restaurantForm && <RestaurantForm />}
    </div>
  );
};

export default AdminRestaurantView;
