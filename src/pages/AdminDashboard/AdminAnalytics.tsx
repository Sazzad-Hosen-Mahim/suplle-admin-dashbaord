import AdminAnalyticsChart from "@/components/admin-panel/analytics/AdminAnalyticsChart";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import SectionHeader from "@/components/ui/sectionHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchAdminAnalytics,
  fetchAdminChartAnalytics,
} from "@/store/features/admin/analytics/adminAnalyticsSlice";
import { generateRandomId } from "@/utils/utils";
import { useEffect, useState } from "react";

const graphFilterList = [
  {
    id: generateRandomId(),
    label: "12 months",
    value: "12 months",
    period: 12,
    groupBy: "month",
  },
  {
    id: generateRandomId(),
    label: "6 months",
    value: "6 months",
    period: 6,
    groupBy: "month",
  },
  {
    id: generateRandomId(),
    label: "30 days",
    value: "30 days",
    period: 30,
    groupBy: "day",
  },
  {
    id: generateRandomId(),
    label: "7 days",
    value: "7 days",
    period: 7,
    groupBy: "day",
  },
];

const AdminAnalytics = () => {
  const [selectedFilter, setSelectedFilter] = useState(graphFilterList[0]);
  const { data, chartData, chartLoading } = useAppSelector(
    (state) => state.adminAnalytics
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch dashboard data
    dispatch(fetchAdminAnalytics());

    // Calculate start and end dates based on selected filter
    const endDate = new Date();
    const startDate = new Date();

    if (selectedFilter.groupBy === "month") {
      startDate.setMonth(startDate.getMonth() - selectedFilter.period);
    } else {
      startDate.setDate(startDate.getDate() - selectedFilter.period);
    }

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // Fetch chart data
    dispatch(
      fetchAdminChartAnalytics({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        groupBy: selectedFilter.groupBy,
      })
    );
  }, [dispatch, selectedFilter]);

  const handleFilterChange = (filterValue: string) => {
    const newFilter = graphFilterList.find(
      (filter) => filter.value === filterValue
    );
    if (newFilter) {
      setSelectedFilter(newFilter);
    }
  };

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
                <div
                  key={card.id}
                  className="flex-1 min-w-[250px] border-[1px] border-[#E4E4E7] p-6 bg-white dark:bg-[#161616] dark:text-white rounded-lg space-y-3"
                >
                  <p className="text-[#71717A] dark:text-white text-sm">
                    {card.label}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-black dark:text-white text-xl">
                      {card.value.toLocaleString()}
                    </p>
                    {/* <p className="text-sm text-green-500 flex justify-center items-center gap-1">
                      +{card.rate} <ArrowUpIcon color="green" size={10} />{" "}
                    </p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full border-[1px] border-[#E4E4E7] p-3 lg:p-8 bg-white dark:bg-[#161616] dark:text-white rounded-lg">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <p className="text-[#18181B] dark:text-white text-xl">
              Sales Report
            </p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {graphFilterList.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleFilterChange(item.value)}
                    className={`p-2 text-sm ${
                      selectedFilter.value === item.value
                        ? "border border-[#A1A1AA] rounded-md bg-gray-100 dark:bg-gray-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    } cursor-pointer transition-colors`}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="py-5"></div>

          <div>
            {chartLoading ? (
              <div className="h-96 flex items-center justify-center">
                <p className="text-gray-500">Loading chart data...</p>
              </div>
            ) : (
              <AdminAnalyticsChart
                selectedFilter={selectedFilter}
                chartData={chartData || []}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
