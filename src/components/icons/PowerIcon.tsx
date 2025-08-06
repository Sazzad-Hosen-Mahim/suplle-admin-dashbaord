// components/icons/PowerIcon.js

const PowerIcon = ({ size = 24, color = "black", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_13_9)">
      <path
        d="M14 12H10V0H14V12ZM18.213 1.754L17 3.353C19.984 5.085 22 8.308 22 12C22 17.514 17.514 22 12 22C6.486 22 2 17.514 2 12C2 8.308 4.016 5.085 7 3.353L5.787 1.754C2.322 3.857 0 7.651 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 7.651 21.678 3.857 18.213 1.754Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_13_9">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default PowerIcon;
