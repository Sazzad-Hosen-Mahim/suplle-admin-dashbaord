import logo from "@/assets/logo.png";
import roundlogo from "@/assets/suplle-glyff.png";
import computerImage from "@/assets/Auth/computer.png";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { Link } from "react-router-dom";
import PrimaryButton from "@/components/shared/PrimaryButton";

const Welcome = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0F9996] to-[#56DAAB] dark:bg-gradient-to-r dark:from-[#030303] dark:to-[#030303]">
      <div className="flex justify-center md:justify-start md:px-[100px] pt-3 md:pt-6">
        <img src={logo} width={150} height={60} alt="Logo" />
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 py-[50px]">
        <div className="w-full md:w-1/2 flex flex-col gap-10">
          <div className="flex justify-center">
            <div className="max-w-[390px] w-full text-white flex flex-col gap-3">
              <h2 className="text-center text-5xl font-semibold">Welcomr</h2>
              <p className="text-[40px] font-light text-center">
                to our Restaurant Management System
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
                <img src={roundlogo} alt="Logo" width={85} height={85} />
                <p className="text-[#484B52] dark:text-white text-center">
                  Let’s Get You Started With Suplle
                </p>
              </div>

              <div className="w-full space-y-3">
                <div className="flex justify-center border-[1px] border-[#F4F5F7] rounded-[10px] w-full py-[13px] text-[#050505] dark:text-white">
                  <Link className="flex gap-4" to={"/login"}>
                    <GoogleIcon />
                    <p className="text-sm">Continue with Google</p>
                  </Link>
                </div>
                <div className="flex justify-center border-[1px] border-[#F4F5F7] rounded-[10px] w-full py-[13px]">
                  <Link className="flex gap-4" to={"/login"}>
                    <FacebookIcon />
                    <p className="text-sm">Continue with Facebook</p>
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                <PrimaryButton className="w-full text-base font-medium cursor-pointer">
                  Sign in Using Password
                </PrimaryButton>
                <p className="text-center text-[#59606E] text-sm">
                  New To Supple?{" "}
                  <span className="text-primary">
                    <Link to={"/signup"}>Sign Up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
