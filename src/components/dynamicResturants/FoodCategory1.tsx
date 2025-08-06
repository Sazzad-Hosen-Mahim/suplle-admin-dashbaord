import { generateRandomId } from "@/utils/utils";
import Wrapper from "../shared/Wrapper";

const foodCategoryData1 = [
  {
    id: generateRandomId(),
    name: "Starters",
    url: "/starter",
    value: "Starters",
  },
  {
    id: generateRandomId(),
    name: "Main Course",
    url: "/main-course",
    value: "Main Course",
  },
  {
    id: generateRandomId(),
    name: "Soft Drinks",
    url: "/soft-drinks",
    value: "Soft Drinks",
  },
];
type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};
const FoodCategory1: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Wrapper>
      <div className="bg-[#F3F3F3] w-full rounded-xl px-4 py-2">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {foodCategoryData1.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.value)}
              className={`${
                item.value === selectedCategory
                  ? "text-white bg-black"
                  : "text-[#252525] bg-[#F3F3F3]"
              } transition hover:bg-black hover:text-white 
                rounded-xl font-semibold text-sm sm:text-base md:text-lg lg:text-xl
                px-3 sm:px-4 py-1 whitespace-nowrap`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default FoodCategory1;
