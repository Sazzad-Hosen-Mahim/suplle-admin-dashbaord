import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string; // Allow custom styling if needed
}

const Wrapper: React.FC<WrapperProps> = ({ children, className = "" }) => {
  return (
    <div className={`max-w-[1528px] mx-auto px-4 ${className}`}>{children}</div>
  );
};

export default Wrapper;
