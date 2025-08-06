import React from "react";

// Define the types for the props
interface FacebookIconProps {
  size?: number; // Default to 20px if not provided
  color?: string; // Default to white if not provided
  className?: string; // Optional className for styling
}

const FacebookIcon: React.FC<FacebookIconProps> = ({
  size = 20,
  color = "white", // Default color is white
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    className={className}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      aspectRatio: "1/1", // Ensures the icon maintains the aspect ratio
    }}
  >
    <g clipPath="url(#clip0_36_2855)">
      <path
        d="M7.515 17.91C3.24 17.145 0 13.455 0 9C0 4.05 4.05 0 9 0C13.95 0 18 4.05 18 9C18 13.455 14.76 17.145 10.485 17.91L9.99 17.505H8.01L7.515 17.91Z"
        fill="url(#paint0_linear_36_2855)"
      />
      <path
        d="M12.51 11.52L12.915 8.99999H10.53V7.24499C10.53 6.52499 10.8 5.98499 11.88 5.98499H13.05V3.68999C12.42 3.59999 11.7 3.50999 11.07 3.50999C9 3.50999 7.56 4.76999 7.56 7.01999V8.99999H5.31V11.52H7.56V17.865C8.055 17.955 8.55 18 9.045 18C9.54 18 10.035 17.955 10.53 17.865V11.52H12.51Z"
        fill={color}
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_36_2855"
        x1="9"
        y1="0"
        x2="9"
        y2="17.91"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0057FF" />
        <stop offset="1" stopColor="#3B7EFC" />
      </linearGradient>
      <clipPath id="clip0_36_2855">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default FacebookIcon;
