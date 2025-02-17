"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <button onClick={() => signIn("google")}>
        Continue with Google
      </button>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
        });
      }}>
        <input name="email" type="email" required />
        <input name="password" type="password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}