"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import LogoutModal from "@/app/(user)/(root)/_components/LogoutModal";
import useDarkMode from "@/app/hooks/useDarkModeAdmin";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {

  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isDark, toggleTheme } = useDarkMode();

  const menuItems = [
    { label: "Contact", href: SiteUrls.contact },
    { label: "About Us", href: SiteUrls.about },
    { label: "Profile", href: SiteUrls.profile },
    { label: "Search", href: SiteUrls.search },
    { label: "Home", href: SiteUrls.dashbord },
  ];

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [isDark])

  useEffect(() => {
    if (isMenuOpen) {
      window.history.pushState({ sidebar: true }, "");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handlePopState = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isMenuOpen]);

  return (
    <>
      {
        showLogoutModal && (
          <LogoutModal setShowLogoutModal={setShowLogoutModal} />
        )
      }
      <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-200 dark:via-gray-100 dark:to-gray-50 text-white dark:text-gray-900 flex items-center justify-between p-5 md:px-10 md:py-6 fixed top-0 z-[1003] shadow-lg">
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent dark:via-gray-500/70" />

        {/*logo*/}
        <Link href={SiteUrls.dashbord}>
          <Image
            src={isDark ? imagesAddresses.icons.FrameWhite : imagesAddresses.images.logo}
            alt="Logo"
            width={120}
            height={40}
            className="!h-[20px] !w-[120px]"
          />
        </Link>

        {/*desktop*/}
        <nav className="hidden md:flex items-center md:gap-4 lg:gap-8 text-lg">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 hover:!text-gold400 dark:hover:!text-gold800 ${pathName === item.href ? "!text-gold100 dark:!text-gold400 font-semibold" : "text-white dark:text-gray-900"
                }`}
            >
              {item.label}
            </Link>
          ))}
          <Image
            src={isDark ? imagesAddresses.icons.darkLightMode : imagesAddresses.icons.darkLightMode2}
            alt="theme"
            width={25}
            height={25}
            className="cursor-pointer"
            onClick={toggleTheme}
            title="change theme"
          />
          <Image
            src={imagesAddresses.icons.logout}
            alt="logout"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setShowLogoutModal(true)}
            title="logout"
          />
        </nav>

        {/* mobile hamburger */}
        <div
          className="md:hidden cursor-pointer p-2 rounded transition-transform duration-200 active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            src={isMenuOpen ? imagesAddresses.icons.closeMenue : imagesAddresses.icons.menue}
            alt="menu"
            width={20}
            height={20}
            className="cursor-pointer dark:hidden"
          />
          <Image
            src={isMenuOpen ? imagesAddresses.icons.closeMenueDark : imagesAddresses.icons.menue}
            alt="menu"
            width={20}
            height={20}
            className="cursor-pointer dark:block hidden"
          />
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* overlay */}
              <motion.div
                className="fixed md:hidden inset-0 bg-gray-900/60 dark:bg-gray-500/60 backdrop-blur-sm z-40 cursor-pointer top-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* mobile nav */}
              <motion.nav
                initial={{ opacity: 0, y: -20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-full left-0 w-full bg-gradient-to-b from-gray-900 dark:from-gray-400 to-gray-800 dark:to-gray-50 flex flex-col items-center py-6 gap-5 md:hidden shadow-2xl rounded-b-3xl z-50"
              >
                {menuItems.reverse().map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors duration-200 w-full text-center hover:!text-gold400 dark:hover:!text-gold800 ${pathName === item.href
                      ? "!text-gold100 dark:!text-gold400 font-semibold"
                      : "text-white dark:text-gray-900"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="flex gap-5 mt-4">
                  <Image
                    src={isDark ? imagesAddresses.icons.darkLightMode : imagesAddresses.icons.darkLightMode2}
                    alt="theme"
                    width={25}
                    height={25}
                    className="cursor-pointer"
                    onClick={() => {
                      toggleTheme();
                      setIsMenuOpen(false);
                    }}
                    title="change theme"
                  />
                  <Image
                    src={imagesAddresses.icons.logout}
                    alt="logout"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setShowLogoutModal(true);
                      setIsMenuOpen(false);
                    }}
                    title="logout"
                  />
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;