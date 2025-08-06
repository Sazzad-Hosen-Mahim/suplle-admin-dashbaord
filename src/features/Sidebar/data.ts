import WindowIcon from "@/components/icons/WindowIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCart";
import SpoonIcon from "@/components/icons/SpoonIcon";
import LayoutIcon from "@/components/icons/LayoutIcon";
import PeopleIcon from "@/components/icons/PeopleIcon";
import PeopleGroupIcon from "@/components/icons/PeopleGroupIcon";
import AnalyticsIcon from "@/components/icons/AnalyticsIcon";
import SettingIcon from "@/components/icons/SettingIcon";
import RestaurantIcon from "@/components/icons/RestaurantIcon";
import QRCodeIcon from "@/components/icons/QRCodeIcon";
import DollarIcon from "@/components/icons/DollerIcon";
import QrCodeIcon from "@/components/icons/QRCodeIcon";
import { generateRandomId } from "@/utils/utils";

export const adminSeiderBarData = [
  {
    id: generateRandomId(),
    label: "Dashboard",
    icon: WindowIcon,
    url: "/admin/dashboard",
  },
  {
    id: "resturant-management",
    label: "Restaurant",
    icon: RestaurantIcon,
    children: [
      {
        id: generateRandomId(),
        label: "Restaurant",
        url: "/admin/restaurant/view",
        icon: RestaurantIcon,
      },
      {
        id: generateRandomId(),
        label: "Menu Management",
        url: "/admin/menu/management",
        icon: SpoonIcon,
      },
    ],
  },
  {
    id: generateRandomId(),
    label: "Qr Orders",
    icon: ShoppingCartIcon,
    url: "/admin/qr-orders",
  },
  {
    id: generateRandomId(),
    label: "QR Designs",
    icon: QRCodeIcon,
    url: "/admin/qr-designs/view",
  },
  {
    id: generateRandomId(),
    label: "User",
    icon: PeopleIcon,
    url: "/admin/user/view",
  },
  {
    id: generateRandomId(),
    label: "Analytics & Reports",
    icon: AnalyticsIcon,
    url: "/admin/analytics",
  },
  {
    id: generateRandomId(),
    label: "Subscriptions",
    icon: DollarIcon,
    url: "/admin/subscriptions",
  },
];

export const ownerSeiderBarData = [
  {
    id: generateRandomId(),
    label: "Dashboard",
    icon: WindowIcon,
    url: "/dashboard",
  },
  {
    id: generateRandomId(),
    label: "Dine In Order",
    icon: ShoppingCartIcon,
    url: "/dashboard/order/dine-in",
  },
  {
    id: generateRandomId(),
    label: "Takeway Order",
    icon: ShoppingCartIcon,
    url: "/dashboard/order/take-away",
  },
  {
    id: generateRandomId(),
    label: "Menu Management",
    icon: SpoonIcon,
    url: "/dashboard/menu/view",
  },
  {
    id: generateRandomId(),
    label: "Restaurant layout",
    icon: LayoutIcon,
    url: "/dashboard/restaurant-layout",
  },
  {
    id: generateRandomId(),
    label: "User Management",
    icon: PeopleIcon,
    url: "/dashboard/user/view",
  },
  {
    id: generateRandomId(),
    label: "Staff Management",
    icon: PeopleGroupIcon,
    url: "/dashboard/staff/view",
  },
  {
    id: generateRandomId(),
    label: "Analytics & Reports",
    icon: AnalyticsIcon,
    url: "/dashboard/analytics",
  },
  {
    id: generateRandomId(),
    label: "Subscriptions",
    icon: DollarIcon,
    url: "/dashboard/subscriptions",
  },
  {
    id: generateRandomId(),
    label: "Qr Code",
    icon: QrCodeIcon,
    url: "/dashboard/buy-subscription",
  },
  {
    id: generateRandomId(),
    label: "Settings",
    icon: SettingIcon,
    url: "/dashboard/settings",
  },
];
