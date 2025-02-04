interface IMenu {
  name: string;
  href: string;
}
export const menuList: IMenu[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Property",
    href: "/properties",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Agent",
    href: "/agents",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
