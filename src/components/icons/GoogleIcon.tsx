import React from "react";

// Define the types for the props
interface GoogleIconProps {
  size?: number; // Default to 20px if not provided
  color?: string; // Default to white if not provided
  className?: string; // Optional className for styling
}

const GoogleIcon: React.FC<GoogleIconProps> = ({
  size = 20,
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
    <path
      d="M16.8758 9.1749C16.8758 8.5274 16.8222 8.0549 16.7061 7.56491H9.1615V10.4874H13.59C13.5008 11.2136 13.0186 12.3074 11.9472 13.0424L11.9322 13.1402L14.3176 14.9512L14.4829 14.9674C16.0007 13.5936 16.8758 11.5724 16.8758 9.1749Z"
      fill="url(#paint0_linear_36_2847)"
    />
    <path
      d="M9.16098 16.875C11.3306 16.875 13.152 16.175 14.4824 14.9675L11.9467 13.0424C11.2681 13.5062 10.3574 13.8299 9.16098 13.8299C7.03601 13.8299 5.23246 12.4562 4.58954 10.5574L4.4953 10.5653L2.01486 12.4465L1.98242 12.5349C3.30383 15.1074 6.01811 16.875 9.16098 16.875Z"
      fill="#34A853"
    />
    <path
      d="M4.59004 10.5575C4.4204 10.0675 4.32223 9.54246 4.32223 8.99999C4.32223 8.45745 4.4204 7.93248 4.58112 7.44248L4.57662 7.33813L2.06509 5.42665L1.98291 5.46496C1.4383 6.53247 1.12579 7.73124 1.12579 8.99999C1.12579 10.2687 1.4383 11.4674 1.98291 12.535L4.59004 10.5575Z"
      fill="#FBBC05"
    />
    <path
      d="M9.16103 4.16998C10.6699 4.16998 11.6878 4.80873 12.2682 5.34251L14.536 3.1725C13.1432 1.90375 11.3306 1.125 9.16103 1.125C6.01814 1.125 3.30384 2.89249 1.98242 5.46497L4.58063 7.44249C5.23248 5.54375 7.03604 4.16998 9.16103 4.16998Z"
      fill="#EB4335"
    />
    <defs>
      <linearGradient
        id="paint0_linear_36_2847"
        x1="13.0186"
        y1="7.56491"
        x2="13.0186"
        y2="14.9674"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0057FF" />
        <stop offset="1" stopColor="#3B7EFC" />
      </linearGradient>
    </defs>
  </svg>
);

export default GoogleIcon;
