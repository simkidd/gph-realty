"use client";
import { useIsMobile } from "@/hooks/useMobile";
import { UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { SidebarTrigger } from "./ui/Sidebar";
import { formatText } from "@/utils/helpers";

const AdminHeader = () => {
  const isMobile = useIsMobile();
  const { data: session } = useSession();

  

  return (
    <div className="sticky top-0 z-40 w-full h-[60px] border-b border-gray-200">
      <div className="flex w-full h-full items-center px-3 bg-white ">
        <div>{isMobile && <SidebarTrigger />}</div>

        <div className="ml-auto pr-2">
          <div className="flex items-center">
            <UserCircle2 className="w-6 h-6" />
            <div className="flex flex-col ml-2">
              <span className="font-semibold text-sm">
                {session?.user?.name}
              </span>
              <span className="text-xs capitalize">
                {formatText(session?.user?.role as string).toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
