"use client";
import { propertyData } from "@/data/propertyData";
import { setProperties } from "@/store/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import PropertyCard from "../listing/PropertyCard";
import PropertyCardSkeleton from "../listing/PropertyCardSkeleton";
import Button from "../ui-custom/Button";

const BrowseOffers = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setProperties(propertyData));
      setLoading(false);
    }, 3000);
  }, [dispatch]);

  const filteredProperties = properties.filter((property) => {
    if (filter === "all") return true;
    return property.type === filter;
  });

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center pb-16"
        >
          <div className="pb-3">
            <h6 className="font-semibold text-sm uppercase text-primary tracking-wider">
              Explore Exclusive Listings
            </h6>
          </div>
          <motion.div
            className="group inline-flex flex-col items-center"
            whileHover="hover"
          >
            <div className="group text-center flex flex-col items-center">
              <h2 className="leading-[1.3] text-3xl lg:text-4xl font-bold text-[#1c2d3a]">
                Discover Your Next <br />
                <span className="text-primary">Dream Property</span>
              </h2>
              <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
            </div>
          </motion.div>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-wrap lg:justify-center gap-4 mb-12">
          {["all", "house", "apartment", "villa"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === type
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type === "all"
                ? "All Properties"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => <PropertyCardSkeleton key={i} />)
          ) : filteredProperties.length > 0 ? (
            filteredProperties.slice(0, 3).map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10">
              <p className="text-gray-500 text-lg font-medium">
                No properties found
              </p>
            </div>
          )}
        </div>

        {/* Load More / View All */}
        <div className="flex justify-center mt-12">
          <Link href="/listing">
            <Button className="group px-8 py-3">
              <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform mr-2" />
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrowseOffers;
