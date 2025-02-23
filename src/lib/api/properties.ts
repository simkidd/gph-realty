import { PropertyFormData } from "@/app/(dashboard)/components/properties/PropertyDetailsForm";
import { PropertyFilterInput } from "@/interfaces/property.interface";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
  // Add any other default headers (like Authorization) here
  // Authorization: `Bearer ${token}`,
};

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Request failed");
  }
  return res.json();
};

export const getAllProperties = async (params?: PropertyFilterInput) => {
  const url = new URL(`${baseUrl}/properties`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: defaultHeaders,
  });
  return handleResponse(res);
};

export const getPropertyById = async (id: string) => {
  const res = await fetch(`${baseUrl}/properties/${id}`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return handleResponse(res);
};

export const getPropertyBySlug = async (slug: string) => {
  const res = await fetch(`${baseUrl}/properties/single/${slug}`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return handleResponse(res);
};

export const createProperty = async (data: PropertyFormData) => {
  const res = await fetch(`${baseUrl}/properties/create`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateProperty = async (id: string, data: PropertyFormData) => {
  const res = await fetch(`${baseUrl}/properties/update/${id}`, {
    method: "PATCH",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteProperty = async (id: string) => {
  const res = await fetch(`${baseUrl}/properties/delete/${id}`, {
    method: "DELETE",
    headers: defaultHeaders,
  });
  return handleResponse(res);
};
