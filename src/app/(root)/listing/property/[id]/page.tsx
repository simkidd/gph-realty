import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyHeader from "@/components/property/PropertyHeader";
import { propertyData } from "@/data/propertyData";
import React from "react";

const SinglePropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const property = propertyData.find((p) => p.id === id) || null;

  return (
    <>
      <PropertyHeader property={property!} />
      <PropertyDetails property={property!} />
    </>
  );
};

export default SinglePropertyPage;
