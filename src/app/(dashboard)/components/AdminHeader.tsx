"use client";
import React from "react";
import { SidebarTrigger } from "./ui/Sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import { BellIcon } from "lucide-react";

const AdminHeader = () => {
  const isMobile = useIsMobile();
  return (
    <div className="w-full h-[80px] border-b border-gray-200">
      <div>{isMobile && <SidebarTrigger />}</div>

      <div>
        <BellIcon />
      </div>
    </div>
  );
};

export default AdminHeader;
