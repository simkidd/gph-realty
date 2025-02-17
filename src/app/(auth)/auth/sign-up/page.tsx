"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import bcrypt from "bcryptjs";

export default function SignUpPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const hashedPassword = await bcrypt.hash(
      formData.get("password") as string, 
      12
    );

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: hashedPassword,
        name: formData.get("name"),
      }),
    });

    if (response.ok) {
      signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      router.push("/");
    }
  }

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" required />
        <input name="email" type="email" required />
        <input name="password" type="password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}