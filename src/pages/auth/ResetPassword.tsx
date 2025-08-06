import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/shared/PrimaryButton";
import LockIcon from "@/components/icons/LockIcon";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userCookie = Cookies.get("user");
    const Token = Cookies.get("accessToken");

    if (!userCookie || !Token) {
      setError("Authentication failed. Please login again.");
      return;
    }

    let email = "";
    try {
      const parsedUser = JSON.parse(userCookie);
      email = parsedUser.email;
    } catch {
      setError("Invalid user session.");
      return;
    }

    try {
      setLoadingState(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: Token,
          },
          body: JSON.stringify({
            email,
            oldPassword,
            newPassword,
          }),
        }
      );
      // console.log("eitty",res)
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        toast.success("Password changed successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center dark:from-[#030303] dark:to-[#030303]">
      <div className="w-full max-w-[600px] p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[#333] dark:text-white text-2xl font-medium">
            Enter your old and new password to reset it.
          </p>
        </div>

        <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
          <div className="text-[#9B9FA8] space-y-6">
            {/* Old Password */}
            <div>
              <label
                className="text-[#484B52] dark:text-white text-sm"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <div className="relative w-full">
                <LockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  size={18}
                  color="#CDCDCD"
                />
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter old password"
                  required
                  className="border border-[#B6B6B6] rounded-lg py-[13px] pl-10 pr-10 w-full focus:outline-none"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                className="text-[#484B52] dark:text-white text-sm"
                htmlFor="password"
              >
                New Password
              </label>
              <div className="relative w-full">
                <LockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  size={18}
                  color="#CDCDCD"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter new password"
                  className="border border-[#B6B6B6] rounded-lg py-[13px] pl-10 pr-10 w-full focus:outline-none"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} color="#CDCDCD" />
                  ) : (
                    <EyeIcon size={18} color="#CDCDCD" />
                  )}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="text-[#484B52] dark:text-white text-sm"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative w-full">
                <LockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  size={18}
                  color="#CDCDCD"
                />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="border border-[#B6B6B6] rounded-lg py-[13px] pl-10 pr-10 w-full focus:outline-none"
                  required
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon size={18} color="#CDCDCD" />
                  ) : (
                    <EyeIcon size={18} color="#CDCDCD" />
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <PrimaryButton
              className="w-full text-base font-medium cursor-pointer"
              type="submit"
            >
              {loadingState ? "Updating..." : "Change Password"}
            </PrimaryButton>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
