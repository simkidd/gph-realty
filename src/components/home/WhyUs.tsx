"use client";
import React from "react";
import { FaClock, FaDollarSign, FaMapPin } from "react-icons/fa6";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center pb-16"
        >
          <div className="pb-3">
            <h6 className="font-semibold text-sm uppercase text-primary tracking-wider">
              Why Partner With Us
            </h6>
          </div>
          <motion.div
            className="group inline-flex flex-col items-center"
            whileHover="hover"
          >
            <div className="group text-center flex flex-col items-center">
              <h2 className="leading-[1.3] text-3xl lg:text-4xl font-bold text-[#1c2d3a]">
                Redefining Real Estate <br />{" "}
                <span className="text-primary">Excellence</span>
              </h2>
              <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {cardData.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="mb-9 text-center group"
              >
                {/* Icon Circle */}
                <div className="relative flex items-center justify-center w-[120px] h-[120px] rounded-full border-2 z-[1] mb-[42px] mx-auto bg-transparent before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:content-[''] before:rounded-full before:z-[-1] before:scale-50 before:opacity-0 before:transition-all before:duration-500 before:ease-[cubic-bezier(0.62,0.21,0.45,1.52)] before:bg-primary before:origin-center before:group-hover:opacity-100 before:group-hover:scale-[scaleX(1.0)] before:[transform-style:preserve-3d] border-gray-300 group">
                  <Icon className="relative w-[45px] h-[45px] text-primary before:transition-all before:duration-200 group-hover:text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg leading-7 font-semibold mb-3 capitalize">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
