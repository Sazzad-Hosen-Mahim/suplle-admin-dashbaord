import RecentyActivityItem, {
  type RecentItem,
} from "@/components/admin-panel/dashboard/RecentActivitiyItem";
import PeopleGroupIcon from "@/components/icons/PeopleGroupIcon";
import SectionHeader from "@/components/ui/sectionHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchAdminAnalytics } from "@/store/features/admin/analytics/adminAnalyticsSlice";
import { fetchNotifications } from "@/store/features/admin/recentActivity/recentActivitySlice";
import type { Notification } from "@/Types/notificationTypes";
import { formatRelativeTime } from "@/utils/time";
import { generateRandomId } from "@/utils/utils";
import { useEffect } from "react";
import { IoRestaurant } from "react-icons/io5";
import { PiChefHatDuotone } from "react-icons/pi";

const AdminDashboardHome = () => {
  const dispatch = useAppDispatch();

  const { notifications } = useAppSelector((state) => state.notification);
  const { data: analyticsData } = useAppSelector(
    (state) => state.adminAnalytics
  );

  const recentActivityItems: RecentItem[] = notifications.map(
    (n: Notification) => ({
      id: n._id,
      vendor: n.type === "Qr Order" ? "QR Vendor" : "New User",
      status: (n.status.charAt(0).toUpperCase() +
        n.status.slice(1)) as RecentItem["status"],
      time: formatRelativeTime(n.createdAt),
    })
  );

  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  const cardList = [
    {
      id: generateRandomId(),
      label: "Total Users",
      value: analyticsData?.totalUsers || 0,
      icon: PeopleGroupIcon,
      orderBy: "Users",
    },
    {
      id: generateRandomId(),
      label: "Total Orders",
      value: analyticsData?.totalOrders || 0,
      icon: PiChefHatDuotone,
      orderBy: "QR",
    },
    {
      id: generateRandomId(),
      label: "Total Restaurants",
      value: analyticsData?.totalRestaurants || 0,
      icon: IoRestaurant,
      orderBy: "Outlets",
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <SectionHeader
          title="Overview"
          className="bg-transparent border-none px-0 dark:bg-transparent"
          titleClassName="!text-2xl"
        />
        <div className="flex flex-wrap gap-6">
          {cardList.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="flex-1 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-lg p-6 bg-white dark:bg-[#161616] dark:text-white rounded-lg text-center space-y-3"
              >
                <div className="flex justify-center">
                  <div className="bg-[#D1FADF] p-4 rounded-full">
                    <div className="bg-[#b8f4cc] p-[14px] rounded-full">
                      <Icon color="#0F9996" size={30} />
                    </div>
                  </div>
                </div>
                <p className="text-[#565656] dark:text-white text-xl">
                  {card.label}
                </p>
                <p className="text-black dark:text-white text-3xl">
                  {card.value.toLocaleString()}
                </p>
                <p className="text-sm text-[#667085] dark:text-white">
                  Order via {card.orderBy}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <SectionHeader
          title="Recent Activity"
          className="bg-transparent border-none px-0 dark:bg-transparent"
          titleClassName="text-2xl font-light"
        />
        <div className="divide-y divide-gray-200">
          {recentActivityItems.length > 0 ? (
            recentActivityItems.map((item) => (
              <RecentyActivityItem
                key={item.id}
                item={item}
                onClick={() => {}}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No orders found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
