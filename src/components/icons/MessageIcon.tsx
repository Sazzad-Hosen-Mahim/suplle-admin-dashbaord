// components/icons/MessageIcon.tsx
import React from "react";

// Define the types for the props
interface MessageIconProps {
  size?: number; // Default to 20px if not provided
  color?: string; // Default to #202020 if not provided
  className?: string; // Optional className for styling
}

const MessageIcon: React.FC<MessageIconProps> = ({
  size = 20,
  color = "#202020", // Default color for the icon
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M15.3916 14.0253L15.7166 16.6587C15.8 17.3503 15.0583 17.8336 14.4666 17.4753L10.975 15.4003C10.5916 15.4003 10.2166 15.3753 9.84998 15.3253C10.4666 14.6003 10.8333 13.6836 10.8333 12.692C10.8333 10.3253 8.78331 8.40868 6.24997 8.40868C5.28331 8.40868 4.39165 8.68366 3.64998 9.16699C3.62498 8.95866 3.61664 8.75032 3.61664 8.53365C3.61664 4.74198 6.90831 1.66699 10.975 1.66699C15.0416 1.66699 18.3333 4.74198 18.3333 8.53365C18.3333 10.7837 17.175 12.7753 15.3916 14.0253Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.8334 12.6915C10.8334 13.6832 10.4667 14.5999 9.85003 15.3249C9.02503 16.3249 7.71669 16.9665 6.25002 16.9665L4.07502 18.2582C3.70835 18.4832 3.24168 18.1748 3.29168 17.7498L3.50002 16.1082C2.38335 15.3332 1.66669 14.0915 1.66669 12.6915C1.66669 11.2248 2.45002 9.93318 3.65002 9.16651C4.39169 8.68318 5.28335 8.4082 6.25002 8.4082C8.78335 8.4082 10.8334 10.3248 10.8334 12.6915Z"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MessageIcon;
