import { PropertyFormData } from "@/app/(dashboard)/components/properties/PropertyDetailsForm";
import { PropertyFilterInput } from "@/interfaces/property.interface";
import instance, { BASE_URL } from "@/services/axios";

export const getAllProperties = async (params?: PropertyFilterInput) => {
  const res = await instance.get("/properties", { params });
  return res.data;
};

export const getPropertyById = async (id: string) => {
  const res = await instance.get(`/properties/${id}`);
  return res.data;
};

export const getPropertyBySlug = async (slug: string) => {
  const res = await instance.get(`/properties/single/${slug}`);
  return res.data;
};

export const createProperty = async (data: PropertyFormData) => {
  const res = await instance.post("/properties/create", data);
  return res.data;
};

export const updateProperty = async (id: string, data: PropertyFormData) => {
  const res = await instance.patch(`/properties/update/${id}`, data);
  return res.data;
};

export const deleteProperty = async (id: string) => {
  const res = await instance.delete(`/properties/delete/${id}`);
  return res.data;
};

export const upload = async (data: FormData) => {
  const res = await instance.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getPropertiesForParams = async (params?: PropertyFilterInput) => {
  try {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const url = `${BASE_URL}/properties${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensures fresh data (useful for SSR)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText}`);
    }

    const data = await res.json();

    return data; // Make sure to return the data
  } catch (error) {
    console.error("Error fetching properties:", error);
    return []; // Avoid breaking the build
  }
};
