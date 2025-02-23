import { SignUpFormData } from "@/app/(auth)/components/SignUpForm";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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

export const signUpUser = async (data: SignUpFormData) => {
  const res = await fetch(`${baseUrl}/auth/sign-up`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};