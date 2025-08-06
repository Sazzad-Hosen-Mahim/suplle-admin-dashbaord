import { CiTwitter } from "react-icons/ci";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="mt-24 px-4  sm:px-10 lg:px-24 xl:px-36 pb-12 w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-primary-gradient text-3xl sm:text-4xl font-bold">
          Suplle
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="rounded-full bg-[#540595db] p-3 flex items-center justify-center">
            <CiTwitter className="w-6 h-6 text-white" />
          </div>
          <div className="rounded-full bg-[#540595db] p-3 flex items-center justify-center">
            <FiFacebook className="w-6 h-6 text-white" />
          </div>
          <div className="rounded-full bg-[#540595db] p-3 flex items-center justify-center">
            <IoLogoInstagram className="w-6 h-6 text-white" />
          </div>
          <div className="rounded-full bg-[#540595db] p-3 flex items-center justify-center">
            <FiGithub className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <hr className="mt-12 border-[#540595]" />
      <div className="text-[#737373] text-center mt-6 text-sm sm:text-base">
        © Copyright 2025, All Rights Reserved by{" "}
        <span className="font-semibold text-primary-gradient">Suplle</span>
      </div>
    </div>
  );
};

export default Footer;
