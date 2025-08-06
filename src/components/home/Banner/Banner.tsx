import IconAnimation from "./IconAnimation";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[url(/banner/banner-image.jpg)] bg-cover bg-center bg-no-repeat flex w-full flex-col">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Navbar at Top */}
      <div className="relative w-full z-10 px-4 pt-6">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center text-center px-4 py-8 z-10">
        <div className="max-w-6xl w-full">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-bold leading-tight">
            Welcome to <span className="text-primary-gradient">Suplle</span>
          </h1>
          <p className="mt-6 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-rubik max-w-4xl mx-auto">
            Simplify operations. Delight customers. Empower your staff. We help
            Restaurants, Pubs, Cafes, and Bars seamlessly manage their in-house
            operations with QR-based menus, staff management, and real-time
            order tracking.
          </p>
        </div>
      </div>

      {/* Animated Icon at Bottom */}
      <motion.div
        className="z-10 flex justify-center pb-8 sm:pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <IconAnimation />
      </motion.div>
    </div>
  );
};

export default Banner;
