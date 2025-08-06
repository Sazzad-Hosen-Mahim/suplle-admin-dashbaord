import logo from "@/assets/logo.png";
import computerImage from "@/assets/Auth/computer.png";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { generateRandomId } from "@/utils/utils";
import { useState } from "react";
import InputComponent from "@/components/shared/input/auth/TextInput";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const buttonList = [
  {
    id: generateRandomId(),
    label: "Email",
    value: "email",
  },
  {
    id: generateRandomId(),
    label: "Phone",
    value: "phone",
  },
];

const ForgetPasword = () => {
  const [selectedType, setSelectedType] = useState("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
    // Here, you can send the data to an API or perform other actions
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0F9996] to-[#56DAAB] dark:bg-gradient-to-r dark:from-[#030303] dark:to-[#030303]">
      <div className="flex justify-center md:justify-start md:px-[100px] pt-3 md:pt-6">
        <Link to={"/"}>
          <img src={logo} width={150} height={60} alt="Logo" />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 py-[50px]">
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="flex justify-center">
            <div className="max-w-[500px] w-full text-white flex flex-col gap-3">
              <h2 className="text-center text-5xl font-semibold">
                Forgot Your Password?
              </h2>
              <p className="text-[40px] font-light text-center">
                Don't worry, we'll help you to reset it.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={computerImage} alt="Computer Desk" />
          </div>
        </div>
        <div className="py-10 w-full md:w-1/2 bg-white dark:bg-primary-dark md:rounded-l-[50px] flex justify-center items-center">
          <div className="max-w-[445px] w-full">
            <div className="space-y-10">
              <div className="flex flex-col items-center gap-3">
                <p className="text-[#333] dark:text-white text-2xl font-medium">
                  Forget Password
                </p>
              </div>
              <p className="text-[#5F5F5F] dark:text-white text-base text-center">
                Please enter your email address or phone number for confirmation
                code.
              </p>

              <div className="flex gap-2 justify-center">
                {buttonList.map((item) => {
                  return (
                    <PrimaryButton
                      key={item.id}
                      className="max-w-20"
                      isActive={item.value === selectedType ? true : false}
                      onClick={() => setSelectedType(item.value)}
                    >
                      {item.label}
                    </PrimaryButton>
                  );
                })}
              </div>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {selectedType === "email" && (
                  <InputComponent
                    name="email"
                    placeholder="Enter eamil"
                    register={register}
                    errors={errors}
                    label="Email"
                  />
                )}
                {selectedType === "phone" && (
                  <InputComponent
                    name="phone"
                    placeholder="Enter phone"
                    register={register}
                    errors={errors}
                    label="Phone"
                  />
                )}
                <PrimaryButton type="submit">Send</PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasword;
