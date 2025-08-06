import DarkVeil from "@/components/Darkveil";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignInBox = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full max-w-screen-xl min-h-[250px] mx-auto px-4 sm:px-6 py-16 rounded-3xl mt-24 overflow-hidden">
      {/* DarkVeil as background */}
      <div className="absolute inset-0 ">
        <DarkVeil />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Already have an{" "}
          <span className="text-primary-gradient">Account?</span>
        </h1>
        <Button
          className="bg-transparent border border-[#540595db] hover:bg-[#540595db] hover:text-white px-10 sm:px-20 py-4 sm:py-6 rounded-3xl text-[#540595db] text-base sm:text-lg flex mx-auto mt-10"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignInBox;
