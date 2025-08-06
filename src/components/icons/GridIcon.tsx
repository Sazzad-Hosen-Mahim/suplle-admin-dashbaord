import React from "react";

interface GridIconProps {
  size?: number; // Optional size, defaults to 25px
  color?: string; // Optional fill color, defaults to black
  className?: string; // Optional custom className
}

const GridIcon: React.FC<GridIconProps> = ({
  size = 25,
  // color = "#1C1B1F",
  className = "dark:text-white text-[#1C1B1F]",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill="none"
    className={`text-[#1C1B1F] dark:text-white ${className}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      aspectRatio: "1 / 1",
    }}
  >
    <mask
      id="mask0"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="25"
      height="25"
    >
      <rect x="0.666504" y="0.5" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0)">
      <path
        d="M4.1665 21V4H21.1665V21H4.1665ZM19.6665 19.5V13.25H13.4165V19.5H19.6665ZM19.6665 5.5H13.4165V11.75H19.6665V5.5ZM5.6665 5.5V11.75H11.9165V5.5H5.6665ZM5.6665 19.5H11.9165V13.25H5.6665V19.5Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default GridIcon;
