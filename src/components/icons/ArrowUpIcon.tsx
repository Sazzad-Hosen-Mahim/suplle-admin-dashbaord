// components/icons/ArrowUpIcon.tsx
import React from "react";

// Define the types for the props
interface ArrowUpIconProps {
  size?: number; // Default to 24px if not provided
  color?: string; // Default to black if not provided
  className?: string; // Optional className for styling
}

const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
  size = 24,
  color = "#292D32", // Default color for the icon
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
      d="M19.9201 15.05L13.4001 8.53C12.6301 7.76 11.3701 7.76 10.6001 8.53L4.08008 15.05"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowUpIcon;
