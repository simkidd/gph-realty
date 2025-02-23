import Link from "next/link";
import SignInForm from "../../components/SignInForm";

const SignInPage = () => {
  return (
    <div className="p-6 lg:p-[30px] shrink grow">
      <div className="mb-10 text-left">
        <h2 className="relative text-[2rem] leading-[1.2] mb-2 font-semibold before:content-[''] before:absolute before:w-[30px] before:h-[2px] before:bg-primary before:left-0 before:bottom-[-8px]">
          Log In
        </h2>
      </div>

      <SignInForm />
      <div className="flex justify-center">
        <Link
          href="/auth/sign-up"
          className="text-[#1c2d3a] transition duration-300 ease-in-out font-semibold text-sm capitalize text-center hover:underline hover:text-primary"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
