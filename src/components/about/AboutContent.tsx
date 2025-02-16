"use client";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";

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

const statsVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

const markerVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const AboutContent = () => {
  return (
    <section className="py-[90px]">
      <div className="container mx-auto px-3">
        <div className="w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="group text-center flex flex-col items-center"
            >
              <h2 className="pt-[15px] leading-[1.3] text-3xl lg:text-4xl font-bold text-[#1c2d3a]">
                The New Standard in Real Estate
              </h2>
              <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mb-[50px] text-[#3b4249] text-[15.52]"
            >
              Modern property solutions powered by innovative technology
              <br />
              and personalized service excellence.
            </motion.p>
          </motion.div>

          <div className="w-full">
            <div className="flex flex-col-reverse lg:grid grid-cols-12 gap-6">
              <div className="lg:col-span-5 col-span-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="mb-[36px]"
                >
                  <motion.h3
                    variants={itemVariants}
                    className="text-primary font-semibold mb-[10px] text-2xl leading-[1.2] tracking-[0.03em]"
                  >
                    Next-Gen <br />
                    Property Partners
                  </motion.h3>
                  <motion.div
                    variants={itemVariants}
                    className="leading-[1.8] tracking-[.5px] text-[15px] text-[#647589]"
                  >
                    Our tech-driven approach delivers:
                    <motion.ul
                      variants={containerVariants}
                      className="mt-4 list-disc pl-5"
                    >
                      {[
                        "Instant virtual tour access",
                        "Smart market analytics",
                        "24/7 digital consultations",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          className="mb-2"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="shadow-custom p-[30px]"
                >
                  <ul className="flex">
                    {[
                      { value: "95%", label: "Client Trust Score" },
                      { value: "4.9/5", label: "Service Rating" },
                      { value: "98%", label: "Deal Success Rate" },
                    ].map((stat, i) => (
                      <motion.li
                        key={i}
                        variants={statsVariants}
                        className="text-sm inline-block pl-8 first:pl-0"
                      >
                        <h4 className="text-primary font-semibold leading-[1.2] tracking-[.03em] capitalize text-[22px]">
                          {stat.value}
                        </h4>
                        <p className="text-[#647589] text-[15px] leading-[1.2]">
                          {stat.label}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <div className="lg:col-span-7 col-span-12 bg-map-image bg-contain bg-center bg-no-repeat block bg-blend-overlay bg-white/90 relative before:content-[''] before:block before:pt-[36%]">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="marker-icons"
                >
                  {[
                    { position: "top-[25%] right-[20%]" },
                    { position: "top-[18%] left-[20%]" },
                    {
                      position: "bottom-[39%] left-[47%] animate-bounce",
                      bounce: true,
                    },
                    { position: "top-[30%] right-[30%]" },
                  ].map((marker, i) => (
                    <motion.div
                      key={i}
                      variants={markerVariants}
                      className={`absolute ${marker.position}`}
                      // animate={marker.bounce ? { y: [-10, 10, -10] } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        ...(marker.bounce && {
                          type: "spring",
                          stiffness: 100,
                        }),
                      }}
                    >
                      <HiLocationMarker size={40} className="text-primary" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
