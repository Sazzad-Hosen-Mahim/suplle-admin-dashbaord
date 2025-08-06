import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { FaStar } from "react-icons/fa";
import img1 from "../../../assets/Testimonial/1.png";
import img2 from "../../../assets/Testimonial/2.jpg";
import img3 from "../../../assets/Testimonial/3.png";
import img4 from "../../../assets/Testimonial/4.jpg";

const testimonialData = [
  {
    id: 1,
    img: img1,
    comment:
      "“We love Suplle! Our team can now manage orders, staff, and menus all in one place. It’s exactly what we needed to stay organized and efficient.”",
    name: "Jenny Wilson",
    designation: "Restaurant Manager",
  },
  {
    id: 2,
    img: img2,
    comment: `"Suplle simplified everything — from live orders to QR menus. Our staff adjusted quickly, and service quality improved overnight.”`,
    name: "Devon Lane",
    designation: "Pub Owner",
  },
  {
    id: 3,
    img: img3,
    comment: `“We love Suplle! Our team can now manage orders, staff, and menus all in one place. It’s exactly what we needed to stay organized and efficient.”`,
    name: "Jenny Wilson",
    designation: "Restaurant Manager",
  },
  {
    id: 4,
    img: img4,
    comment: `"Suplle simplified everything — from live orders to QR menus. Our staff adjusted quickly, and service quality improved overnight.”`,
    name: "Devon Lane",
    designation: "Pub Owner",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: no direction, 1: left, -1: right

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) =>
        prev === testimonialData.length - 2 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle drag/swipe
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      // Swipe right
      setDirection(-1);
      setCurrentIndex((prev) =>
        prev === 0 ? testimonialData.length - 2 : prev - 1
      );
    } else if (info.offset.x < -100) {
      // Swipe left
      setDirection(1);
      setCurrentIndex((prev) =>
        prev === testimonialData.length - 2 ? 0 : prev + 1
      );
    }
  };

  // Get current pair of testimonials
  const currentPair = [
    testimonialData[currentIndex],
    testimonialData[(currentIndex + 1) % testimonialData.length],
  ];

  return (
    <div className=" text-center px-4  dark:text-white">
      <p className="text-primary font-bold text-xl mb-6">
        3,940+ Happy Suplle Users
      </p>
      <h1 className="ext-white text-center text-3xl sm:text-5xl lg:text-6xl font-bold mb-7">
        What Our{" "}
        <span className="text-primary-gradient">Partners Say About Suplle</span>
      </h1>

      {/* Carousel container */}
      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="flex gap-8 "
        >
          <AnimatePresence custom={direction}>
            {currentPair.map((testimonial, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
                transition={{ duration: 0.5 }}
                className="flex-1 min-w-[calc(50%-1rem)] bg-[#1e12633f] rounded-lg p-6 "
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl"
                  />
                  <div className="text-left max-w-md">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-5 h-5" />
                      ))}
                    </div>
                    <p className="text-lg italic mb-6 text-white">
                      {testimonial.comment}
                    </p>
                    <div className="flex items-center gap-5">
                      <h3 className="font-bold text-xl text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-400">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
