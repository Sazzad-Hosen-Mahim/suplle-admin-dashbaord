import React from "react";
import MenuItem from "./MenuItem";
import type { FullMenuItem as MenuItemType } from "./data/Type";

interface MenuCategoryProps {
  title: string;
  items: MenuItemType[];
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ title, items }) => {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-[#000000] dark:text-white mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
