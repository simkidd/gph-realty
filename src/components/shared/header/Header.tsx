"use client";
import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useMobile";
import { GlobeIcon, HeartIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { menuList, rightMenu } from "./menu";

const Header = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 text-white h-[60px] lg:h-[80px] flex items-center">
      <div className="container mx-auto px-3">
        <div className="w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl">Logo</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex">
              {menuList.map((nav, i) => (
                <li
                  key={i}
                  className="py-7 block float-left border-b border-b-transparent group"
                >
                  <Link
                    href={nav.href}
                    className="mr-10 text-sm font-bold uppercase tracking-[0.8px] hover:text-primary transition-colors duration-300 ease-in-out"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Icons */}
          <ul className="lg:flex hidden items-center gap-3">
            {rightMenu.map((item, i) => (
              <li key={i} className="py-7 mr-2">
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors duration-300 ease-in-out"
                >
                  {item.icon && <item.icon size={18} />}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              size="icon"
              className="text-white bg-transparent hover:bg-inherit hover:text-primary"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu (Slide-in from Right) */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end px-3 py-3 border-b border-b-gray-200">
          <Button
            size="icon"
            variant="outline"
            className="border-0"
            onClick={() => setMenuOpen(false)}
          >
            <XIcon />
          </Button>
        </div>

        <nav className="mt-8">
          <ul className="flex flex-col items-start px-6">
            {menuList.map((nav, i) => (
              <li
                key={i}
                className="py-2 w-full relative group hover:pl-2 transition-all duration-300"
              >
                <Link
                  href={nav.href}
                  className="text-sm font-bold uppercase tracking-wide block relative"
                  onClick={() => setMenuOpen(false)}
                >
                  {nav.name}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-3 px-6 mt-4">
            <li className="py-2 mr-2 hover:border-primary border-b-2 border-b-transparent">
              <Link href="">
                <GlobeIcon size={18} />
              </Link>
            </li>
            <li className="py-2 mr-2 hover:border-primary border-b-2 border-b-transparent">
              <Link href="">
                <HeartIcon size={18} />
              </Link>
            </li>
            <li className="py-2 mr-2 hover:border-primary border-b-2 border-b-transparent">
              <Link href="">
                <UserIcon size={18} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
