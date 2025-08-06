import { NavLink } from "react-router-dom";
import { ownerSeiderBarData } from "./data";
import sidebarlogo from "@/assets/siderbarlogo.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleDarkMode: (mode: "dark" | "light") => void;
  darkMode: boolean;
  toggleSidebar: () => void;
}

const OwnerSiderBar = ({
  sidebarOpen,
  toggleDarkMode,
  darkMode,
  toggleSidebar,
}: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const user = Cookies.get("user");
  if (!user) return;
  const parsedUser = JSON.parse(user);
  const role = parsedUser.role;

  console.log(parsedUser, "from dashboard sidebar");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for mobile
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredSidebarData =
    role === "dine in"
      ? ownerSeiderBarData.filter((item) => item.label === "Dine In Order")
      : role === "take away"
      ? ownerSeiderBarData.filter((item) => item.label === "Takeway Order")
      : ownerSeiderBarData;

  return (
    <aside
      className={`w-60 ${
        sidebarOpen && !isMobile ? "translate-x-0" : "-translate-x-48"
      } fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-primary dark:bg-primary-dark`}
    >
      {/* Open sidebar button */}
      <div
        id="sidebarLogo"
        className={`max-toolbar ${
          sidebarOpen && !isMobile
            ? "translate-x-0"
            : "translate-x-24 scale-x-0"
        } w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white bg-primary dark:bg-primary-dark absolute top-2 rounded-full h-12`}
      >
        <div className="flex pl-4 items-center space-x-2">
          <div>
            <div
              onClick={() => toggleDarkMode("dark")}
              className={`moon text-white hover:text-green-700 cursor-pointer ${
                darkMode ? "hidden" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </div>
            <div
              onClick={() => toggleDarkMode("light")}
              className={`sun text-white hover:text-green-700 cursor-pointer  ${
                darkMode ? "" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 group pr-2 py-1 rounded-full text-white">
          <div className="transform ease-in-out duration-300 mr-12">
            <img src={sidebarlogo} width={70} height={30} alt="Logo" />
          </div>
        </div>
      </div>

      {/* Toggle button - shows dark mode toggle only in mobile */}
      <div
        onClick={toggleSidebar}
        className="-right-6 cursor-pointer transition transform ease-in-out duration-500 flex border-4 border-white bg-green-300 dark:bg-primary-dark hover:bg-green-700 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
      >
        {isMobile ? (
          <div className="flex gap-2 items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode("dark");
              }}
              className={`moon  cursor-pointer ${darkMode ? "hidden" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode("light");
              }}
              className={`sun hover:text-yellow-400 cursor-pointer ${
                darkMode ? "" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </div>
          </div>
        ) : (
          // Default grid icon for desktop
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        )}
      </div>

      {/* For desktop - show full sidebar when open */}
      {!isMobile && (
        <div
          className={`max ${
            sidebarOpen ? "flex" : "hidden"
          } text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]`}
        >
          {filteredSidebarData.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.url}
                className={({ isActive }) =>
                  `w-full text-white px-2 py-3 pl-8 flex items-center space-x-3 ${
                    isActive
                      ? "bg-green-700 dark:bg-[#363232]"
                      : "hover:bg-green-300 dark:hover:bg-[#242424]"
                  }`
                }
              >
                <Icon size={22} color="white" />
                <p className="text-base text-white">{item.label}</p>
              </NavLink>
            );
          })}
        </div>
      )}

      {/* For mobile - always show icons only */}
      <div
        className={`mini ${
          isMobile || !sidebarOpen ? "flex" : "hidden"
        } mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]`}
      >
        {ownerSeiderBarData.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.url}
              className={({ isActive }) =>
                `justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full p-3 flex ${
                  isActive
                    ? "bg-green-700 dark:bg-[#363232]"
                    : "hover:bg-green-300 dark:hover:bg-[#242424]"
                }`
              }
            >
              <Icon size={22} color="white" />
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default OwnerSiderBar;
