"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { IoMdMenu } from "react-icons/io";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Nav() {
  const [navHidden, setNavHidden] = useState(true);
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Tours",
      href: "/tours",
    },
    {
      name: "About",
      href: "/about",
    },
    // {
    //   name: "dashboard",
    //   href: "/login",
    // },
  ];

  return (
    <>
      <header className="w-full flex justify-center mt-5 z-10 fixed">
        <div className="w-2/3 bg-gray-300 flex items-center justify-around px-1 md:px-5 rounded-full">
          <Link
            href="/"
            className="w-1/3 flex font-medium items-center text-white"
          >
            <Image src={logo} alt="logo" width={60} />
          </Link>

          <nav className="hidden md:text-xl md:space-x-3 ml-auto md:flex items-center justify-center">
            {links.map((link) => (
              <Link
                className={`hover:border-b-2 border-primary-foreground ${
                  pathname === link.href ? "border-b-2" : ""
                }`}
                href={link.href}
                key={link.href}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="block md:hidden">
            <IoMdMenu
              color="black"
              size={25}
              onClick={() => setNavHidden(!navHidden)}
            />
          </div>
        </div>

        <div
          className={cn(
            "md:hidden w-full z-40 divide-y-4 p-3 absolute top-16 left-0 rounded-xl transition-all flex flex-col bg-gray-300 space-y-2 justify-center",
            navHidden ? "-translate-y-96" : "-translate-y-0"
          )}
        >
          {links.map((link) => (
            <Link
              onClick={() => setNavHidden(true)}
              className={`text-center`}
              href={link.href}
              key={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}
