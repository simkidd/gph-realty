"use client";
import Button from "@/components/ui-custom/Button";
import { isAdmin } from "@/lib/roles";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="pt-[100px] container mx-auto px-3">
      <h2>Profile page</h2>

      <div className="p-4 ">
        <p className="mb-4">Signed in as {session?.user?.email}</p>

        <div className="flex flex-col gap-2 w-fit">
          {isAdmin(session) && (
            <Button
              className="px-4 py-2"
              onClick={() => {
                router.push("/admin");
              }}
            >
              Go to Dashboard
            </Button>
          )}

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
    </div>
  );
};

export default ProfilePage;
