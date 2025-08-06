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
// import { useState } from "react";
import { Link } from "react-router-dom";

const AdminUserView = () => {
  const tabs = true;

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
              <BreadcrumbPage>Menu</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="inline-flex sm:flex flex-col sm:flex-row sm:items-center space-y-4 justify-between mt-7">
          <h1 className="font-rubik text-sm sm:text-[18px] ">
            User Management
          </h1>
          <Button className="bg-gradient-to-br from-green-400 to-green-800 font-normal sm:py-5 sm:px-5 cursor-pointer tracking-wide">
            Add Restaurant
          </Button>
        </div>
      </div>
      {/*  TABS */}
      <div>
        <div className="flex items-center border-b-[2px]">
          <button
            className={cn(
              "py-[8px] sm:py-[12px] pr-[15px] sm:pr-[25px] text-sm sm:text-[15px]  cursor-pointer",
              tabs && "border-b-[3px] border-green-600"
            )}
          >
            All
          </button>
          <Link
            to="staff"
            className="py-[8px] sm:py-[12px] px-[15px] sm:px-[25px] text-sm sm:text-[15px]  cursor-pointer"
          >
            Staff
          </Link>
          <Link
            to="owner"
            className="py-[8px] sm:py-[12px] px-[15px] sm:px-[25px] text-sm sm:text-[15px]  cursor-pointer"
          >
            Owner
          </Link>
        </div>
      </div>
      {/* TABLE */}
    </div>
  );
};

export default AdminUserView;
