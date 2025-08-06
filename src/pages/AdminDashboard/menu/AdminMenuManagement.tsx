import AddMenu from "@/components/menu_management/AddMenu";
import AllMenu from "@/components/menu_management/AllMenu";
import Categories from "@/components/menu_management/Categories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { useState } from "react";
type Status = "ALL_MENU" | "ADD_MENU" | "CATEGORIES";
const AdminMenuManagement = () => {
  const [tabs, setTabs] = useState<Status>("ALL_MENU");
  // Removed unused restaurantForm state

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
              <BreadcrumbPage>
                {tabs === "ALL_MENU"
                  ? "All Menu"
                  : tabs === "ADD_MENU"
                  ? "Add Menu"
                  : tabs === "CATEGORIES" && "Categories"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="font-rubik text-sm sm:text-[18px] mt-7">
          Menu Management
        </h1>
      </div>
      {/*  TABS */}
      <div className="mt-5">
        <div className="flex items-center space-x-5 border-b-[2px]">
          <button
            onClick={() => setTabs("ALL_MENU")}
            className={cn(
              "py-[8px] sm:py-[12px] pr-[15px] sm:pr-[25px] text-sm sm:text-[15px] font-light cursor-pointer",
              tabs === "ALL_MENU" &&
                "border-b-[2px] font-normal border-green-600"
            )}
          >
            All Menu
          </button>
          <button
            onClick={() => setTabs("ADD_MENU")}
            className={cn(
              "py-[8px] sm:py-[12px] pr-[15px] sm:pr-[25px] text-sm sm:text-[15px] font-light cursor-pointer",
              tabs === "ADD_MENU" &&
                "border-b-[2px] border-green-600 font-normal"
            )}
          >
            Add Menu
          </button>
          <button
            onClick={() => setTabs("CATEGORIES")}
            className={cn(
              "py-[8px] sm:py-[12px] pr-[15px] sm:pr-[25px] text-sm sm:text-[15px] font-light cursor-pointer",
              tabs === "CATEGORIES" &&
                "border-b-[2px] border-green-600 font-normal"
            )}
          >
            Categories
          </button>
        </div>
        {/* TABLE */}
        {/* {tabs === "ALL_MENU" ? (
          <AllRestaurant />
        ) : tabs === "ACTIVE" ? (
          <Activity />
        ) : (
          tabs === "PENDING" && <Pending />
        )}{" "} */}
      </div>
      {/* ADD RESTAURANT FORM HERE */}
      {/* TABLE */}
      {tabs === "ALL_MENU" ? (
        <AllMenu />
      ) : tabs === "ADD_MENU" ? (
        <AddMenu />
      ) : (
        tabs === "CATEGORIES" && <Categories />
      )}{" "}
    </div>
  );
};

export default AdminMenuManagement;
