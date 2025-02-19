import React from "react";
import SignUpForm from "../../components/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="p-6 lg:p-[30px] shrink grow">
      <div className="mb-10 text-left">
        <h2 className="relative text-[2rem] leading-[1.2] mb-2 font-semibold before:content-[''] before:absolute before:w-[30px] before:h-[2px] before:bg-primary before:left-0 before:bottom-[-8px]">
          Sign Up
        </h2>
      </div>
      <SignUpForm />
      <div className="flex justify-center">
        <Link
          href="/auth/sign-in"
          className="text-[#1c2d3a] transition duration-300 ease-linear font-semibold text-sm capitalize text-center hover:underline hover:text-primary"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
