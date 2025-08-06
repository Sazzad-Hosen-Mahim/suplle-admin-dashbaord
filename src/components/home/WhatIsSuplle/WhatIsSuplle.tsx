import { motion } from "framer-motion";
import SuplleCard from "./SuppleCard";
import RestaurantIcon from "@/components/icons/RestaurantIcon";
import CoffeeIcon from "@/components/icons/CoffeeIcon";
import GlassIcon from "@/components/icons/GlassIcon";

const suplleCardData = [
  {
    id: 1,
    icon: RestaurantIcon,
    category: "Restaurants",
    title: "Dine-in & Takeaway",
    description: "Manage orders, menus, and guest experiences with ease",
  },
  {
    id: 2,
    icon: CoffeeIcon,
    category: "Cafes & More",
    title: "Flexible Service",
    description: "Adapt to any in-house hospitality operation.",
  },
  {
    id: 3,
    icon: GlassIcon,
    category: "Pubs and Bars",
    title: "Live Order Flow",
    description: "Track and fulfill drink and food orders in real time.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const WhatIsSuplle = () => {
  return (
    <div className="py-10  overflow-hidden ">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-white text-3xl sm:text-4xl lg:text-6xl text-center font-bold dark:text-white"
        >
          What is <span className="text-primary-gradient">Suplle?</span>
        </motion.h2>

        <motion.p
          className="text-center mt-6 text-lg sm:text-xl lg:text-2xl text-gray-400 dark:text-gray-300"
          variants={itemVariants}
        >
          Suplle is a modern restaurant management platform built to streamline
          operations for
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16"
          variants={containerVariants}
        >
          {suplleCardData.map((card) => (
            <motion.div key={card.id} variants={itemVariants}>
              <SuplleCard
                Icon={card.icon}
                category={card.category}
                title={card.title}
                description={card.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhatIsSuplle;
