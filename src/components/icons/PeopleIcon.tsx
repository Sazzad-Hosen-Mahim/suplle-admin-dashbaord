import React from "react";

// Define the types for the props
interface PeopleIconProps {
  size?: number; // Default to 19px if not provided
  color?: string; // Default to white if not provided
  className?: string; // Optional className for styling
}

const PeopleIcon: React.FC<PeopleIconProps> = ({
  size = 19,
  color = "#FFF9F9", // Default color is white (#FFF9F9)
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 16) / 19} // Adjust height to maintain the correct aspect ratio (16/19)
    viewBox="0 0 19 16"
    fill="none"
    className={className}
    style={{
      width: `${size}px`,
      height: `${(size * 16) / 19}px`, // Adjusted height for maintaining aspect ratio
      aspectRatio: "19/16", // Aspect ratio defined to ensure proper sizing
    }}
  >
    <path
      d="M13.3636 15V13.4444C13.3636 12.6193 13.038 11.828 12.4583 11.2446C11.8787 10.6611 11.0925 10.3333 10.2727 10.3333H4.09091C3.27115 10.3333 2.48496 10.6611 1.90531 11.2446C1.32565 11.828 1 12.6193 1 13.4444V15M18 15V13.4444C17.9995 12.7551 17.7715 12.0855 17.352 11.5407C16.9324 10.9959 16.3449 10.6068 15.6818 10.4344M12.5909 1.10111C13.2558 1.27246 13.8451 1.66166 14.2659 2.20735C14.6867 2.75305 14.9152 3.4242 14.9152 4.115C14.9152 4.8058 14.6867 5.47695 14.2659 6.02265C13.8451 6.56834 13.2558 6.95754 12.5909 7.12889M10.2727 4.11111C10.2727 5.82933 8.88888 7.22222 7.18182 7.22222C5.47476 7.22222 4.09091 5.82933 4.09091 4.11111C4.09091 2.39289 5.47476 1 7.18182 1C8.88888 1 10.2727 2.39289 10.2727 4.11111Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PeopleIcon;
