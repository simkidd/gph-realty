"use client";
import { propertyData } from "@/data/propertyData";
import { setProperties } from "@/store/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import PropertyCardSkeleton from "../listing/PropertyCardSkeleton";
import PropertyCard from "../listing/PropertyCard";
import Link from "next/link";
import Button from "../ui/Button";

const BrowseOffers = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setProperties(propertyData));
      setLoading(false);
    }, 3000);
  }, [dispatch]);

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-3">
        <div className="text-center pb-[53px]">
          <div className="pb-3">
            <h6 className="font-medium text-[13px] uppercase text-primary">
              Browse Hot Offers
            </h6>
          </div>
          <div className="group text-center flex flex-col items-center">
            <h2 className="leading-[1.3] text-[30px] font-bold text-[#1c2d3a]">
              New Include Properties
            </h2>
            <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(3)].map((_, i) => <PropertyCardSkeleton key={i} />)
          ) : properties.length > 0 ? (
            properties.slice(0, 3).map((property, i) => (
              <div key={i}>
                <PropertyCard property={property} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10">
              <p className="text-gray-500 text-lg font-medium">
                No properties found
              </p>
            </div>
          )}
        </div>
        <div className="pt-10">
          <div className="flex justify-center">
            <Link href={"/listing"}>
              <Button className=" px-[30px]">View All Property</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseOffers;
