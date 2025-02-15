import React from "react";
import { FaClock, FaDollarSign, FaMapPin } from "react-icons/fa6";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IconType } from "react-icons/lib";

interface ICardData {
  icon: IconType;
  title: string;
  description: string;
}

const cardData: ICardData[] = [
  {
    icon: HiOutlineShieldCheck,
    title: "Proven Trust in Real Estate",
    description: "Successfully closed over few property transactions with 100% client confidentiality and legal compliance.",
  },
  {
    icon: FaDollarSign,
    title: "Value-Focused Pricing",
    description: "Our strong market network ensures you get the best deals - 95% of our clients save 8-12% compared to market rates through our negotiations.",
  },
  {
    icon: FaClock,
    title: "Seamless Transactions",
    description: "Average 30-day closing process with our dedicated transaction managers, ensuring legal compliance and hassle-free property transfers.",
  },
  {
    icon: FaMapPin, 
    title: "Local Market Mastery",
    description: "Benefit from our hyper-local expertise - 85% of our agents have lived & worked in their service areas for 10+ years.",
  },
];

const WhyUs = () => {

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-3">
        <div className="text-center pb-[53px]">
          <div className="pb-3">
            <h6 className="font-medium text-[13px] uppercase text-primary">
              Find more choose
            </h6>
          </div>
          <div className="group text-center flex flex-col items-center">
            <h2 className="leading-[1.3] text-[30px] font-bold text-[#1c2d3a]">
              Why Choose Our Properties
            </h2>
            <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1170px] mx-auto">
          {cardData.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="mb-9 text-center group">
                <div className="relative flex items-center justify-center w-[120px] h-[120px] rounded-full border-2 z-[1] mb-[42px] mx-auto bg-transparent before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0  before:content-[''] before:rounded-full before:z-[-1] before:scale-50 before:opacity-0 before:transition-all before:duration-500 before:ease-[cubic-bezier(0.62,0.21,0.45,1.52)] before:bg-primary before:origin-center before:group-hover:opacity-100 before:group-hover:scale-[scaleX(1.0)] before:[transform-style:preserve-3d] border-gray-300 group">
                  <Icon className="relative w-[45px] h-[45px] text-primary before:transition-all before:duration-200 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg leading-7 font-semibold mb-3 capitalize">
                    {item.title}
                  </h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
