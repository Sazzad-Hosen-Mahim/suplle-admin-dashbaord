import { useThemeStore } from "@/store/useThemeStore";
import { Outlet, useNavigate } from "react-router-dom";
import sidebarlogo from "@/assets/siderbarlogo.png";
import personImg from "@/assets/person.jpg";
import NotificationIcon from "@/components/icons/NotificationIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import { useState, useEffect, useRef } from "react";
import AdminDashboardSideBar from "@/features/Sidebar/AdminDasboardSideBar";
import TourGuide from "@/components/tour/TourGuide";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/store/features/auth/authSlice";

type Notification = {
  id: number;
  message: string;
};

const fakeNotifications: Notification[] = [
  { id: 1, message: " Welcome to your admin dashboard!" },
  { id: 2, message: " New user registered." },
  { id: 3, message: " Server maintenance scheduled." },
  { id: 4, message: " You have 5 pending tasks." },
];

type UserCookie = {
  name: string;
  role: string;
  image: string | null;
};

const getDisplayRole = (role: string | undefined): string => {
  switch (role) {
    case "restaurant_owner":
      return "Owner";
    case "admin":
      return "Admin";
    case "staff":
      return "Staff";
    default:
      return role || "Unknown";
  }
};

const AdminDashboardLayout = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState<Notification[]>(fakeNotifications);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [user, setUser] = useState<UserCookie | null>(null);

  const notificationRef = useRef<HTMLDivElement>(null);
  const userPopupRef = useRef<HTMLDivElement>(null);

  // const selectedRestaurant = useAppSelector(
  //   (state) => state.switchAccount.selectedRestaurant
  // );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const cookieData = Cookies.get("user");
    if (cookieData) {
      try {
        setUser(JSON.parse(cookieData));
      } catch (error) {
        console.error("Invalid user cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node) &&
        userPopupRef.current &&
        !userPopupRef.current.contains(e.target as Node)
      ) {
        setShowNotificationPopup(false);
        setShowUserPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen">
      {/* Header */}
      <header className="fixed w-full z-30 flex bg-green-100 dark:bg-primary-dark p-2 items-center justify-between h-16 px-10">
        {/* Logo */}
        <div
          className={`logo ${
            !sidebarOpen ? "ml-12" : ""
          } md:flex md:items-center ml-12`}
        >
          <img src={sidebarlogo} width={100} height={40} alt="Logo" />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex w-full max-w-[438px] h-[40px] px-[14px] py-[8px] items-center gap-[16px] rounded-[8px] bg-[#F6F8FB] dark:bg-primary-dark relative border dark:border-white">
          <input
            type="text"
            placeholder="Search results..."
            className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-white"
          />
          <svg
            className="absolute right-4 text-gray-500 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M23 21l-6-6m-5 2a7 7 0 1 0-7-7 7 7 0 0 0 7 7z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Icons + Profile */}
        <div className="flex items-center gap-4">
          {/* Message Icon */}
          <div className="bg-green-200 dark:bg-green-100 size-8 flex justify-center items-center rounded-xl cursor-pointer">
            <MessageIcon size={20} color="#202020" />
          </div>

          {/* Notification Icon */}
          <div
            className="bg-green-200 dark:bg-green-100 size-8 flex justify-center items-center rounded-xl cursor-pointer relative"
            onClick={() => setShowNotificationPopup((prev) => !prev)}
            ref={notificationRef}
          >
            <NotificationIcon size={20} color="#202020" />

            {/* Notification Popup */}
            {showNotificationPopup && (
              <div className="absolute top-full mt-2 md:right-0 bg-white text-black dark:bg-primary-dark border dark:border-white dark:text-white p-4 rounded shadow-lg w-64 max-h-96 overflow-y-auto z-50">
                <h4 className="font-semibold mb-2">Notifications</h4>
                <ul className="space-y-2 text-sm">
                  {notifications.map((notif, index, arr) => (
                    <li
                      key={notif.id}
                      className={`pb-2 px-2 rounded transition-colors duration-200 ${
                        index !== arr.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      } hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer`}
                    >
                      {notif.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Profile Info with Name + Role */}
          <div className="relative" ref={userPopupRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowUserPopup((prev) => !prev)}
            >
              <img
                src={user?.image || personImg}
                alt="profile"
                className="shadow rounded-full object-cover w-8 h-8"
              />
              <div className="hidden sm:flex flex-col text-sm leading-tight">
                <span className="font-semibold text-gray-800 dark:text-white">
                  {user?.name || "Admin User"}
                </span>
                <span className="text-gray-500 dark:text-gray-300">
                  {getDisplayRole(user?.role)}
                </span>
                {/* <span className="text-gray-500 dark:text-gray-300">
                  {selectedRestaurant?.restaurantName ||
                    "No Restaurant Selected"}
                </span> */}
              </div>
            </div>

            {/* user Popup */}
            {showUserPopup && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-primary-dark border dark:border-white rounded shadow-lg z-50 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={user?.image || personImg}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {getDisplayRole(user?.role)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <button
                    className="w-full text-left text-gray-700 dark:text-gray-200 hover:underline"
                    onClick={() => navigate("/dashboard/settings")}
                  >
                    Settings
                  </button>
                  <button
                    className="w-full px-4 py-2 bg-primary text-center text-white rounded-md cursor-pointer hover:opacity-50"
                    onClick={() => {
                      Cookies.remove("user");
                      Cookies.remove("accessToken");
                      dispatch(logout());
                      navigate("/"); // or use navigate("/login")
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AdminDashboardSideBar
        sidebarOpen={sidebarOpen}
        toggleDarkMode={toggleTheme}
        darkMode={theme === "dark"}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main
        className={`pt-20 px-2 md:px-5 pb-4 bg-[#F6F8FB] dark:bg-secondary-dark min-h-screen transform ease-in-out duration-500 ${
          sidebarOpen ? "ml-12 md:ml-60" : "ml-12"
        }`}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>

      {/* Tour Guide */}
      <TourGuide isAdmin={true} />
    </div>
  );
};

export default AdminDashboardLayout;
