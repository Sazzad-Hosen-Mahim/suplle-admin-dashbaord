import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 bg-black/30 backdrop-blur-md rounded-3xl z-50">
      <div className="text-primary-gradient text-3xl sm:text-4xl font-bold mb-2 sm:mb-0">
        Suplle
      </div>
      <div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto items-center">
        <Button
          className="w-full sm:w-auto bg-transparent border border-[#9540dadb] rounded-full text-sm sm:text-base text-[#9540dadb] hover:bg-[#9540dadb] hover:text-white px-5 py-2"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
        <Button
          className="w-full sm:w-auto rounded-full text-sm sm:text-base px-5 py-2 bg-[#9540dadb] text-white hover:bg-[#9540dadb]/70"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
