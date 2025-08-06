import { Route, Routes } from "react-router-dom";
import Login from "@/pages/auth/Login";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import AdminDashboardHome from "@/pages/AdminDashboard/AdminDashboardHome";
import AdminQrOrders from "@/pages/AdminDashboard/QR/AdminQrOrders";
import AdminAnalytics from "@/pages/AdminDashboard/AdminAnalytics";
import AdminSubscription from "@/pages/AdminDashboard/AdminSubscription";
import AdminRestaurantView from "@/pages/AdminDashboard/restaurant/AdminRestaurantView";
import AdminRestaurantCreate from "@/pages/AdminDashboard/restaurant/AdminRestaurantCreate";
import AdminMenuManagement from "@/pages/AdminDashboard/menu/AdminMenuManagement";
import AdminQrDesignsView from "@/pages/AdminDashboard/QR/AdminQrDesignsView";
import AdminQrDesignCreate from "@/pages/AdminDashboard/QR/AdminQrDesignCreate";
import ForgetPasword from "@/pages/auth/ForgetPasword";
import AdminUserManage from "@/pages/AdminDashboard/user/AdminUserManage";
import AdminNotification from "@/pages/AdminDashboard/notification/AdminNotification";
import AdminSetting from "@/pages/setting/AdminSetting";
import QrDesign from "@/components/DashboardSubscription/QrDesign";
import PrivateRoute from "./privateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgetPasword />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="" element={<AdminDashboardHome />} />
        <Route path="dashboard" element={<AdminDashboardHome />} />
        {/* restaurant routes */}
        <Route path="restaurant/view" element={<AdminRestaurantView />} />
        <Route path="restaurant/create" element={<AdminRestaurantCreate />} />
        {/* menu routes */}
        <Route path="menu/management" element={<AdminMenuManagement />} />
        {/* qr orders routes */}
        <Route path="qr-orders" element={<AdminQrOrders />} />
        {/* qr design routes */}
        <Route path="qr-designs/view" element={<AdminQrDesignsView />} />
        <Route path="qr-designs/create" element={<AdminQrDesignCreate />} />
        {/* user routes */}
        <Route path="user/view" element={<AdminUserManage />} />
        {/* <Route path="user/view/staff" element={<UserStaff />} /> */}
        {/* <Route path="user/view/staff" element={<UserStaff />} /> */}
        {/* analytics routes */}
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="subscriptions" element={<AdminSubscription />} />
        <Route path="subscriptions/choose-design" element={<QrDesign />} />
        <Route path="notification" element={<AdminNotification />} />
        <Route path="setting" element={<AdminSetting />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
