"use client";
import { signOut, useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <div className="pt-[100px] container mx-auto px-3">
      <h2>Profile page</h2>

      <div className="p-4">
        <p>Signed in as {session?.user?.email}</p>
        <button
          className="px-4 py-2 bg-red-500 text-white"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
