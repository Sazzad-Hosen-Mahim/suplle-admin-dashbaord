import AdminAnalyticsChart from "@/components/admin-panel/analytics/AdminAnalyticsChart";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import SectionHeader from "@/components/ui/sectionHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchAdminAnalytics } from "@/store/features/admin/analytics/adminAnalyticsSlice";
import { generateRandomId } from "@/utils/utils";
import { useEffect, useState } from "react";

const graphFilterList = [
  {
    id: generateRandomId(),
    label: "12 months",
    value: "12 months",
  },
  {
    id: generateRandomId(),
    label: "6 months",
    value: "6 months",
  },
  {
    id: generateRandomId(),
    label: "30 days",
    value: "30 days",
  },
  {
    id: generateRandomId(),
    label: "7 days",
    value: "7 days",
  },
];

const AdminAnalytics = () => {
  const [selectedFilter, setSelectedFilter] = useState("12 months");
  const { data } = useAppSelector((state) => state.adminAnalytics);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  const cardList = [
    {
      id: generateRandomId(),
      label: "Total Orders",
      value: data?.totalOrders || 0,
      rate: 0,
    },
    {
      id: generateRandomId(),
      label: "Total Restaurants",
      value: data?.totalRestaurants || 0,
      rate: 0,
    },
    {
      id: generateRandomId(),
      label: "Total Users",
      value: data?.totalUsers || 0,
      rate: 0,
    },
  ];

  console.log("Analytics Data:", data);
  return (
    <div>
      <div className="space-y-5 overflow-hidden">
        <div>
          <SectionHeader
            title="Key Metrics"
            className="bg-transparent border-none px-0 dark:bg-transparent"
            titleClassName="!text-2xl font-light"
          />
          <div className="flex flex-wrap gap-6">
            {cardList.map((card) => {
              return (
                <div className="flex-1 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border-[1px] border-[#E4E4E7] p-6 bg-white dark:bg-[#161616] dark:text-white rounded-lg space-y-3">
                  <p className="text-[#71717A] dark:text-white text-sm">
                    {card.label}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-black dark:text-white text-xl">
                      {card.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-500 flex justify-center items-center gap-1">
                      +{card.rate} <ArrowUpIcon color="green" size={10} />{" "}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full border-[1px] border-[#E4E4E7] p-3 lg:p-8 bg-white dark:bg-[#161616] dark:text-white rounded-lg">
          <div className="flex gap-3">
            <p className="text-[#18181B] text-xl max-w-xl w-full">
              Sales Report
            </p>
            <div className="flex justify-center items-center gap-6">
              {graphFilterList.map((item) => {
                return (
                  <div
                    onClick={() => setSelectedFilter(item.value)}
                    className={`p-2 ${
                      selectedFilter === item.value &&
                      "border border-[#A1A1AA] rounded-md"
                    } cursor-pointer`}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="py-5"></div>

          <div>
            <AdminAnalyticsChart selectedFilter={selectedFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
