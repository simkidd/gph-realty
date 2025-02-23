"use client";
import { IProperty } from "@/interfaces/property.interface";
import {
  BathIcon,
  BedDoubleIcon,
  HeartIcon,
  RulerIcon,
  Share2Icon,
  SofaIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { StatusBadge } from "../listing/StatusBadge";
import Badge from "../ui-custom/Badge";
import Button from "../ui-custom/Button";
import { formatCurrency } from "@/utils/helpers";
import Skeleton from "../ui-custom/Skeleton";

const PropertyHeader = ({
  property,
  loading,
}: {
  property: IProperty;
  loading: boolean;
}) => {
  return (
    <section className="lg:bg-heading-bg bg-cover bg-no-repeat w-full h-auto relative">
      <div className="lg:h-[450px]">
        <Image
          src="/images/bg/inner-background.jpg"
          alt="inner-background"
          width={800}
          height={800}
          className="lg:hidden"
        />
      </div>

      <div className="w-full relative lg:absolute lg:-bottom-[76px] pt-[30px] pb-[20px]">
        <div className="container mx-auto px-3">
          <div className="grid lg:grid-cols-7 gap-4 justify-between p-[30px] bg-white shadow-md">
            {/* Left Side */}
            <div className="lg:col-span-5">
              <div className="flex items-center flex-wrap">
                {loading ? (
                  <Skeleton className="w-60 h-8" />
                ) : (
                  <h2 className="font-bold capitalize text-[30px] leading-[1.1]">
                    {property?.name}
                  </h2>
                )}
              </div>

              <div className="mt-2 flex">
                {loading ? (
                  <Skeleton className="w-24 h-6" />
                ) : (
                  <StatusBadge
                    status={property?.status}
                    className="rounded-md text-nowrap mb-auto"
                  />
                )}
              </div>
              <p className="mt-2 mb-4">
                {loading ? (
                  <Skeleton className="w-40 h-6" />
                ) : (
                  property?.location
                )}
              </p>

              <ul className="flex flex-wrap gap-4 mb-4">
                {[...Array(4)].map((_, index) => (
                  <li key={index}>
                    {loading ? (
                      <Skeleton className="w-32 h-6" />
                    ) : (
                      <div className="flex items-center">
                        {index === 0 && (
                          <BedDoubleIcon size={16} className="mr-[10px]" />
                        )}
                        {index === 1 && (
                          <BathIcon size={16} className="mr-[10px]" />
                        )}
                        {index === 2 && (
                          <SofaIcon size={16} className="mr-[10px]" />
                        )}
                        {index === 3 && (
                          <RulerIcon size={16} className="mr-[10px]" />
                        )}
                        <span className="text-sm">
                          {index === 0 && `${property?.beds} Bedrooms`}
                          {index === 1 && `${property?.baths} Bathrooms`}
                          {index === 2 && "2 Lobbies"}
                          {index === 3 && `${property?.area} Sq ft`}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                {loading ? (
                  <>
                    <Skeleton className="w-20 h-8" />
                    <Skeleton className="w-20 h-8" />
                  </>
                ) : (
                  <>
                    <Button size="sm" className="text-xs rounded-full">
                      <Share2Icon size={14} className="mr-1" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full"
                    >
                      <HeartIcon size={14} className="mr-1" />
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-2">
              <div className="flex items-center lg:justify-end mb-1">
                {loading ? (
                  <Skeleton className="w-24 h-6" />
                ) : (
                  <>
                    <StarIcon
                      size={18}
                      fill="#ffcc33"
                      className="text-[#ffcc33]"
                    />
                    <StarIcon
                      size={18}
                      fill="#ffcc33"
                      className="text-[#ffcc33]"
                    />
                    <StarIcon
                      size={18}
                      fill="#ffcc33"
                      className="text-[#ffcc33]"
                    />
                    <StarIcon
                      size={18}
                      fill="#ffcc33"
                      className="text-[#ffcc33]"
                    />
                    <StarIcon size={18} className="text-[#ffcc33]" />
                  </>
                )}
              </div>

              <h2 className="text-[30px] font-bold leading-[1.1] tracking-[0.001em] capitalize text-primary lg:text-right">
                {loading ? (
                  <Skeleton className="w-40 h-8" />
                ) : (
                  <>
                    {formatCurrency(property?.price as number)}
                    <span className="text-base font-medium">/ start From</span>
                  </>
                )}
              </h2>

              <div className="mt-4 flex items-center lg:justify-end gap-2">
                {loading ? (
                  <>
                    <Skeleton className="w-12 h-6" />
                    <Skeleton className="w-16 h-6" />
                  </>
                ) : (
                  <>
                    <Badge size="sm" variant="outline">
                      WiFi
                    </Badge>
                    <Badge size="sm" variant="outline">
                      Swimming
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeader;
