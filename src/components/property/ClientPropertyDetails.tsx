"use client";
import React from "react";
import PropertyHeader from "./PropertyHeader";
import PropertyDetails from "./PropertyDetails";
import { getPropertyBySlug } from "@/lib/api/properties";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../shared/ErrorMessage";

const ClientPropertyDetails = ({ slug }: { slug: string }) => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["getPropertyBySlug", slug],
    queryFn: async () => getPropertyBySlug(slug),
  });

  if (isError) {
    return (
      <ErrorMessage
        message={error?.message || "Failed to load property details"}
        onRetry={refetch}
      />
    );
  }

  return (
    <div>
      <PropertyHeader property={data} loading={isPending} />
      <PropertyDetails property={data} loading={isPending} />
    </div>
  );
};

export default ClientPropertyDetails;
