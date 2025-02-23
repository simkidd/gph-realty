"use client";
import Button from "@/components/ui-custom/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed, EyeIcon, LockIcon, MailIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });


      if (res?.error) {
        toast.error(res?.error);
      } else {
        toast.success('Login successful');
        router.push(callbackUrl);
      }
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
        
      </div>
      <div className="flex mb-[30px] items-center justify-between gap-6">
        <label className="block mb-0 text-sm">
          <input className="accent-primary mr-2 " type="checkbox" />
          Remember me
        </label>
        <Link href="/" className="text-[rgba(88,97,103,0.7)] text-sm">
          Forgot password ?
        </Link>
      </div>
      <div className="">
        <Button type="submit" className="w-full mb-4" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
