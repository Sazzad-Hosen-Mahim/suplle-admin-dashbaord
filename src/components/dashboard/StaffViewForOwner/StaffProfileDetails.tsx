import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaBriefcase,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import staffprofile from "@/assets/admin/staffprofile.png";
import type { User } from "./user-type";

type StaffDetails = User & {
  phone: string;
  workSchedule: string;
  address: string;
};

const StaffProfileDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<StaffDetails | null>(null);

  useEffect(() => {
    // Mock data - replace with actual API call in production
    const mockUser: StaffDetails = {
      id: Number(id),
      Name: "Esther Howard",
      email: "esther.howard@gmail.com",
      phone: "+023 0140 2342 3",
      role: "manager",
      status: "Active",
      workSchedule: "Mon–Friday | 9:00 AM – 5:00",
      address: "House # 20, Flat–5 D, Road # 11, Banani, Dhaka",
    };
    setUser(mockUser);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  // Format role for display
  const formatRole = (role: User["role"]): string => {
    const roleMap: Record<User["role"], string> = {
      manager: "Restaurant Manager",
      "dine-in": "Dine-in Staff",
      waiter: "Waiter",
      takeaway: "Takeaway Staff",
      chef: "Chef",
      cashier: "Cashier",
      maintenance: "Maintenance Staff",
    };
    return roleMap[role] || role;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading staff details...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start space-y-8 w-full h-full min-h-screen p-4">
      {/* Header with back button */}
      <div className="flex w-full p-4 justify-between items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-[#E7F6F6] dark:bg-[#161616]">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 hover:text-primary transition-colors"
        >
          <FaArrowLeft className="h-5 w-5" />
          <span className="text-base font-medium">Personal Information</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Left sidebar with profile summary */}
        <div className="flex flex-col items-center gap-5 w-full lg:w-[250px] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-38 h-38 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <img
              src={staffprofile}
              alt=""
              className="h-37 w-37 text-gray-400"
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">{user.Name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatRole(user.role)}
            </p>
          </div>
          <div className="flex space-x-2">
            <span
              className={`flex w-[63px] px-2 py-1 justify-center items-center gap-[10px] rounded-[8px] bg-[#CBF6DF] text-[#1D9A6C] text-[12px] font-normal leading-[150%] ${
                user.status === "Active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {user.status}
            </span>
            <span className="flex w-[75px] px-2 py-1 justify-center items-center gap-[10px] rounded-[8px] bg-[#E8E8E8] text-black text-[12px] font-normal leading-[150%]">
              Full Time
            </span>
          </div>
        </div>

        {/* Right side with details */}
        <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          {/* Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaRegCircleUser className="h-5 w-5 text-gray-500" />
              <h4 className="font-medium">Name</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 pl-8">{user.Name}</p>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaBriefcase className="h-5 w-5 text-gray-500" />
              <h4 className="font-medium">Role</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 pl-8">
              {formatRole(user.role)}
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="h-5 w-5 text-gray-500" />
              <h4 className="font-medium">Mobile Number</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 pl-8">
              {user.phone}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaEnvelope className="h-5 w-5 text-gray-500" />
              <h4 className="font-medium">Email</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 pl-8">
              {user.email}
            </p>
          </div>

          {/* Work Schedule */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="h-5 w-5 text-gray-500" />
              <h4 className="font-medium">Work Schedule</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 pl-8">
              {user.workSchedule}
            </p>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
              <h4 className="font-medium">Address</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 pl-8">
              {user.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileDetails;

/* import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaBriefcase,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import staffprofile from "@/assets/admin/staffprofile.png";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

const StaffProfileDetails = () => {
  return (
    <div className="flex flex-col items-start space-y-8 w-full  h-full min-h-screen">
      <div className="flex w-full p-4 justify-between items-center rounded-lg border border-[#E3E9ED]  dark:bg-[#161616]">
        <h2 className="text-lg font-semibold  flex items-center space-x-2">
          <FaArrowLeft />
          <span className="text-base font-rubik">Personal Information</span>
        </h2>
      </div>

  
      <div className="flex  gap-6 max-auto w-full">
        <div className="flex flex-col items-center gap-5 w-[208px] p-[22px] rounded-[8px] border border-[#E4EBE6] dark:bg-[#161616]">
          <img
            src={staffprofile}
            alt="Esther Howard"
            className="w-38 h-38 rounded-full object-cover"
          />
          <div className="text-center">
            <h3 className="text-[18px] font-medium  leading-[160%]">
              Esther Howard
            </h3>
            <p className="text-[14px] font-normal  leading-[160%]">
              Restaurant Manager
            </p>
          </div>
          <div className="flex space-x-2">
            <span className="flex w-[63px] px-2 py-1 justify-center items-center gap-[10px] rounded-[8px] bg-[#CBF6DF] text-[#1D9A6C] text-[12px] font-normal leading-[150%]">
              Active
            </span>
            <span className="flex w-[75px] px-2 py-1 justify-center items-center gap-[10px] rounded-[8px] bg-[#E8E8E8] text-black text-[12px] font-normal leading-[150%]">
              Full Time
            </span>
          </div>
        </div>

    
        <div className="w-full max-auto p-6 grid grid-cols-2 gap-y-4 dark:bg-[#161616] shadow rounded-lg overflow-hidden">
          <div className=" space-y-4 p-2">
            <div className="flex items-center justify-start gap-2">
              <FaRegCircleUser className=" mt-1 h-6 w-6" />
              <p className="text-[16px] leading-[160%] font-normal font-[Rubik] ">
                Name
              </p>
            </div>
            <div>
              <p className="text-[16px] leading-[135%] font-normal font-[Rubik] text-[#939393]">
                Esther Howard
              </p>
            </div>
          </div>

          <div className=" space-y-4 p-2">
            <div className="flex items-center justify-start gap-2">
              <FaBriefcase className=" mt-1 h-6 w-6" />
              <p className="text-[16px] leading-[160%] font-normal font-[Rubik] ">
                Role
              </p>
            </div>
            <div>
              <p className="text-[16px] leading-[135%] font-normal font-[Rubik] text-[#939393]">
                Restaurant Manger
              </p>
            </div>
          </div>

          <div className=" space-y-4 p-2">
            <div className="flex items-center justify-start gap-2">
              <FaPhoneAlt className=" mt-1 h-6 w-6" />
              <p className="text-[16px] leading-[160%] font-normal font-[Rubik] ">
                Mobile Number
              </p>
            </div>
            <div>
              <p className="text-[16px] leading-[135%] font-normal font-[Rubik] text-[#939393]">
                +023 0140 2342 3
              </p>
            </div>
          </div>

          <div className=" space-y-4 p-2">
            <div className="flex items-center justify-start gap-2">
              <FaEnvelope className=" mt-1 h-6 w-6" />
              <p className="text-[16px] leading-[160%] font-normal font-[Rubik] ">
                Email
              </p>
            </div>
            <div>
              <p className="text-[16px] leading-[135%] font-normal font-[Rubik] text-[#939393]">
                esther.howard@gmail.com
              </p>
            </div>
          </div>

          <div className=" space-y-4 p-2">
            <div className="flex items-center justify-start gap-2">
              <FaCalendarAlt className=" mt-1 h-6 w-6" />
              <p className="text-[16px] leading-[160%] font-normal font-[Rubik] ">
                Work Schedule
              </p>
            </div>
            <div>
              <p className="text-[16px] leading-[135%] font-normal font-[Rubik] text-[#939393]">
                Mon–Friday | 9:00 AM – 5:00
              </p>
            </div>
          </div>

          <div className=" space-y-4 p-2">
            <div className="flex items-center justify-start gap-2">
              <FaMapMarkerAlt className=" mt-1 h-6 w-6" />
              <p className="text-[16px] leading-[160%] font-normal font-[Rubik] ">
                Address
              </p>
            </div>
            <div>
              <p className="text-[16px] leading-[135%] font-normal font-[Rubik] text-[#939393]">
                House # 20, Flat–5 D, Road # 11, Banani, Dhaka
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileDetails; */
