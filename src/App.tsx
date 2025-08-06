import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useRedux";
import AppRoutes from "./routes/routes";
import Cookies from "js-cookie";
import { setAuth } from "./store/features/auth/authSlice"; // <-- Add this line
// ...existing code...

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userStr = Cookies.get("user");
    const accessToken = Cookies.get("accessToken");
    if (
      userStr &&
      userStr !== "undefined" &&
      accessToken &&
      accessToken !== "undefined"
    ) {
      try {
        const user = JSON.parse(userStr);
        if (user && user._id && accessToken) {
          dispatch(setAuth({ user, accessToken }));
        }
      } catch (e) {
        // Invalid JSON, clear cookies
        Cookies.remove("user");
        Cookies.remove("accessToken");
      }
    }
  }, [dispatch]);
  return <AppRoutes />;
}

export default App;
