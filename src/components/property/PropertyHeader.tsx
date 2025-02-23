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

const PropertyHeader = ({ property }: { property: IProperty }) => {
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
            {/* left */}
            <div className="lg:col-span-5">
              <div className="flex items-center flex-wrap">
                <h2 className="font-bold capitalize text-[30px] leading-[1.1]">
                  {property?.name}
                </h2>
              </div>

              <div className="mt-2 flex">
                <StatusBadge
                  status={property?.status}
                  className="rounded-md text-nowrap mb-auto"
                />
              </div>
              <p className="mt-2 mb-4">{property?.location}</p>

              <ul className="flex flex-wrap gap-4 mb-4">
                <li>
                  <div className="flex items-center">
                    <BedDoubleIcon size={16} className="mr-[10px]" />
                    <span className="text-sm">{property?.beds} Bedrooms</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <BathIcon size={16} className="mr-[10px]" />
                    <span className="text-sm">{property?.baths} Bathrooms</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <SofaIcon size={16} className="mr-[10px]" />
                    <span className="text-sm">2 Lobbies</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <RulerIcon size={16} className="mr-[10px]" />
                    <span className="text-sm">
                      {property?.area} Sq ft
                    </span>
                  </div>
                </li>
              </ul>
              <div className="flex items-center gap-2">
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
              </div>
            </div>

            {/* right */}
            <div className="lg:col-span-2">
              <div className="flex items-center lg:justify-end mb-1">
                <StarIcon size={18} fill="#ffcc33" className="text-[#ffcc33]" />
                <StarIcon size={18} fill="#ffcc33" className="text-[#ffcc33]" />
                <StarIcon size={18} fill="#ffcc33" className="text-[#ffcc33]" />
                <StarIcon size={18} fill="#ffcc33" className="text-[#ffcc33]" />
                <StarIcon size={18} className="text-[#ffcc33]" />
              </div>
              <h2 className="text-[30px] font-bold leading-[1.1] tracking-[0.001em] capitalize text-primary lg:text-right">
                {formatCurrency(property?.price as number)}
                <span className="text-base font-medium">/ start From</span>
              </h2>
              <div className="mt-4 flex items-center lg:justify-end gap-2">
                <Badge size="sm" variant="outline">
                  WiFi
                </Badge>
                <Badge size="sm" variant="outline">
                  Swimming
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeader;
