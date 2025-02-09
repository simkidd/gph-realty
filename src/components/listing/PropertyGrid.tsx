"use client";
import { propertyData } from "@/data/propertyData";
import { setProperties } from "@/store/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import PropertyCard from "./PropertyCard";

const PropertyGrid = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);

  useEffect(() => {
    dispatch(setProperties(propertyData));
  }, [dispatch]);

  return (
    <section className="py-[90px]">
      <div className="container mx-auto px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-3 hidden lg:flex">
            <div>left sidebar</div>
          </div>
          <div className="lg:col-span-9 col-span-12">
            <div className="mb-[30px] pb-[25px] border-b border-b-gray-200">
              <div>
                <h2 className="font-bold text-[30px] capitalize leading-[1.1] tracking-[0.001em]">
                  Properties Listing
                </h2>
                <span className="text-gray-500">
                  Showing <span className="text-primary">1-15 of 69</span>{" "}
                  Listings
                </span>
              </div>
              <div></div>
            </div>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {properties.map((property, i) => (
                  <div key={i}>
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
