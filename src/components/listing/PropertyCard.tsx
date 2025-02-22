import { IProperty } from "@/interfaces/property.interface";
import {
  Bath,
  Bed,
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Heart,
  SquareDotIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiRadioButtonFill } from "react-icons/pi";
import Slider, { type Settings } from "react-slick";
import Badge from "../ui-custom/Badge";
import Button from "../ui-custom/Button";
import Card from "../ui-custom/Card";
import { StatusBadge } from "./StatusBadge";
import { formatCurrency } from "@/utils/helpers";
import { usePathname } from "next/navigation";

interface PropertyCardProps {
  property: IProperty;
  viewMode?: "grid" | "list";
}

// Helper function for property details
const detailItem = (
  icon: React.ReactNode,
  label: string,
  value: number | string
) => (
  <div className="flex items-center gap-1">
    {icon}{" "}
    <span>
      {label}: {value}
    </span>
  </div>
);

// Custom Previous Arrow Component
const PrevArrow = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onClick } = props;
  return (
    <Button
      size="icon"
      className="absolute group-hover:left-[15px] top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full shadow-md hover:bg-primary/80 z-[1] -left-[25px] transition-all duration-300 w-5 h-5"
      onClick={onClick}
    >
      <ChevronLeftIcon size={20} />
    </Button>
  );
};

// Custom Next Arrow Component
const NextArrow = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onClick } = props;
  return (
    <Button
      size="icon"
      className="absolute group-hover:right-[15px] top-1/2 transform -translate-y-1/2 bg-primary text-white hover:bg-primary/80 rounded-full z-[1] -right-[25px] transition-all duration-300 w-5 h-5"
      onClick={onClick}
    >
      <ChevronRightIcon size={20} />
    </Button>
  );
};

const PropertyCard = ({ property, viewMode = "grid" }: PropertyCardProps) => {
  const pathname = usePathname();

  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slick-dots",
    customPaging: () => (
      <PiRadioButtonFill
        size={24}
        className="text-white transition-all duration-300"
      />
    ),
  };

  return (
    <Card
      className={`rounded-xl flex overflow-hidden bg-white group property-card ${
        viewMode === "list" ? "flex-row" : "flex-col"
      }`}
    >
      {/* Image Slider */}
      <div
        className={`relative ${
          viewMode === "list" ? "w-1/2 lg:w-1/3 h-full" : "w-full"
        }`}
      >
        {property?.images?.length > 0 ? (
          <Slider {...settings} className="overflow-hidden h-[200px]">
            {property?.images?.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className={`${viewMode === "list" ? "h-[180px]" : "h-[200px]"}`}
              >
                <Image
                  src={img.imageUrl}
                  alt={`image-${i}`}
                  className="object-cover w-full h-[200px]"
                  width={300}
                  height={300}
                  priority
                  onLoad={(e) => {
                    // Add fade-in effect when image loads
                    e.currentTarget.classList.remove("opacity-0");
                    e.currentTarget.classList.add("opacity-100");
                  }}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="w-full h-[200px] bg-gray-300 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

        <StatusBadge
          status={property?.status}
          className="absolute top-4 left-4"
        />

        <Badge
          className="bg-gray-800 text-white rounded-md absolute top-4 right-4"
          size="sm"
        >
          <CameraIcon size={16} className="mr-2" />
          {property?.images?.length || 0}
        </Badge>
        <Button
          size="icon"
          variant="outline"
          className="absolute right-4 bottom-4 bg-white text-gray-800"
        >
          <Heart size={18} />
        </Button>
      </div>

      {/* Property Info */}
      <div
        className={`p-4 ${
          viewMode === "list" ? "w-1/2 lg:w-2/3 flex flex-col" : ""
        }`}
      >
        <p className="text-xs font-semibold text-gray-500 uppercase">
          {property?.location}
        </p>
        <Link
          href={
            pathname.includes("/admin")
              ? `/admin/properties/${property?.id}`
              : `/listing/property/${property?.slug}`
          }
        >
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
            {property?.name}
          </h3>
        </Link>
        <p className="text-primary font-bold mt-2">
          {formatCurrency(property?.price)}
        </p>
        <p
          className={`text-gray-500 mt-1 text-sm ${
            viewMode === "list" ? "hidden" : " line-clamp-2"
          }`}
        >
          {property?.description}
        </p>

        {/* Property Details */}
        <div
          className={`${
            viewMode === "list"
              ? "hidden"
              : "flex items-center flex-wrap gap-4 gap-y-2 mt-4 text-gray-600 text-sm"
          }`}
        >
          {detailItem(
            <Bed className="w-4 h-4" />,
            "Bed",
            property?.beds as number
          )}
          {detailItem(
            <Bath className="w-4 h-4" />,
            "Baths",
            property?.baths as number
          )}
          {detailItem(
            <SquareDotIcon className="w-4 h-4" />,
            "Sq Ft",
            property?.area as number
          )}
        </div>

        {/* Date & Details Button */}
        <div
          className={`flex justify-between items-center flex-wrap gap-2 ${
            viewMode === "list" ? "mt-auto" : " mt-4"
          }`}
        >
          {/* <p className="text-gray-400 text-sm">August 4, 2022</p> */}
          {viewMode === "list" && (
            <Link
              href={
                pathname.includes("/admin")
                  ? `/admin/properties/${property?.id}`
                  : `/listing/property/${property?.slug}`
              }
            >
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
