"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import HeroFilter from "./HeroFilter";

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section
      className="relative lg:h-screen py-28 pt-40 flex items-center justify-center overflow-hidden"
      ref={targetRef}
    >
      {/* Parallax Background Layers */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <Image
            src="/images/bg/hero-bg.jpg"
            alt="Luxury Home"
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
          />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute top-1/4 left-10 w-8 h-8 bg-primary/10 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-12 h-12 bg-primary/20 rounded-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-4 relative z-20 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md">
            Discover Your Perfect <span className="text-primary">Space</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto text-white drop-shadow-md">
            Where Luxury Meets Lifestyle - Explore Curated Properties in Prime
            Locations Nationwide
          </p>

          {/* Advanced Search */}
          <div className=" mb-12">
            <HeroFilter />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute lg:-bottom-24 left-1/2"
          initial={{ x: "-50%", y: 0 }}
          animate={{ x: "-50%", y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-14 rounded-full border-2 border-white/50 flex items-center justify-center">
            <div className="w-1 h-4 bg-white/80 rounded-full animate-scroll"></div>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10" />
    </section>
  );
};

export default Hero;
