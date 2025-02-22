import { GlobeIcon, HeartIcon, type LucideIcon, UserIcon } from "lucide-react";

interface IMenu {
  name: string;
  href: string;
  roles?: string[];
  icon?: LucideIcon;
}
export const menuList: IMenu[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Listing",
    href: "/listing",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact-us",
  },
  {
    name: "Dashboard",
    href: "/admin",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
];

export const rightMenu: IMenu[] = [
  {
    name: "",
    href: "",
    icon: GlobeIcon,
  },
  {
    name: "Favourites",
    href: "",
    icon: HeartIcon,
  },
  {
    name: "Account",
    href: "/profile",
    icon: UserIcon,
  },
];
