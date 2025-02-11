import React from "react";
import { RiCustomerService2Line } from "react-icons/ri";
import { TbHomeHeart, TbHomeShield } from "react-icons/tb";
import ServiceSectionCard from "./ServiceSectionCard";

export interface IService {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const servicesList: IService[] = [
  {
    title: "Property Insurance",
    description:
      "Elegant retreat in a quiet Coral Gables setting. This home provides wonderful entertaining spaces with a chef kitchen opening.",
    icon: <TbHomeHeart size={48} className="text-primary" />,
  },
  {
    title: "Fastest Service",
    description:
      "This home provides wonderful entertaining spaces with a chef kitchen opening… Elegant retreat in a quiet Coral Gables setting",
    icon: <RiCustomerService2Line size={48} className="text-primary" />,
  },
  {
    title: "Largest Real Estate",
    description:
      "Elegant retreat in a quiet Coral Gables setting. This home provides wonderful entertaining spaces with a chef kitchen opening.",
    icon: <TbHomeShield size={48} className="text-primary" />,
  },
];

const ServiceSection = () => {
  return (
    <section className="relative bg-[#f8f9fa] py-[90px]">
      <div className="container mx-auto px-3">
        <div className="flex">
          <div className="">
            <div className="text-center">
              <div className="group text-center flex flex-col items-center">
                <h2 className="pt-[15px] leading-[1.3] text-[30px] font-bold text-[#1c2d3a]">
                  Provided Services
                </h2>
                <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
              </div>

              <p className="mb-[50px] text-[#3b4249] text-[15.52]">
                Residences can be classified into different type of housing
                tenure can used for same physical type.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[50px]">
              {servicesList.map((service, i) => (
                <div key={i} className="">
                  <ServiceSectionCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
