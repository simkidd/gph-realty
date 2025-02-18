"use client";
import React, { useState } from "react";
import Slider, { type Settings } from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../ui-custom/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Mark Andry",
    text: "I was worried it wouldn’t be done in time for my garden party, but they finished the job with time to spare!",
    role: "REAL ESTATE",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    text: "Amazing service! They handled everything professionally, and I couldn't be happier!",
    role: "FINANCE",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "John Smith",
    text: "The Landscaping Professionals were quick, courteous and very helpful. They helped me restore my lawn and gardens completely after putting in my deck.",
    role: "TECHNOLOGY",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 4,
    name: "Emily Watson",
    text: "They exceeded my expectations in every way possible!",
    role: "HOSPITALITY",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

// Custom Previous Arrow Component
const PrevArrow = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onClick } = props;
  return (
    <Button
      size="icon"
      className="absolute left-[1px] top-1/2 transform -translate-y-1/2 rounded-full z-[1] transition-all duration-300 w-[50px] h-[50px] bg-white/10 hover:bg-white/20 hidden lg:flex"
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
      className="absolute right-[1px] top-1/2 transform -translate-y-1/2 rounded-full z-[1]  transition-all duration-300 w-[50px] h-[50px] bg-white/10 hover:bg-white/20 hidden lg:flex"
      onClick={onClick}
    >
      <ChevronRightIcon size={20} />
    </Button>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings: Settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    afterChange: (index: number) => setCurrentIndex(index),
  };

  const getAvatar = (position: "prev" | "active" | "next") => {
    let index;
    if (position === "prev") {
      index = (currentIndex - 1 + reviews.length) % reviews.length;
    } else if (position === "next") {
      index = (currentIndex + 1) % reviews.length;
    } else {
      index = currentIndex;
    }
    return reviews[index].avatar;
  };

  return (
    <Slider {...settings} className="">
      {reviews.map((review, index) => (
        <div key={index} className="w-full inline-block">
          <div className="lg:w-[65%] w-full text-center px-[60px] py-10 bg-white/10 rounded-[10px] mt-[67px] mx-auto relative">
            <ul className="flex items-center justify-center absolute -top-[68px] left-0 right-0">
              <li className="-mr-[25px]">
                <Image
                  src={getAvatar("prev")}
                  alt="Previous"
                  className="w-[70px] h-[70px]  rounded-full transition-all duration-300 "
                  width={300}
                  height={300}
                />
              </li>
              <li className="relative">
                <Image
                  src={getAvatar("active")}
                  alt="Active"
                  className="w-[130px] h-[130px] z-[2] rounded-full shadow-lg transition-all duration-300 drop-shadow-custom"
                  width={300}
                  height={300}
                />
              </li>
              <li className="-ml-[25px]">
                <Image
                  src={getAvatar("next")}
                  alt="Next"
                  className="w-[70px] h-[70px] rounded-full transition-all duration-300 "
                  width={300}
                  height={300}
                />
              </li>
            </ul>
            <p className="text-lg text-white mt-[75px] mb-4 leading-loose">
              {review.text}
            </p>
            <h6 className="mt-4 font-medium mb-[25px] uppercase tracking-[16px] leading-[1.2] text-white">
              {review.role}
            </h6>
            <div className="mt-2 mb-5 text-yellow-500">
              {"⭐".repeat(review.rating)}
            </div>
            <span className="text-sm bg-white text-primary rounded-full font-bold py-[10px] px-[30px]">
              <span>{review.name}</span>
            </span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Reviews;
