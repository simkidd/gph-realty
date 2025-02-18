"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession, signOut } from "next-auth/react";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log("session: " + session)
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
      setErrorMessage(null); // Clear previous errors

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      console.log("res>>>", res);

      if (res?.error) {
        setErrorMessage(res.error); // Store the error message in state
      }
    } catch (error) {
      console.log("error>>>", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="p-4">
        <p>Signed in as {session.user?.email}</p>
        <button
          className="px-4 py-2 bg-red-500 text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {/* <button onClick={() => signIn("google")}>Continue with Google</button> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
