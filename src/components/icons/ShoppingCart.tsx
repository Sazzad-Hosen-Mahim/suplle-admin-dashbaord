import React from "react";

// Define the types for the props
interface ShoppingCartIconProps {
  size?: number; // Default to 22px if not provided
  color?: string; // Default to white if not provided
  className?: string; // Optional className for styling
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({
  size = 22,
  color = "white", // Default color is white
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    className={className}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      aspectRatio: "1/1",
    }}
  >
    <path
      d="M0.916656 0.916504H4.58332L7.03999 13.1907C7.12381 13.6127 7.3534 13.9918 7.68857 14.2616C8.02374 14.5314 8.44313 14.6747 8.87332 14.6665H17.7833C18.2135 14.6747 18.6329 14.5314 18.9681 14.2616C19.3032 13.9918 19.5328 13.6127 19.6167 13.1907L21.0833 5.49984H5.49999M9.16666 19.2498C9.16666 19.7561 8.75625 20.1665 8.24999 20.1665C7.74373 20.1665 7.33332 19.7561 7.33332 19.2498C7.33332 18.7436 7.74373 18.3332 8.24999 18.3332C8.75625 18.3332 9.16666 18.7436 9.16666 19.2498ZM19.25 19.2498C19.25 19.7561 18.8396 20.1665 18.3333 20.1665C17.8271 20.1665 17.4167 19.7561 17.4167 19.2498C17.4167 18.7436 17.8271 18.3332 18.3333 18.3332C18.8396 18.3332 19.25 18.7436 19.25 19.2498Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShoppingCartIcon;
