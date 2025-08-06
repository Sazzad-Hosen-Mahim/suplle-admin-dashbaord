import React from "react";

// Define the types for the props
interface EyeButtonProps {
  size?: number; // Default to 20px if not provided
  color?: string; // Default to white if not provided
  className?: string; // Optional className for styling
}

const EyeButton: React.FC<EyeButtonProps> = ({
  size = 20,
  // color = "white", // Default color is white
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="url(#paint0_linear_1118_20399)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="url(#paint1_linear_1118_20399)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1118_20399"
        x1="12"
        y1="0.209106"
        x2="13.1547"
        y2="22.4486"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1118_20399"
        x1="12"
        y1="0.209106"
        x2="13.1547"
        y2="22.4486"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
    </defs>
  </svg>
);

export default EyeButton;
