// components/icons/GroupIcon.tsx
import React from "react";

// Define the types for the props
interface GroupIconProps {
  size?: number; // Default to 24px if not provided
  color?: string; // Default to black if not provided
  className?: string; // Optional className for styling
}

const GroupIcon: React.FC<GroupIconProps> = ({
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
      d="M22.8 0H1.20005C0.960049 0 0.800049 0.16 0.800049 0.4V23.6C0.800049 23.84 0.960049 24 1.20005 24H22.8C23.04 24 23.2 23.84 23.2 23.6V0.4C23.2 0.16 23.04 0 22.8 0ZM22.4 3.2H16.8V0.8H22.4V3.2ZM22.4 4V21.2H1.60005V4H22.4ZM16 0.8V3.2H1.60005V0.8H16ZM1.60005 23.2V22H22.4V23.2H1.60005Z"
      fill={color}
    />
    <path
      d="M12.0001 18.8C15.5201 18.8 18.4001 15.92 18.4001 12.4C18.4001 8.88 15.5201 6 12.0001 6C8.4801 6 5.6001 8.88 5.6001 12.4C5.6001 15.92 8.4801 18.8 12.0001 18.8ZM12.0001 6.8C15.0801 6.8 17.6001 9.32 17.6001 12.4C17.6001 15.48 15.0801 18 12.0001 18C8.9201 18 6.4001 15.48 6.4001 12.4C6.4001 9.32 8.9201 6.8 12.0001 6.8Z"
      fill={color}
    />
    <path
      d="M12.0001 16.8C14.4401 16.8 16.4001 14.84 16.4001 12.4C16.4001 9.96 14.4401 8 12.0001 8C9.5601 8 7.6001 9.96 7.6001 12.4C7.6001 14.84 9.5601 16.8 12.0001 16.8ZM12.0001 8.8C13.8801 8.8 15.4001 10.2 15.5601 12H14.0001V12.8H15.5601C15.3601 14.6 13.8401 16 12.0001 16C10.0001 16 8.4001 14.4 8.4001 12.4C8.4001 10.4 10.0001 8.8 12.0001 8.8Z"
      fill={color}
    />
    <path
      d="M12.0001 10.8V10C10.6401 10 9.6001 11.04 9.6001 12.4H10.4001C10.4001 11.52 11.1201 10.8 12.0001 10.8Z"
      fill={color}
    />
    <path d="M18.4001 1.60001H17.6001V2.40001H18.4001V1.60001Z" fill={color} />
    <path d="M20 1.60001H19.2V2.40001H20V1.60001Z" fill={color} />
    <path d="M21.6 1.60001H20.8V2.40001H21.6V1.60001Z" fill={color} />
    <path d="M12.0001 1.60001H2.40015V2.40001H12.0001V1.60001Z" fill={color} />
    <path d="M13.6 1.60001H12.8V2.40001H13.6V1.60001Z" fill={color} />
    <path d="M15.2001 1.60001H14.4001V2.40001H15.2001V1.60001Z" fill={color} />
    <path d="M21.6 19.2H20.8V20H21.6V19.2Z" fill={color} />
    <path d="M20 19.2H19.2V20H20V19.2Z" fill={color} />
    <path d="M18.4001 19.2H17.6001V20H18.4001V19.2Z" fill={color} />
    <path d="M20 17.6H19.2V18.4H20V17.6Z" fill={color} />
    <path d="M21.6 17.6H20.8V18.4H21.6V17.6Z" fill={color} />
    <path d="M21.6 16H20.8V16.8H21.6V16Z" fill={color} />
  </svg>
);

export default GroupIcon;
