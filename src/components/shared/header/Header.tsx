"use client";
import { GlobeIcon, HeartIcon, MenuIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { menuList } from "./menu";
import { useIsMobile } from "@/hooks/useMobile";
import Button from "@/components/ui/Button";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10 text-white min-h-[60px]">
      <div className="container mx-auto px-3">
        <div className="w-full h-full flex justify-between items-center ">
          <div className="flex items-center">
            <Link href="/">Logo</Link>
          </div>

          {isMobile ? (
            <Button size="icon">
              <MenuIcon />
            </Button>
          ) : (
            <nav>
              <ul className="flex">
                {menuList.map((nav, i) => (
                  <li key={i} className="py-7 block float-left">
                    <Link
                      href={nav.href}
                      className="mr-10 text-sm font-bold uppercase tracking-[0.8px]"
                    >
                      {nav.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <ul className="lg:flex hidden items-center gap-3">
            <li className="py-7 mr-2">
              <Link href="">
                <GlobeIcon size={18} />
              </Link>
            </li>
            <li className="py-7 mr-2">
              <Link href="">
                <HeartIcon size={18} />
              </Link>
            </li>
            <li className="py-7 mr-2">
              <Link href="">
                <UserIcon size={18} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
