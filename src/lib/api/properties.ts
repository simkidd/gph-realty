import { PropertyFormData } from "@/app/(dashboard)/components/properties/PropertyDetailsForm";
import { PropertyFilterInput } from "@/interfaces/property.interface";
import instance from "@/services/axios";

export const getAllProperties = async (params?: PropertyFilterInput) => {
  const res = await instance.get("/properties", { params });
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
