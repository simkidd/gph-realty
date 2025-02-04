"use client";
import { propertyData } from "@/data/propertyData";
import { setProperties } from "@/store/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useEffect } from "react";

const PropertyGrid = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);

  useEffect(() => {
    dispatch(setProperties(propertyData));
  }, [dispatch]);

  console.log("all properties", properties);

  return (
    <div className="">
      <div className="mt-24">
        {properties.map((property, i) => (
          <li key={i}>
            <Link href={`/properties/${property.id}`}>{property.name}</Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
