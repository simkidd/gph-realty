import { SignUpFormData } from "@/app/(auth)/components/SignUpForm";
import instance from "@/services/axios";

export const signUpUser = async (data: SignUpFormData) => {
  const res = await instance.post("/auth/sign-up", data);
  return res.data;
};
