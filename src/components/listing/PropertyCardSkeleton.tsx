import React from "react";
import Card from "../ui-custom/Card";
import Skeleton from "../ui-custom/Skeleton";

const PropertyCardSkeleton = () => {
  return (
    <Card className="rounded-xl overflow-hidden bg-white group property-card">
      {/* Image Skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-[200px] rounded-none" />

      </div>

      {/* Property Info Skeleton */}
      <div className="p-4">
        <Skeleton className="w-1/3 h-[12px] mb-2" />
        <Skeleton className="w-4/5 h-[30px] mb-2" />
        <Skeleton className="w-full h-[16px] mb-2" />
        <Skeleton className="w-full h-[16px] mb-2" />

        {/* Details Row */}
        <div className="flex items-center gap-4 mt-4">
          <Skeleton className="w-[50px] h-[16px]" />
          <Skeleton className="w-[50px] h-[16px]" />
          <Skeleton className="w-[50px] h-[16px]" />
        </div>

        {/* Date & Details */}
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="w-1/3 h-[16px]" />
        </div>
      </div>
    </Card>
  );
};

export default PropertyCardSkeleton;
