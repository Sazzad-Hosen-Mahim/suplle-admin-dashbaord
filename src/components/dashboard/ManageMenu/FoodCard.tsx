import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import type { MenuSectionItem } from "@/pages/Dashboard/menu/MenuViewForOwner";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { FullMenuItem } from "../dashboardItem/data/Type";

interface FoodCardProps {
  item: FullMenuItem;
}

const FoodCard = ({
  //   title,
  //   size,
  //   price,
  //   description,
  //   imageSrc,
  item,
}: FoodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="w-full h-full rounded-xl shadow-sm border-0 bg-white dark:bg-[#161616]">
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <motion.h3
                className="text-sm font-medium text-gray-800 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {item.itemName}
              </motion.h3>
              <motion.p
                className="text-xs text-gray-500 dark:text-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {item.size}
              </motion.p>
              <motion.p
                className="text-xs text-gray-500 dark:text-gray-50 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Available
              </motion.p>
            </div>
            <motion.div
              className="relative w-16 h-16 rounded overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={item.image || "/api/placeholder/100/100"}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
              <Link
                to={`/dashboard/menu/edit/${item.restaurant}/${item._id}`}
                style={{ borderRadius: "45px 0px 0px 0px" }}
                className="bg-white/90 dark:bg-[#161616] w-11 h-12 absolute bottom-0 right-0"
              >
                <motion.button
                  className="flex items-center justify-center bg-[#03081F] absolute bottom-[5px] right-[5px]  text-white rounded-full w-6 h-6"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus size={12} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-base font-bold text-amber-500">${item.price}</p>
          </motion.div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <motion.p
            className="text-xs text-gray-700 dark:text-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.description || "No description available."}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FoodCard;
