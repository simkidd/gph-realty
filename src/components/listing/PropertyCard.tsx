import { IProperty } from "@/interfaces/property.interface";
import React from "react";
import Card from "../ui/Card";
import Slider, { type Settings } from "react-slick";
import Image from "next/image";
import {
  Heart,
  Bed,
  Bath,
  SquareDotIcon,
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { PiRadioButtonFill } from "react-icons/pi";
import Link from "next/link";

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

interface PropertyCardProps {
  property: IProperty;
}

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

const PropertyCard = ({ property }: PropertyCardProps) => {
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
    <Card className="rounded-xl overflow-hidden bg-white group property-card">
      {/* Image Slider */}
      <div className="relative">
        <Slider {...settings}>
          {property.images.slice(0, 4).map((img, i) => (
            <div key={i} className="h-[200px]">
              <Image
                src={img}
                alt={`image-${i}`}
                className="object-cover w-full h-full"
                width={300}
                height={300}
                priority
              />
            </div>
          ))}
        </Slider>

        <Badge
          className="bg-red-500 text-white rounded-md absolute top-4 left-4"
          size="sm"
        >
          Sale
        </Badge>

        <Badge
          className="bg-gray-800 text-white rounded-md absolute top-4 right-4"
          size="sm"
        >
          <CameraIcon size={16} className="mr-2" />
          {property.images.length}
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
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase">
          {property.location}
        </p>
        <Link href={`/listing/property/${property.id}`}>
          <h3 className="text-lg font-semibold  line-clamp-2 group-hover:text-primary">
            {property.name}
          </h3>
        </Link>
        <p className="text-primary text-lg font-bold">$6558.00</p>
        <p className="text-gray-500 text-sm mt-1">{property.description}</p>

        {/* Property Details */}
        <div className="flex items-center gap-4 mt-4 text-gray-600 text-sm">
          {detailItem(<Bed className="w-4 h-4" />, "Bed", 4)}
          {detailItem(<Bath className="w-4 h-4" />, "Baths", 4)}
          {detailItem(<SquareDotIcon className="w-4 h-4" />, "Sq Ft", 5000)}
        </div>

        {/* Date & Details Button */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-400 text-sm">August 4, 2022</p>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
