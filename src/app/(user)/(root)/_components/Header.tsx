
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { createPortal } from "react-dom";

import SiteUrls from "@/utils/routs";
import LogoutModal from "@/app/(user)/(root)/_components/LogoutModal";
import useDarkMode from "@/app/hooks/useDarkModeAdmin";
import imagesAddresses from "@/utils/imageAddresses";

const Header = () => {
  const pathName = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isDark, toggleTheme } = useDarkMode();
  const reduceMotion = useReducedMotion();

  const menuItems = [
    { label: "Home", href: SiteUrls.dashbord, number: "01" },
    { label: "Search", href: SiteUrls.search, number: "02" },
    { label: "About Us", href: SiteUrls.about, number: "03" },
    { label: "Contact", href: SiteUrls.contact, number: "04" },
    { label: "Profile", href: SiteUrls.profile, number: "05" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) =>
    pathName === href ||
    (href !== SiteUrls.dashbord && pathName.startsWith(`${href}/`));

  const iconButtonClass = `
    group relative flex size-10 shrink-0 items-center justify-center
    overflow-hidden rounded-xl border
    border-[#E7C9A5]/20 bg-gradient-to-br
    from-[#E7C9A5]/15 to-white/[0.02]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
    transition-all duration-300
    hover:-translate-y-0.5 hover:border-[#E7C9A5]/60
    hover:shadow-[0_0_22px_rgba(231,201,165,0.12)]
    dark:border-[#A87938]/20
    dark:from-[#B88A4B]/10 dark:to-white/40
    dark:hover:border-[#A87938]/50
    dark:hover:shadow-[0_0_22px_rgba(168,121,56,0.12)]
  `;

  return (
    <>
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}

      <motion.header
        initial={reduceMotion ? false : { y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-[1003] px-3 pt-3 sm:px-5 lg:px-8"
      >
        <div
          className="
            relative mx-auto max-w-[1600px]
            overflow-hidden rounded-2xl
            border border-white/[0.10]
            bg-[#0D0D0C]/85 text-white
            shadow-[0_15px_60px_rgba(0,0,0,0.30)]
            backdrop-blur-2xl
            dark:border-[#A87938]/20
            dark:bg-[#FFFDF8]/90 dark:text-[#17130F]
            dark:shadow-[0_15px_50px_rgba(100,70,25,0.08)]
            md:rounded-[24px]
          "
        >
          {/* Background gradients */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-28 size-64 rounded-full bg-[#E7C9A5]/[0.12] blur-[90px]" />

            <div className="absolute left-[35%] -top-32 size-56 rounded-full bg-violet-500/[0.07] blur-[90px] dark:bg-violet-300/[0.10]" />

            <div className="absolute -right-20 -bottom-32 size-64 rounded-full bg-amber-400/[0.08] blur-[90px] dark:bg-amber-500/[0.10]" />
          </div>

          {/* Gradient borders */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5] to-transparent opacity-80 dark:via-[#B88A4B]" />

          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/40 to-transparent dark:via-[#A87938]/30" />

          {/* Header content */}
          <div
            className="
              relative flex h-[66px] items-center justify-between gap-2 px-3
              sm:h-[70px] sm:gap-3 sm:px-5
              md:h-[80px] md:px-7
            "
          >
            {/* Logo */}
            <Link
              href={SiteUrls.dashbord}
              onClick={closeMenu}
              aria-label="BookWise home"
              className="group relative z-10 flex min-w-0 shrink-0 items-center"
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-[#E7C9A5]/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                <Image
                  src={imagesAddresses.images.logo}
                  alt="BookWise"
                  width={220}
                  height={60}
                  priority
                  className="relative block h-auto w-[112px] object-contain sm:w-[145px] lg:w-[190px] dark:hidden"
                />

                <Image
                  src={imagesAddresses.icons.FrameWhite}
                  alt="BookWise"
                  width={220}
                  height={60}
                  priority
                  className="relative hidden h-auto w-[112px] object-contain sm:w-[145px] lg:w-[190px] dark:block"
                />
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="
                hidden items-center gap-1 rounded-2xl
                border border-white/[0.07]
                bg-white/[0.025] p-1.5
                shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
                md:flex lg:gap-2
                dark:border-[#A87938]/10
                dark:bg-[#B88A4B]/[0.035]
              "
            >
              {menuItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      group relative isolate overflow-hidden
                      rounded-xl px-3 py-2.5
                      text-[12px] font-medium
                      transition-colors duration-300
                      lg:px-4 lg:text-[13px]
                      ${active
                        ? "!text-[#17130F] dark:!text-white"
                        : "text-stone-300 hover:text-white dark:text-[#665540] dark:hover:text-[#20180F]"
                      }
                    `}
                  >
                    {active && (
                      <motion.span
                        layoutId="bookwise-nav-highlight"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                        className="
                          absolute inset-0 -z-10 rounded-xl
                          bg-gradient-to-br
                          from-[#F3DDBB] via-[#E7C9A5] to-[#B88A4B]
                          shadow-[0_3px_15px_rgba(231,201,165,0.18)]
                          dark:from-[#A87938] dark:via-[#B88A4B]
                          dark:to-[#80551E]
                        "
                      />
                    )}

                    {!active && (
                      <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#E7C9A5]/0 via-[#E7C9A5]/[0.08] to-[#E7C9A5]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-[#B88A4B]/10" />
                    )}

                    <span className="relative flex items-center gap-2">
                      {active && (
                        <motion.span
                          initial={reduceMotion ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          className="size-1.5 rounded-full bg-[#755025] dark:bg-white"
                        />
                      )}

                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2">
              <motion.button
                type="button"
                whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                onClick={toggleTheme}
                aria-label="Change theme"
                title="Change theme"
                className={iconButtonClass}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[#E7C9A5]/0 to-[#E7C9A5]/10 opacity-0 transition-opacity group-hover:opacity-100" />

                <Image
                  src={
                    isDark
                      ? imagesAddresses.icons.darkLightMode
                      : imagesAddresses.icons.darkLightMode2
                  }
                  alt=""
                  width={21}
                  height={21}
                  className="relative transition-transform duration-500 group-hover:rotate-45"
                />
              </motion.button>

              {/* Desktop logout */}
              <motion.button
                type="button"
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                onClick={() => setShowLogoutModal(true)}
                aria-label="Logout"
                title="Logout"
                className="
                  group relative hidden h-10 items-center gap-2
                  overflow-hidden rounded-xl
                  border border-[#E7C9A5]/40
                  bg-gradient-to-r from-[#E7C9A5]/15
                  via-[#E7C9A5]/[0.06] to-transparent
                  px-3.5 text-xs font-medium text-[#E7C9A5]
                  transition-all duration-300
                  hover:border-[#E7C9A5]/70
                  hover:shadow-[0_0_25px_rgba(231,201,165,0.10)]
                  lg:flex
                  dark:border-[#A87938]/30
                  dark:from-[#B88A4B]/10 dark:text-[#91682E]
                  dark:hover:border-[#A87938]/60
                "
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <Image
                  src={imagesAddresses.icons.logout}
                  alt=""
                  width={17}
                  height={17}
                  className="relative"
                />

                <span className="relative">Logout</span>
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className={`${iconButtonClass} md:hidden`}
              >
                <Image
                  src={
                    isMenuOpen
                      ? isDark
                        ? imagesAddresses.icons.closeMenueDark
                        : imagesAddresses.icons.closeMenue
                      : imagesAddresses.icons.menue
                  }
                  alt=""
                  width={21}
                  height={21}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.button
                  type="button"
                  aria-label="Close menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  onClick={closeMenu}
                  className="fixed inset-0 z-[9997] bg-black/60 backdrop-blur-sm md:hidden"
                />

                {/* Mobile navigation */}
                <motion.nav
                  id="mobile-navigation"
                  aria-label="Mobile navigation"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: -10, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    fixed inset-x-3 top-[90px] z-[9999]
                    mx-auto w-auto max-w-lg
                    max-h-[calc(100dvh-106px)]
                    overflow-y-auto overscroll-contain
                    rounded-2xl border border-[#E7C9A5]/25
                    bg-[#10100F] p-4 text-white
                    shadow-[0_20px_70px_rgba(0,0,0,0.45)]
                    [scrollbar-width:thin]
                    sm:top-[94px]
                    sm:max-h-[calc(100dvh-110px)]
                    md:hidden
                    dark:border-[#A87938]/25
                    dark:bg-[#FFFDF8] dark:text-[#17130F]
                  "
                >
                  {/* Menu heading */}
                  <div className="mb-4 border-b border-white/10 pb-4 dark:border-[#A87938]/15">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-[2.5px] text-[#E7C9A5] dark:text-[#A87938]">
                          BOOKWISE
                        </p>

                        <h2 className="mt-1 text-lg font-semibold">
                          Explore BookWise
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Close navigation menu"
                        className="
                          flex size-10 shrink-0 items-center justify-center
                          rounded-xl border border-white/10
                          text-xl text-stone-300 transition-colors
                          hover:bg-white/5
                          dark:border-[#A87938]/15
                          dark:text-[#594B3B]
                          dark:hover:bg-[#A87938]/5
                        "
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* Navigation links */}
                  <div className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                      const active = isActive(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className={`
                            group flex min-h-[52px] items-center
                            justify-between gap-3 rounded-xl border
                            px-4 py-3 transition-all duration-200
                            ${active
                              ? "border-[#E7C9A5]/35 bg-[#E7C9A5]/10 text-[#E7C9A5] dark:border-[#A87938]/30 dark:bg-[#A87938]/10 dark:text-[#91682E]"
                              : "border-white/[0.08] text-stone-300 hover:border-[#E7C9A5]/25 hover:bg-white/[0.04] dark:border-[#A87938]/10 dark:text-[#594B3B] dark:hover:bg-[#A87938]/[0.05]"
                            }
                          `}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span className="truncate text-sm font-medium">
                              {item.label}
                            </span>
                          </span>

                          <span
                            aria-hidden="true"
                            className={`
                              shrink-0 text-base transition-transform duration-200
                              ${active
                                ? "translate-x-0 text-[#E7C9A5] dark:text-[#91682E]"
                                : "-translate-x-1 text-stone-500 group-hover:translate-x-0"
                              }
                            `}
                          >
                            ↗
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile logout */}
                  <div className="mt-4 border-t border-white/10 pt-4 dark:border-[#A87938]/15">
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        setShowLogoutModal(true);
                      }}
                      className="
                        flex min-h-[50px] w-full items-center
                        justify-center gap-2 rounded-xl
                        border border-red-500/20 bg-red-500/[0.04]
                        px-4 py-3 text-sm font-medium text-red-400
                        transition-colors hover:bg-red-500/10
                        dark:border-red-700/15 dark:text-red-600
                      "
                    >
                      <Image
                        src={imagesAddresses.icons.logout}
                        alt=""
                        width={17}
                        height={17}
                      />
                      Logout
                    </button>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Header;
