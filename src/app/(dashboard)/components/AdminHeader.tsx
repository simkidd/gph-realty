"use client";
import { useIsMobile } from "@/hooks/useMobile";
import { UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { SidebarTrigger } from "./ui/Sidebar";

const AdminHeader = () => {
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-40 w-full h-[60px] border-b border-gray-200">
      <div className="flex w-full h-full items-center px-3 bg-white ">
        <div>{isMobile && <SidebarTrigger />}</div>

        <div className="ml-auto pr-2">
          <div className="flex items-center">
            <UserCircle2 className="w-8 h-8" />
            <div className="flex flex-col ml-2">
              <span className="font-semibold">{session?.user?.name}</span>
              <span className="text-xs">{session?.user?.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
