import logo from "@/assets/logo.png";
import computerImage from "@/assets/Auth/computer.png";
import PrimaryButton from "@/components/shared/PrimaryButton";
// import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { resendCode, verifyOtp } from "@/store/features/auth/authSlice";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const email = Cookies.get("userEmail");

  const navigate = useNavigate();

  //maks email
  interface MaskEmail {
    (email: string | undefined): string;
  }

  const maskEmail: MaskEmail = (email) => {
    if (!email || typeof email !== "string") return "";

    const atIndex = email.indexOf("@");
    const dotComIndex = email.lastIndexOf(".com");

    if (atIndex === -1 || dotComIndex === -1) return "***@***.com";

    const firstTwo = email.slice(0, 2);
    const beforeAt = email.charAt(atIndex - 1);
    const beforeDotCom = email.slice(dotComIndex - 2, dotComIndex);

    // Count characters to mask
    const hiddenPart1Length = atIndex - 3; // between firstTwo and beforeAt
    const hiddenPart2Length = dotComIndex - atIndex - 1 - 2; // between @ and beforeDotCom

    const hiddenStars1 = "*".repeat(Math.max(0, hiddenPart1Length));
    const hiddenStars2 = "*".repeat(Math.max(0, hiddenPart2Length));

    return `${firstTwo}${hiddenStars1}${beforeAt}@${hiddenStars2}${beforeDotCom}.com`;
  };

  // Handle form submission
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return; // allow only single char

    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmitOtp = () => {
    const otp = otpValues.join("");
    if (otp.length === 4) {
      dispatch(verifyOtp({ otp }));
    } else {
      alert("Please enter the complete 4-digit code.");
    }
    navigate("/login");
  };

  console.log("Email in OTP:", email);

  const handleResendCode = () => {
    if (email) {
      dispatch(resendCode(email));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0F9996] to-[#56DAAB] dark:bg-gradient-to-r dark:from-[#030303] dark:to-[#030303]">
      <div className="flex justify-center md:justify-start md:px-[100px] pt-3 md:pt-6">
        <img src={logo} width={150} height={60} alt="Logo" />
      </div>
      <div className="flex h-full flex-col md:flex-row md:items-center gap-5 md:gap-10 py-[50px]">
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="flex justify-center">
            <div className="max-w-[500px] w-full text-white flex flex-col gap-3">
              <h2 className="text-center text-5xl font-semibold">
                Verify Your Account
              </h2>
              <p className="text-[40px] font-light text-center">
                Please enter the code below to verify your account
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={computerImage} alt="Computer Desk" />
          </div>
        </div>
        <div className="w-full h-full md:w-1/2 p-4 bg-white dark:bg-primary-dark md:rounded-l-[50px] flex justify-center items-center">
          <div className="max-w-[445px] w-full">
            <div className="space-y-10">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[#333] dark:text-white text-2xl font-medium">
                  Enter the confirmation code
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitOtp();
                }}
              >
                <div className="flex justify-center text-[#9B9FA8] space-x-3">
                  {Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputsRef.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={otpValues[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="border p-3 border-[#EDF1F3] rounded-lg h-[40px] w-[40px] text-center text-lg focus:outline-none"
                      />
                    ))}
                </div>

                {error && (
                  <p className="text-center" style={{ color: "red" }}>
                    {error}
                  </p>
                )}
                <p className="text-[#333] text-base px-4 text-center">
                  Verification code has been sent to your email
                  <span className="text-primary pl-2">{maskEmail(email)}</span>
                </p>

                <PrimaryButton
                  className="w-full text-base font-medium cursor-pointer"
                  type="submit"
                >
                  Continue
                </PrimaryButton>
              </form>
              <div className="flex justify-center">
                <div className="text-sm text-[#333] text-center cursor-pointer">
                  Didn't receive the code?{" "}
                  <button
                    className="text-blue-500 underline"
                    onClick={handleResendCode}
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
