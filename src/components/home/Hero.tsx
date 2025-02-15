"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/real-estate-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative  text-center max-w-3xl mx-auto px-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Discover Your <span className="text-primary">Dream Home</span> Today
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Browse premium properties with expert guidance and seamless service.
        </p>


        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 bg-white rounded-lg flex overflow-hidden shadow-lg"
        >
          <input
            type="text"
            placeholder="Search by city, neighborhood, or address..."
            className="flex-1 px-4 py-3 text-gray-700 outline-none"
          />
          <button className="bg-primary px-6 py-3 text-white font-semibold hover:bg-primary-dark transition">
            Search
          </button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex flex-col md:flex-row justify-center gap-4"
        >
          <a
            href="/listings"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition transform hover:scale-105"
          >
            View Listings
          </a>
          <a
            href="/contact-us"
            className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition transform hover:scale-105"
          >
            Contact an Agent
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
