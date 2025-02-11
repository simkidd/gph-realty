import React from "react";
import { IService } from "./ServiceSection";
import Link from "next/link";
import Button from "../ui/Button";

const ServiceSectionCard = ({ service }: { service: IService }) => {
  return (
    <div className="rounded-[10px] shadow-custom-2 lg:py-[60px] p-5  lg:px-10 transition duration-500 text-left bg-white hover:bg-primary/10 group hover:-translate-y-[5px]">
      <div className="mb-[45px] relative inline-block before:content-[''] before:absolute before:w-10 before:h-10 before:rounded-full before:right-[-7px] before:bottom-[-7px] before:bg-primary before:opacity-0 before:group-hover:opacity-20 before:transition-colors duration-500 ">
        {service.icon}
        <div>
          <div className="w-0 h-[3px] group-hover:w-[68px] transition-all duration-300 absolute left-0 -bottom-5 bg-[#3b4249]"></div>
        </div>
      </div>
      <Link href="#">
        <h3 className="text-[#3b4249] font-bold leading-[1.5] tracking-[0.03em] drop-shadow-custom-2">
          {service.title}
        </h3>
      </Link>
      <p className="mb-5 lg:mb-[30px] text-[#586167b2] text-[13px] line-clamp-3 text-ellipsis leading-[1.75] tracking-[0.5px]">
        {service.description}
      </p>
      <Link href="#" className="">
        <Button className="group-hover:border-primary border-transparent border-2 group-hover:bg-transparent transition duration-500 text-primary  bg-primary/20 capitalize px-[30px]">
          <span>view more</span>
        </Button>
      </Link>
    </div>
  );
};

export default ServiceSectionCard;
