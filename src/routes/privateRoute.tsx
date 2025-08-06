import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  // const { accessToken } = useSelector((state: any) => state.auth);
  const user = Cookies.get("user");
  const parsedUser = user ? JSON.parse(user) : null;
  // const role = user ? JSON.parse(user).role : null;
  const accessToken = Cookies.get("accessToken");

  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(parsedUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
