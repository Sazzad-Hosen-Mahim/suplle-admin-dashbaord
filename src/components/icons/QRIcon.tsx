import React from "react";

// Define the types for the props
interface QRIconProps {
  size?: number; // Default to 31px if not provided
  color?: string; // Default to currentColor if not provided
  className?: string; // Optional className for styling
}

const QRIcon: React.FC<QRIconProps> = ({
  size = 31,
  color = "currentColor",
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 31 31"
    fill="none"
    className={className}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      aspectRatio: "1/1", // Ensures the icon maintains the aspect ratio
      color: color,
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.7832 2.88867H3.35463C2.7632 2.88867 2.2832 3.36867 2.2832 3.9601V10.3887C2.2832 10.9801 2.7632 11.4601 3.35463 11.4601C3.94606 11.4601 4.42606 10.9801 4.42606 10.3887V5.03153H9.7832C10.3746 5.03153 10.8546 4.55153 10.8546 3.9601C10.8546 3.36867 10.3746 2.88867 9.7832 2.88867Z"
      fill="url(#paint0_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.4971 5.03153H25.8542V10.3887C25.8542 10.9801 26.3342 11.4601 26.9256 11.4601C27.5171 11.4601 27.9971 10.9801 27.9971 10.3887V3.9601C27.9971 3.36867 27.5171 2.88867 26.9256 2.88867H20.4971C19.9056 2.88867 19.4256 3.36867 19.4256 3.9601C19.4256 4.55153 19.9056 5.03153 20.4971 5.03153Z"
      fill="url(#paint1_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.4971 28.603H26.9256C27.5171 28.603 27.9971 28.123 27.9971 27.5316V21.103C27.9971 20.5116 27.5171 20.0316 26.9256 20.0316C26.3342 20.0316 25.8542 20.5116 25.8542 21.103V26.4602H20.4971C19.9056 26.4602 19.4256 26.9402 19.4256 27.5316C19.4256 28.123 19.9056 28.603 20.4971 28.603Z"
      fill="url(#paint2_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.7832 26.4602H4.42606V21.103C4.42606 20.5116 3.94606 20.0316 3.35463 20.0316C2.7632 20.0316 2.2832 20.5116 2.2832 21.103V27.5316C2.2832 28.123 2.7632 28.603 3.35463 28.603H9.7832C10.3746 28.603 10.8546 28.123 10.8546 27.5316C10.8546 26.9402 10.3746 26.4602 9.7832 26.4602Z"
      fill="url(#paint3_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0693 17.8886C14.0693 17.2971 13.5893 16.8171 12.9979 16.8171H7.64076C7.04934 16.8171 6.56934 17.2971 6.56934 17.8886V23.2457C6.56934 23.8371 7.04934 24.3171 7.64076 24.3171H12.9979C13.5893 24.3171 14.0693 23.8371 14.0693 23.2457V17.8886Z"
      fill="url(#paint4_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0957 8.24574C14.0957 7.65432 13.6157 7.17432 13.0243 7.17432H7.66713C7.0757 7.17432 6.5957 7.65432 6.5957 8.24574V13.6029C6.5957 14.1943 7.0757 14.6743 7.66713 14.6743H13.0243C13.6157 14.6743 14.0957 14.1943 14.0957 13.6029V8.24574Z"
      fill="url(#paint5_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.7031 8.24574C23.7031 7.65432 23.2242 7.17432 22.6317 7.17432H17.2746C16.6831 7.17432 16.2031 7.65432 16.2031 8.24574V13.6029C16.2031 14.1943 16.6831 14.6743 17.2746 14.6743H22.6317C23.2242 14.6743 23.7031 14.1943 23.7031 13.6029V8.24574Z"
      fill="url(#paint6_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2832 17.8887H19.4261V20.0315H17.2832V17.8887Z"
      fill="url(#paint7_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.5771 22.1743H23.72V24.3172H21.5771V22.1743Z"
      fill="url(#paint8_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.4258 20.0315H21.5686V22.1744H19.4258V20.0315Z"
      fill="url(#paint9_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2744 22.1743H19.4173V24.3172H17.2744V22.1743Z"
      fill="url(#paint10_linear_1115_1398)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.5693 17.8887H23.7122V20.0315H21.5693V17.8887Z"
      fill="url(#paint11_linear_1115_1398)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1115_1398"
        x1="6.56892"
        y1="0.857836"
        x2="7.41747"
        y2="12.7434"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1115_1398"
        x1="23.7114"
        y1="0.857836"
        x2="22.8628"
        y2="12.7434"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1115_1398"
        x1="23.7114"
        y1="30.6339"
        x2="22.8628"
        y2="18.7483"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_1115_1398"
        x1="6.56892"
        y1="30.6339"
        x2="7.41747"
        y2="18.7483"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_1115_1398"
        x1="10.3193"
        y1="15.0402"
        x2="11.0618"
        y2="25.44"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_1115_1398"
        x1="10.3457"
        y1="5.39733"
        x2="11.0882"
        y2="15.7972"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_1115_1398"
        x1="19.9531"
        y1="5.39733"
        x2="20.6956"
        y2="15.7972"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_1115_1398"
        x1="18.3546"
        y1="17.381"
        x2="18.5668"
        y2="20.3524"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_1115_1398"
        x1="22.6486"
        y1="21.6666"
        x2="22.8607"
        y2="24.638"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint9_linear_1115_1398"
        x1="20.4972"
        y1="19.5238"
        x2="20.7093"
        y2="22.4952"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint10_linear_1115_1398"
        x1="18.3458"
        y1="21.6666"
        x2="18.558"
        y2="24.638"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
      <linearGradient
        id="paint11_linear_1115_1398"
        x1="22.6408"
        y1="17.381"
        x2="22.8529"
        y2="20.3524"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56DAAB" />
        <stop offset="1" stopColor="#0F9996" />
      </linearGradient>
    </defs>
  </svg>
);

export default QRIcon;
