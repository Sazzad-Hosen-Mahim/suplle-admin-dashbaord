import {
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";
import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <Wrapper>
      <footer className="bg-[#050B1E] text-white px-6 py-5 rounded-t-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Urban Bistro</h2>
            <p className="text-sm text-gray-400 mb-1">123 Main Street</p>
            <p className="text-sm text-gray-400 mb-4">
              Whether you’re looking to enjoy a casual meal with friends,
              celebrate a special occasion, or grab a quick bite, Urban Bistro
              is the perfect place.
            </p>
            <div className="flex gap-4 text-gray-400 text-lg">
              <FaFacebookF className="hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-white cursor-pointer" />
              <FaEnvelope className="hover:text-white cursor-pointer" />
              <FaInstagram className="hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Restaurant Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Starter Items
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Main Course
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-md font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-md font-semibold mb-3">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-3">
              Get the latest health news and updates with our newsletter.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="px-3 py-2 text-sm text-[#8E8E8E] w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-white text-black rounded-r-md hover:bg-gray-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2025 Urban Bistro Website. All Rights Reserved
        </div>
      </footer>
    </Wrapper>
  );
};

export default Footer;
