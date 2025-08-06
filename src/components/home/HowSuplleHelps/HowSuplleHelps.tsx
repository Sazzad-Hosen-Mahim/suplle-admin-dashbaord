import img1 from "../../../assets/HowSuplleHelps/1.jpg";

const howSuplleHelpsData = [
  {
    id: 1,
    title: "🔗 Automated Vendor Coordination",
    description:
      "Connect directly with suppliers. No more back-and-forth calls.",
  },
  {
    id: 2,
    title: "📦 Real-time Inventory Monitoring",
    description: "See what’s low, get alerts before you run out.",
  },
  {
    id: 3,
    title: "📊 Smart Forecasting",
    description: "AI-driven suggestions for ordering based on trends.",
  },
  {
    id: 4,
    title: "⚙️ Seamless Order Management",
    description: "Track, modify, and confirm orders in one unified dashboard.",
  },
  {
    id: 5,
    title: "📈 Insightful Reporting & Analytics",
    description:
      "View performance metrics and supply trends to make better decisions.",
  },
];

const HowSuplleHelps = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-12 ">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl text-center font-bold mb-16">
        How Suplle <span className="text-primary-gradient">Helps</span>
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
        <div className="w-full max-w-md lg:max-w-xl">
          <img
            src={img1}
            alt="How Suplle Helps"
            className="w-full h-auto rounded-3xl shadow-md"
          />
        </div>

        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {howSuplleHelpsData.map((data) => (
            <div key={data.id} className="border-b border-[#540595] pb-4">
              <h2 className="text-gray-200 text-xl sm:text-2xl lg:text-3xl font-semibold mb-1">
                {data.title}
              </h2>
              <p className="text-gray-400 text-base sm:text-lg dark:text-gray-300">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowSuplleHelps;
