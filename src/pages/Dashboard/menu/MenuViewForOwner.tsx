import FoodCard from "@/components/dashboard/ManageMenu/FoodCard";
import SectionHeader from "@/components/ui/sectionHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchMenus } from "@/store/features/menu/fetchMenuSlice";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const menuSections = [
  {
    title: "Starters",
    items: [
      {
        title: "Cheeseburger",
        size: "Small Size",
        price: "20",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/burger.jpg",
      },
      {
        title: "Bacon Burger",
        size: "Large",
        price: "10",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/burger.jpg",
      },
      {
        title: "Swiss Burger",
        size: "Medium",
        price: "15",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/burger.jpg",
      },
      {
        title: "Beef Burger",
        size: "Small Size",
        price: "12",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/burger.jpg",
      },
    ],
  },
  {
    title: "Main Course",
    items: [
      {
        title: "Eggplant",
        size: "Small Size",
        price: "25",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/pizza.jpg",
      },
      {
        title: "Cheeseburger",
        size: "Small Size",
        price: "30",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/pizza.jpg",
      },
      {
        title: "Fish and Chips",
        size: "Small Size",
        price: "25",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/pizza.jpg",
      },
      {
        title: "Baked Ziti",
        size: "Small Size",
        price: "35",
        description: "Satisfy your cravings with our best-selling Cheeseburger",
        imageSrc: "/src/assets/menu-items/pizza.jpg",
      },
    ],
  },
  {
    title: "Drinks",
    items: [
      {
        title: "Classic Mojito",
        size: "Small Size",
        price: "25",
        description: "A refreshing blend of mint leaves served over ice",
        imageSrc: "/src/assets/menu-items/smoothie.png",
      },
      {
        title: "Berry Smoothie",
        size: "Small Size",
        price: "30",
        description:
          "A healthy, fruity drink made with strawberries and yogurt",
        imageSrc: "/src/assets/menu-items/smoothie.png",
      },
      {
        title: "Pina Colada",
        size: "Small Size",
        price: "25",
        description: "A tropical cocktail made with rum and coconut cream",
        imageSrc: "/src/assets/menu-items/smoothie.png",
      },
      {
        title: "Lemonade Fizz",
        size: "Small Size",
        price: "35",
        description: "A zesty and sparkling lemonade made with fresh lemons",
        imageSrc: "/src/assets/menu-items/smoothie.png",
      },
    ],
  },
];

export type MenuSectionItem = {
  title: string;
  size: string;
  price: string;
  description: string;
  imageSrc: string;
};

export type MenuSection = {
  title: string;
  items: MenuSectionItem[];
};

// Section title component
const SectionTitle = ({ title }: { title: string }) => {
  return (
    <motion.h2
      className="text-lg font-bold text-gray-800 dark:text-gray-50 mb-3 ml-1"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title}
    </motion.h2>
  );
};

const MenuViewForOwner = () => {
  const { menus } = useAppSelector((state) => state.fetchMenu);
  const dispatch = useAppDispatch();
  console.log("Menus in view page:", menus);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <>
      <SectionHeader className="mb-4 px-2" title="Menu Management" />
      <div className="flex flex-col">
        {menuSections.map((section: MenuSection, index: number) => (
          <div key={index} className="mb-8">
            <SectionTitle title={section.title} />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {menus.map((item) => (
                <FoodCard
                  // key={itemIndex}
                  // title={item.itemName}
                  // size={item.size}
                  // price={item.price.toString()}
                  // description={item.description}
                  // imageSrc={item.image}
                  item={item}
                  key={item._id}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard/menu/add"
        className="bg-[#11A8A5] text-white px-4 py-2 rounded-md mt-4  transition duration-200 ease-in-out flex items-center w-36 gap-2 hover:bg-[#0A7B78] active:scale-95"
      >
        <Plus /> <span>Add Menu</span>
      </Link>
    </>
  );
};

export default MenuViewForOwner;
