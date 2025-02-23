import type { Session } from "next-auth";

export const isAdmin = (session: Session | null) => {
  return (
    session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN"
  );
};

export const isSuperAdmin = (session: Session | null) => {
  return session?.user?.role === "SUPER_ADMIN";
};
