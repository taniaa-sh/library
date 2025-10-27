"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";

const Header = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: SiteUrls.dashbord },
    { label: "Search", href: SiteUrls.search },
    { label: "Profile", href: SiteUrls.profile },
  ];

  return (
    <header className="w-full bg-gray-900 text-white flex items-center justify-between p-5 md:px-10 md:py-6 relative">

      {/*logo*/}
      <Link href="/">
        <Image
          src={imagesAddresses.images.logo}
          alt="Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </Link>

      {/*desktop*/}
      <nav className="hidden md:flex items-center gap-8 text-lg">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors duration-200 hover:text-purple-400 ${pathName === item.href ? "text-purple-400 font-semibold" : "text-white"
              }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        className="md:hidden cursor-pointer p-2 rounded hover:bg-gray-800 transition-transform duration-200 ease-in-out active:scale-95"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image
          src={isMenuOpen ? imagesAddresses.icons.closeMenue : imagesAddresses.icons.menue}
          alt="Menu"
          width={20}
          height={20}
        />
      </div>

      {/* mobile*/}
      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-gray-900 flex flex-col items-center py-4 gap-4 md:hidden shadow-lg animate-fade-in">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 hover:text-purple-400 ${pathName === item.href ? "text-purple-400 font-semibold" : "text-white"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
