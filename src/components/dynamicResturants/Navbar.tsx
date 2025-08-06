import { useState } from "react";
import { Link } from "react-router-dom";
import RestaurantIcon from "../icons/RestaurantIcon";
import { generateRandomId } from "@/utils/utils";
import { Menu, X } from "lucide-react";
import Wrapper from "../shared/Wrapper";

const navData = [
  {
    id: generateRandomId(),
    label: "Home",
    url: "/",
  },
  {
    id: generateRandomId(),
    label: "Special Offers",
    url: "/special-offers",
  },
  {
    id: generateRandomId(),
    label: "Restaurants",
    url: "/restaurants",
  },
  {
    id: generateRandomId(),
    label: "Track Orders",
    url: "/track-orders",
  },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Wrapper>
      <div className="w-full p-5">
        <nav className="flex items-center justify-between w-full h-16 bg-white dark:bg-secondary-dark shadow-md p-4 rounded-lg">
          {/* Logo and branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center w-15 h-15 bg-primary rounded-full">
                <RestaurantIcon />
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-normal text-gray-800 dark:text-white ml-2 ">
                  Urban Bistro
                </p>
                <p className="text-sm text-gray-600 ml-2">123 Main Street</p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex space-x-4 items-center gap-5">
            {navData.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="text-black dark:text-white text-lg px-3 py-1 rounded-xl hover:bg-primary hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/">
              <button className="bg-primary-dark hover:bg-primary cursor-pointer text-white px-5 py-2 rounded-3xl">
                Login/Signup
              </button>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav Items */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
            {navData.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="block text-gray-700 px-3 py-2 rounded-xl hover:bg-primary hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <button className="w-full bg-primary-dark text-white px-5 py-2 rounded-3xl cursor-pointer">
                Login/Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
