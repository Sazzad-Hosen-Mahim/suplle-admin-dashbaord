import { IoExtensionPuzzle } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { TbMessageFilled } from "react-icons/tb";

const whyChooseSuplleData = [
  {
    id: 1,
    icon: IoExtensionPuzzle,
    title: "Solve Problems Real Time",
    description:
      "Manage operations instantly with live updates and smart coordination.",
  },
  {
    id: 2,
    icon: MdLock,
    title: "Secured & Safe Payments",
    description: "Encrypted, safe, and hassle-free payments for every order.",
  },
  {
    id: 3,
    icon: TbMessageFilled,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock assistance to keep your business running smoothly.",
  },
];

const WhyChooseSuplle = () => {
  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-12">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl text-center font-bold">
        Why Choose <span className="text-primary-gradient">Suplle</span>
      </h1>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center max-w-7xl mx-auto">
        {whyChooseSuplleData.map((data, index) => (
          <div
            key={data.id}
            className={`flex flex-col items-center text-center gap-5 px-4 lg:px-8 max-w-sm ${
              index !== whyChooseSuplleData.length - 1
                ? "lg:border-r lg:border-[#3c2f5e]"
                : ""
            }`}
          >
            {/* <img src={data.icon} alt={data.title} className="w-12 h-14 mb-4" /> */}
            {typeof data.icon === "string" ? (
              <img
                src={data.icon}
                alt={data.title}
                className="w-16 h-16 object-contain mb-4"
              />
            ) : (
              <data.icon className="w-16 h-16 mb-4 text-[#540595db]" /> // For React Icons
            )}
            <h2 className="text-white h-[40px] text-xl sm:text-2xl font-semibold">
              {data.title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg dark:text-gray-300">
              {data.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseSuplle;
