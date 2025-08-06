import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  hover?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  isActive = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 px-5 h-12 flex items-center justify-center gap-2.5 rounded-xl text-[#0C7775] hover:bg-[#0f9996] hover:text-white text-xl font-medium cursor-pointer dark:bg-[#FFFFFF] dark:text-primary dark:hover:bg-gray-500 ${
        isActive ? `bg-[#0f9996] dark:bg-gray-500 text-white` : `bg-[#E7F6F6]`
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
