


import { Bell, ChevronRight, UserPlus, Utensils } from "lucide-react";


const notifications = [
  {
    icon: <Bell className="w-5 h-5" />, // Order
    title: "Order #1023",
    subtitle: "QR Design",
    status: "Pending",
    time: "2 min ago",
  },
  {
    icon: <UserPlus className="w-5 h-5" />, // New User
    title: "New User",
    subtitle: "Owner",
    status: "Registered",
    time: "5 min ago",
  },
  {
    icon: <Utensils className="w-5 h-5" />, // Menu Update
    title: "Menu Updated",
    subtitle: "Pizza Place",
    status: "Approved",
    time: "15 min ago",
  },
  // Repeat for demonstration purposes
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Order #1023",
    subtitle: "QR Design",
    status: "Pending",
    time: "2 min ago",
  },
  {
    icon: <UserPlus className="w-5 h-5" />,
    title: "New User",
    subtitle: "Owner",
    status: "Registered",
    time: "5 min ago",
  },
  {
    icon: <Utensils className="w-5 h-5" />,
    title: "Menu Updated",
    subtitle: "Pizza Place",
    status: "Approved",
    time: "15 min ago",
  },
  {
    icon: <Utensils className="w-5 h-5" />,
    title: "Menu Updated",
    subtitle: "Pizza Place",
    status: "Approved",
    time: "15 min ago",
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Order #1023",
    subtitle: "QR Design",
    status: "Pending",
    time: "2 min ago",
  },
];

export default function Notification() {
  return (
    <div className="w-full  mx-auto border-0">
      <div className=" ">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center justify-between md:gap-4 gap-3 md:py-4  py-3 border-b border-[#DDDDDD] cursor-pointer"
          >
             <div className=" flex items-center md:justify-start justify-center gap-3 w-full md:w-1/5">
                       <div className=" text-[#333333] dark:text-[#FFFFFF]">{n.icon}</div>
              <div className="">
                <span className=" text-[#333333] dark:text-[#FFFFFF] text-base">{n.title}</span>
             
              </div>
             </div>
           
              <div className="text-sm md:text-base text-[#203849] dark:text-[#FFFFFF] font-medium w-full md:w-1/4 text-center">
                   <span >{n.subtitle}</span>
              </div>
           

            <div className=" text-sm md:text-base font-normal text-black dark:text-[#FFFFFF] w-full md:w-1/4 text-center ">
              <span>
                {n.status}
              </span>
            
            </div>
            <div className="text-black dark:text-[#FFFFFF] text-sm md:text-base  font-normal w-full md:w-1/4  flex flex-col md:flex-row  justify-between   items-center text-center">
           <p>  {n.time}</p>
             
       
              
               <div className="mt-2 md:mt-0  ">
        <ChevronRight className="h-6 w-6 text-[#333333] dark:text-[#FFFFFF]" />
      </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
