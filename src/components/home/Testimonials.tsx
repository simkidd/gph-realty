import React from "react";
import Badge from "../ui/Badge";
import Reviews from "./Reviews";

const Testimonials = () => {
  return (
    <section className="bg-black py-[90px]">
      <div className="container mx-auto px-3">
        <div className="pb-[50px] text-white flex flex-col items-center group">
          <Badge className="rounded-[5px] font-medium capitalize bg-primary text-white">Our</Badge>
          <h2 className="pt-[15px] leading-[1.3] text-[30px] ">
            Happy clients
          </h2>
          <hr className="w-[80px] h-[2px] text-white group-hover:w-[150px] transition-all duration-500 my-5" />
        </div>
        <div>
          <Reviews />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
