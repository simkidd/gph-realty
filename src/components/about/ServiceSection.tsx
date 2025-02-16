"use client";
import React from "react";
import { motion } from "framer-motion";
import { RiCustomerService2Line } from "react-icons/ri";
import { TbHomeHeart, TbHomeShield } from "react-icons/tb";
import ServiceSectionCard from "./ServiceSectionCard";

// Animation variants
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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const hoverVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export interface IService {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const servicesList: IService[] = [
  {
    title: "Tailored Property Matching",
    description:
      "Bespoke solutions that align properties with client lifestyles through our proprietary matching methodology",
    icon: <TbHomeHeart size={48} className="text-primary" />,
  },
  {
    title: "24/7 Client Success Team",
    description:
      "Dedicated support specialists providing rapid response solutions and transaction coordination",
    icon: <RiCustomerService2Line size={48} className="text-primary" />,
  },
  {
    title: "Exclusive Market Access",
    description:
      "Curated selection of premium properties through strategic industry partnerships and early-listing networks",
    icon: <TbHomeShield size={48} className="text-primary" />,
  },
];

const ServiceSection = () => {
  return (
    <section className="relative bg-[#f8f9fa] py-[90px]">
      <div className="container mx-auto px-3">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="flex">
            <div className="">
              <motion.div variants={containerVariants} className="text-center">
                <motion.div
                  variants={itemVariants}
                  className="group text-center flex flex-col items-center"
                >
                  <h2 className="pt-[15px] leading-[1.3] text-3xl lg:text-4xl font-bold text-[#1c2d3a]">
                    Modern Property Excellence
                  </h2>
                  <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="mb-[50px] text-[#3b4249] text-[15.52]"
                >
                  Redefining real estate services through innovative solutions
                  and client-first operational models
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-3 gap-[50px]"
              >
                {servicesList.map((service, i) => (
                  <motion.div
                    key={i}
                    variants={hoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ServiceSectionCard service={service} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
