import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyHeader from "@/components/property/PropertyHeader";
import React from "react";

const SinglePropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <>
      <PropertyHeader />
      <PropertyDetails id={id} />
    </>
  );
};

export default SinglePropertyPage;
