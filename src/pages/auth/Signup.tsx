import logo from "@/assets/logo.png";
import computerImage from "@/assets/Auth/computer.png";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useForm } from "react-hook-form";
import InputComponent from "@/components/shared/input/auth/TextInput";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { registerUser } from "@/store/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

type SignupFormFields = {
  restaurantName: string;
  businessName: string;
  businessEmail: string;
  phone: string;
  restaurantAddress: string;
  password: string;
  confirmPassword: string;
  referralCode?: string;
};

const Signup = () => {
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormFields>();

  // Handle form submission
  const onSubmit = (data: SignupFormFields) => {
    const {
      restaurantName,
      businessName,
      businessEmail,
      phone,
      restaurantAddress,
      password,
      referralCode,
    } = data;
    console.log("Form Data:", data);
    // Here, you can send the data to an API or perform other actions

    dispatch(
      registerUser({
        restaurantName: restaurantName as string,
        businessName: businessName as string,
        businessEmail: businessEmail as string,
        phone: phone as string,
        restaurantAddress: restaurantAddress as string,
        password: password as string,
        referralCode: referralCode ? (referralCode as string) : undefined,
      })
    );

    navigate("/otp");
    console.log("User in sign up:", user);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0F9996] to-[#56DAAB] dark:bg-gradient-to-r dark:from-[#030303] dark:to-[#030303]">
      <div className="flex justify-center md:justify-start md:px-[100px] pt-3 md:pt-6">
        <img src={logo} width={150} height={60} alt="Logo" />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10 py-[50px]">
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="flex justify-center">
            <div className="max-w-[390px] w-full text-white flex flex-col gap-3">
              <h2 className="text-center text-5xl font-semibold">
                Don’t have account ?
              </h2>
              <p className="text-[40px] font-light text-center">
                Please Create your account.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={computerImage} alt="Computer Desk" />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 bg-white dark:bg-primary-dark md:rounded-l-[50px] flex justify-center items-center">
          <div className="max-w-[445px] w-full">
            <div className="space-y-10">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[#333] dark:text-white text-2xl font-medium">
                  Sign Up
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-[#9B9FA8] space-y-3">
                  <InputComponent
                    name="restaurantName"
                    placeholder="Enter restaurant name"
                    register={register}
                    errors={errors}
                    label="Restaurant Name"
                    rules={{
                      required: "Restaurant name is required",
                    }}
                  />
                  <InputComponent
                    name="businessName"
                    placeholder="Enter business name"
                    register={register}
                    errors={errors}
                    label="Business Name"
                  />
                  <InputComponent
                    name="businessEmail"
                    placeholder="Enter business eamil"
                    register={register}
                    errors={errors}
                    label="Business Email"
                  />
                  <InputComponent
                    name="phone"
                    placeholder="Enter phone number"
                    register={register}
                    errors={errors}
                    label="Phone Number"
                  />
                  <InputComponent
                    name="restaurantAddress"
                    placeholder="Enter restaurant address"
                    register={register}
                    errors={errors}
                    label="Restaurant Address"
                  />
                  <InputComponent
                    name="password"
                    placeholder="Enter password"
                    register={register}
                    errors={errors}
                    label="Password"
                    type="password"
                  />
                  <InputComponent
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    register={register}
                    errors={errors}
                    label="Confirm Password"
                    type="password"
                    rules={{
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    }}
                  />
                  <InputComponent
                    name="referralCode"
                    placeholder="Enter Code"
                    register={register}
                    errors={errors}
                    label="Referral Code (Optional)"
                  />

                  <PrimaryButton
                    className="w-full text-base font-medium cursor-pointer"
                    type="submit"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </PrimaryButton>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <p className="text-center text-[#59606E] text-sm my-10">
                  already have an account?{" "}
                  <span className="text-primary">
                    <Link to={"/login"}>Login</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
