"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import LogoutModal from "@/app/(root)/_components/LogoutModal";

const Header = () => {

  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isDark, setIsDark] = useState(false)

  const menuItems = [
    { label: "Home", href: SiteUrls.dashbord },
    { label: "Search", href: SiteUrls.search },
    { label: "Profile", href: SiteUrls.profile },
  ];

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [isDark])

  return (
    <>
      {
        showLogoutModal && (
          <LogoutModal setShowLogoutModal={setShowLogoutModal} />
        )
      }
      <header className="!w-full bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 flex items-center justify-between p-5 md:px-10 md:py-6 fixed top-0 z-50">

        {/*logo*/}
        <Link href="/">
          <Image
            src={isDark ? imagesAddresses.icons.FrameWhite : imagesAddresses.images.logo}
            alt="Logo"
            width={120}
            height={40}
            className="!h-[20px] !w-[120px]"
          />
        </Link>

        {/*desktop*/}
        <nav className="hidden md:flex items-center gap-8 text-lg">
          <Image
            src={isDark ? imagesAddresses.icons.darkLightMode : imagesAddresses.icons.darkLightMode2}
            alt="Search"
            width={25}
            height={25}
            className="cursor-pointer"
            onClick={() => { setIsDark(!isDark) }}
          />
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 hover:!text-[#b26e16] dark:hover:!text-[#6F460F] ${pathName === item.href ? "!text-light-200 dark:!text-[#b26e16] font-semibold" : "text-white"
                }`}
            >
              {item.label}
            </Link>
          ))}
          <Image
            src={imagesAddresses.icons.logout}
            alt="Search"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setShowLogoutModal(true)}
          />
        </nav>

        <div
          className="md:hidden cursor-pointer p-2 rounded transition-transform duration-200 ease-in-out active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            src={isMenuOpen ? imagesAddresses.icons.closeMenue : imagesAddresses.icons.menue}
            alt="Menu"
            width={20}
            height={20}
            className="cursor-pointer dark:hidden"
          />
          <Image
            src={isMenuOpen ? imagesAddresses.icons.closeMenueDark : imagesAddresses.icons.menue}
            alt="Menu"
            width={20}
            height={20}
            className="cursor-pointer dark:block hidden"
          />
        </div>

        {/* mobile*/}
        {isMenuOpen && (
          <nav className="absolute top-full border-t border-gray-300 left-0 w-full bg-gray-900 dark:bg-gray-50 flex flex-col items-center py-4 gap-4 md:hidden shadow-lg animate-fade-in z-50">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 w-full text-center hover:!text-[#b26e16] dark:hover:!text-[#6F460F] ${pathName === item.href ? "!text-light-200 dark:!text-[#b26e16] font-semibold" : "text-white"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2">
              <Image
                src={isDark ? imagesAddresses.icons.darkLightMode : imagesAddresses.icons.darkLightMode2}
                alt="Search"
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={() => { setIsDark(!isDark) }}
              />
              <Image
                src={imagesAddresses.icons.logout}
                alt="Search"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => setShowLogoutModal(true)}
              />
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
