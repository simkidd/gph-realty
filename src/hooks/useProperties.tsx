"use client";
import {
  IProperty,
  PropertyFilterInput,
} from "@/interfaces/property.interface";
import { getAllProperties } from "@/lib/api/properties";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useProperties = (params: PropertyFilterInput) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["allProperties", params],
    queryFn: async () => getAllProperties(params),
  });

  const { properties, totalProperties, totalPages } = useMemo(() => {
    if (!data || isPending || isError)
      return { properties: [], totalProperties: 0, totalPages: 0 };

    return {
      properties: (data.data as IProperty[]) || [],
      totalProperties: data.meta.total || 0,
      totalPages: data.meta.totalPages || 0,
    };
  }, [data, isPending, isError]);

  return {
    properties,
    totalProperties,
    totalPages,
    isPending,
    isError,
    refetch,
  };
};

export default useProperties;
