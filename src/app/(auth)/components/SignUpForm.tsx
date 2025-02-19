"use client";

import Button from "@/components/ui-custom/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed, EyeIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log("first result: ", res);
      toast.success(res?.message);
    } catch (error) {
      console.log("error>>>", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-[30px]">
        <div className="relative flex flex-wrap w-full items-stretch">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
            <div className="flex items-center rounded-sm text-[#212529] px-0 py-[0.375rem] ">
              <UserIcon size={16} />
            </div>
          </div>
          <input
            type="text"
            {...register("name")}
            className="pl-10 w-[1%] grow shrink border-b borber-[#eee] text-base leading-[1.5] text-[#212529] rounded-[.25rem] transition-[bordercolor_0.15s_ease-in-out] px-3 py-[0.375rem] focus:outline-0"
            placeholder="Enter your name"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-[30px]">
        <div className="relative flex flex-wrap w-full items-stretch">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
            <div className="flex items-center rounded-sm text-[#212529] px-0 py-[0.375rem] ">
              <MailIcon size={16} />
            </div>
          </div>
          <input
            type="text"
            {...register("email")}
            className="pl-10 w-[1%] grow shrink border-b borber-[#eee] text-base leading-[1.5] text-[#212529] rounded-[.25rem] transition-[bordercolor_0.15s_ease-in-out] px-3 py-[0.375rem] focus:outline-0"
            placeholder="Enter email address"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-[30px]">
        <div className="relative flex flex-wrap w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
            <div className="flex items-center rounded-sm text-[#212529] py-[0.375rem] ">
              <LockIcon size={16} />
            </div>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="pl-10 w-[1%] grow shrink basis-auto border-b borber-[#eee] text-base leading-[1.5] text-[#212529] rounded-[.25rem] transition-[bordercolor_0.15s_ease-in-out] px-3 py-[0.375rem] focus:outline-0"
            placeholder="Password"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
            <div
              className="flex items-center rounded-sm text-[#212529] py-[0.375rem]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon size={18} /> : <EyeClosed size={18} />}
            </div>
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
        <div className="pl-[35px] mt-[5px] text-sm text-[rgba(88,97,103,0.4)]">
          Password should be a minimum of 8 characters and should contains
          letters and numbers
        </div>
      </div>

      <div className="">
        <Button type="submit" className="w-full mb-4" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
