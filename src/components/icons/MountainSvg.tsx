import React from "react";

interface MountainSvgProps extends React.SVGProps<SVGSVGElement> {
  height?: string | number;
  color?: string;
  className?: string;
}

const MountainSvg: React.FC<MountainSvgProps> = ({
  color = "#11A8A5",
  className,
  ...props
}) => {
  const gradientId =
    "paint0_linear_" + Math.random().toString(36).substring(2, 9);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%" // Always full width of parent
      height="100%"
      viewBox="0 0 359 62"
      fill="none"
      preserveAspectRatio="xMidYMid slice" // Ensures proper scaling behavior
      className={className}
      {...props}
    >
      {/* Stroke path */}
      <path
        d="M1 19.3867L41.8081 27.4801C43.5526 27.8261 45.3507 27.3856 46.8071 26.3647C52.4624 22.4004 67.722 13.0619 80.1108 17.8358C95.6325 23.8169 96.5375 -0.559509 114.659 1.22182C123.672 2.10774 125.571 13.4595 133.686 22.9309C139.713 29.9653 142.35 33.5309 150.041 33.9625C151.132 34.0237 152.205 33.709 153.141 33.1446L183.418 14.8781C184.271 14.3633 185.302 14.2307 186.257 14.5126V14.5126C187.216 14.7952 188.248 14.6612 189.103 14.1436L207.192 3.18256C209.354 1.87275 212.104 2.05799 214.071 3.64579L228.553 15.3396C229.986 16.4961 231.87 16.9311 233.664 16.5194L242.288 14.5411C243.617 14.2362 245.01 14.393 246.238 14.9856L275.017 28.876C276.528 29.605 278.274 29.6686 279.834 29.0513L313.762 15.6207C314.857 15.1873 316.055 15.0857 317.207 15.3284L323.704 16.6973C325.153 17.0026 326.664 16.7612 327.946 16.0196L349.554 3.51829C351.098 2.6248 352.96 2.46496 354.634 3.08216L358 4.32314"
        stroke={color}
        strokeWidth="2"
      />

      {/* Gradient fill path */}
      <path
        d="M41.8827 26.6354L0 18.3538V62H357V2.90975L352.014 2.23827L325.089 15.8917L314.12 14.5487L280.215 27.3069L276.226 28.426L241.823 13.4296L231.352 15.8917L212.405 2.23827H208.915L186.976 13.4296H184.483L169.525 21.935L152.074 32.0072L147.587 33.3502L137.615 28.2022L116.673 1.79061L111.687 0L103.71 1.79061L89.25 16.3394L83.7654 18.3538L72.7961 15.2202L62.824 16.3394L41.8827 26.6354Z"
        fill={`url(#${gradientId})`}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient
          id={gradientId}
          x1="178.5"
          y1="0"
          x2="178.5"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} stopOpacity="0.12" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MountainSvg;
