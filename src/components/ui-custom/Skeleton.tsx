import React from "react";

interface SkeletonProps {
  className?: string;
  rounded?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, rounded }) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse ${
        rounded ? "rounded-full" : "rounded"
      } ${className}`}
    ></div>
  );
};

export default Skeleton;
