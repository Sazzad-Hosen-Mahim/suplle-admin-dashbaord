import React, { useState } from "react";
import RestaurantHeader from "./RestaruntHeader";
import MenuCategory from "./MenuCategory";
import { initialMenuItems, initialCategories } from "./data/Data";
import type { MenuCategory as MenuCategoryType } from "./data/Type";
import type { FullMenuItem as MenuItemType } from "./data/Type";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RestaurantMenu: React.FC = () => {
  const [menuItems] = useState<MenuItemType[]>(initialMenuItems);
  const [categories] = useState<MenuCategoryType[]>(initialCategories);

  const navigate = useNavigate();

  const getItemsByCategory = (categoryId: string) => {
    return menuItems.filter((item) => item.category._id === categoryId);
  };

  const handleAddMenu = () => {
    navigate("menu/add");
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <RestaurantHeader name="Urban Bistro" address="123 Main Street" />
      </div>

      <motion.h2
        className="text-xl font-medium text-[#333333] dark:text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Menu
      </motion.h2>

      <div>
        {categories.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.3, duration: 0.7 }}
          >
            <MenuCategory
              title={category.categoryName}
              items={getItemsByCategory(category._id)}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-start mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 + categories.length * 0.3, duration: 0.6 }}
      >
        <motion.button
          className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-teal-700 transition duration-200 flex items-center md:text-base text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddMenu}
        >
          Add Menu
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RestaurantMenu;
