// components/icons/ExportRightIcon.tsx
import React from "react";

// Define the types for the props
interface ExportRightIconProps {
  size?: number; // Default to 24px if not provided
  color?: string; // Default to black if not provided
  className?: string; // Optional className for styling
}

const ExportRightIcon: React.FC<ExportRightIconProps> = ({
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
      d="M15.1001 16.44C14.7901 20.04 12.9401 21.51 8.8901 21.51H8.7601C4.2901 21.51 2.5001 19.72 2.5001 15.25V8.74C2.5001 4.27 4.2901 2.48 8.7601 2.48H8.8901C12.9101 2.48 14.7601 3.93 15.0901 7.47"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.99988 12H20.3799"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.15 15.35L21.5 12L18.15 8.64999"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ExportRightIcon;
