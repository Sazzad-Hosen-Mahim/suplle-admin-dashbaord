import React from "react";

// Define the types for the props
interface PeopleGroupIconProps {
  size?: number; // Default to 22px if not provided
  color?: string; // Default to white if not provided
  className?: string; // Optional className for styling
}

const PeopleGroupIcon: React.FC<PeopleGroupIconProps> = ({
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
      aspectRatio: "1/1", // Ensures the icon maintains the aspect ratio
    }}
  >
    <path
      d="M16.4998 6.5635C16.4448 6.55433 16.3806 6.55433 16.3256 6.5635C15.0606 6.51767 14.0523 5.48183 14.0523 4.1985C14.0523 2.88766 15.1065 1.8335 16.4173 1.8335C17.7281 1.8335 18.7823 2.89683 18.7823 4.1985C18.7731 5.48183 17.7648 6.51767 16.4998 6.5635Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5556 13.237C16.8115 13.4478 18.1956 13.2278 19.1673 12.577C20.4598 11.7153 20.4598 10.3036 19.1673 9.44198C18.1865 8.79115 16.784 8.57114 15.5281 8.79114"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.47235 6.5635C5.52735 6.55433 5.59152 6.55433 5.64652 6.5635C6.91152 6.51767 7.91985 5.48183 7.91985 4.1985C7.91985 2.88766 6.86568 1.8335 5.55485 1.8335C4.24402 1.8335 3.18985 2.89683 3.18985 4.1985C3.19902 5.48183 4.20735 6.51767 5.47235 6.5635Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.41661 13.237C5.16078 13.4478 3.77661 13.2278 2.80495 12.577C1.51245 11.7153 1.51245 10.3036 2.80495 9.44198C3.78578 8.79115 5.18828 8.57114 6.44411 8.79114"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 13.4107C10.945 13.4015 10.8809 13.4015 10.8259 13.4107C9.56088 13.3648 8.55255 12.329 8.55255 11.0457C8.55255 9.73483 9.60672 8.68066 10.9175 8.68066C12.2284 8.68066 13.2826 9.744 13.2826 11.0457C13.2734 12.329 12.265 13.374 11 13.4107Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.3326 16.2981C7.0401 17.1598 7.0401 18.5714 8.3326 19.4331C9.79926 20.4139 12.2009 20.4139 13.6676 19.4331C14.9601 18.5714 14.9601 17.1598 13.6676 16.2981C12.2101 15.3264 9.79926 15.3264 8.3326 16.2981Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PeopleGroupIcon;
