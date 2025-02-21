"use client";
import { CircleGaugeIcon, HomeIcon, Users2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "./ui/Sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: CircleGaugeIcon,
  },
  {
    title: "Properties",
    url: "/admin/properties",
    icon: HomeIcon,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users2Icon,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  const isItemActive = (itemUrl: string) => {
    if (pathname === itemUrl) return true; // Exact match first
    return (
      pathname.startsWith(itemUrl) &&
      pathname.split("/").length === itemUrl.split("/").length
    );
  };

  return (
    <Sidebar className="bg-gray-100">
      <SidebarHeader>
        <div className="flex items-center py-2">
          <Link href="/" className="text-xl">
            <div className="lg:h-[35px] h-[30px] px-2 ">
              <Image
                src="/images/logos/gph-logo-full-black.png"
                alt="logo"
                width={300}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="py-4 px-2">
          {items.map((item, i) => {
            return (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton
                  isActive={isItemActive(item.url)}
                  className="p-0"
                >
                  <Link
                    href={item.url}
                    className="h-full w-full flex items-center px-4 py-2"
                  >
                    <item.icon size={18} className="mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              className="px-4 py-2 bg-red-500 text-white"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
