"use client";

import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const linkClass =
        "group flex w-fit items-center gap-3 text-sm text-stone-300 transition-colors duration-300 hover:text-[#E7C9A5] dark:text-[#594B3B] dark:hover:text-[#A87938]";

    const socialClass =
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E7C9A5]/70 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-[#E7C9A5] hover:bg-[#E7C9A5]/10 dark:border-[#B88A4B]/80 dark:hover:bg-[#E7C9A5]/30 sm:h-[52px] sm:w-[52px]";

    return (
        <footer className="relative isolate mt-20 overflow-hidden bg-[#0D0D0C] text-white dark:bg-[#F8F2E6] dark:text-[#17130F]">
            {/* Fade transition from page to footer */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-transparent via-[#0D0D0C]/70 to-[#0D0D0C] dark:via-[#F8F2E6]/70 dark:to-[#F8F2E6]"
            />

            {/* Subtle top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent dark:via-[#B88A4B]/70"
            />

            {/* Decorative glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-20 -z-10 h-64 w-64 rounded-full bg-[#A87938]/10 blur-3xl dark:bg-[#E7C9A5]/30"
            />

            {/* Background books image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-16 right-0 top-0 -z-10 hidden w-[70%] max-w-[600px] opacity-60 lg:block lg:opacity-80"
            >
                <Image
                    src="/images/footer-books.png"
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 450px, 35vw"
                    className="object-cover object-left"
                />

                {/* Blend image into background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0C] via-[#0D0D0C]/70 to-transparent dark:from-[#F8F2E6] dark:via-[#F8F2E6]/70 dark:to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-transparent to-[#0D0D0C]/30 dark:from-[#F8F2E6] dark:to-[#F8F2E6]/30" />
            </div>

            {/* Main content */}
            <div className="relative grid w-full max-w-7xl grid-cols-1 gap- px-6 pb-10 pt-24 sm:px-10 sm:pb-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:px-12 lg:pb-16 lg:pt-28 xl:px-16">
                {/* Brand */}
                <div className="flex min-w-0 flex-col items-start">
                    <Link
                        href={SiteUrls.dashbord}
                        aria-label="BookWise home"
                        className="mb-3 inline-flex max-w-full items-center"
                    >
                        <Image
                            src={imagesAddresses.images.logo}
                            alt="BookWise"
                            width={310}
                            height={80}
                            className="block h-auto w-[210px] object-contain sm:w-[260px] lg:w-[280px] dark:hidden"
                        />

                        <Image
                            src={imagesAddresses.icons.FrameWhite}
                            alt="BookWise"
                            width={310}
                            height={80}
                            className="hidden h-auto w-[210px] object-contain sm:w-[260px] lg:w-[280px] dark:block"
                        />
                    </Link>

                    <p className="mb-5 text-[9px] tracking-[0.35em] text-stone-300 sm:text-[10px] sm:tracking-[0.48em] dark:text-[#594B3B]">
                        MORE BOOKS. BETTER YOU.
                    </p>

                    <p className="max-w-sm text-sm leading-7 text-stone-400 dark:text-[#75634E]">
                        Discover new stories, explore fresh ideas, and find
                        your next favorite book with BookWise.
                    </p>
                </div>

                {/* Navigation */}
                <div className="relative z-10 flex flex-col items-start">
                    <h3 className="font-serif text-lg font-semibold sm:text-xl">
                        Explore
                    </h3>

                    <span className="mb-6 mt-3 h-[3px] w-[35px] bg-[#E7C9A5] dark:bg-[#B88A4B]" />

                    <nav className="flex flex-col gap-4 sm:gap-5">
                        <Link href={SiteUrls.dashbord} className={linkClass}>
                            Dashboard
                            <span className="text-lg text-[#E7C9A5] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#A87938]">
                                ›
                            </span>
                        </Link>

                        <Link href={SiteUrls.profile} className={linkClass}>
                            Profile
                            <span className="text-lg text-[#E7C9A5] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#A87938]">
                                ›
                            </span>
                        </Link>

                        <Link href={SiteUrls.search} className={linkClass}>
                            Browse books
                            <span className="text-lg text-[#E7C9A5] transition-transform duration-300 group-hover:translate-x-1 dark:text-[#A87938]">
                                ›
                            </span>
                        </Link>
                    </nav>
                </div>

                {/* Social media */}
                <div className="relative z-10 flex flex-col items-start">
                    <h3 className="font-serif text-lg font-semibold sm:text-xl">
                        Connect with us
                    </h3>

                    <span className="mb-6 mt-3 h-[3px] w-[35px] bg-[#E7C9A5] dark:bg-[#B88A4B]" />

                    <div className="flex items-center gap-3">
                        <Link
                            href="#"
                            aria-label="LinkedIn"
                            className={socialClass}
                        >
                            <Image
                                src={imagesAddresses.icons.linkdinWhite}
                                alt=""
                                width={22}
                                height={22}
                                className="block dark:hidden"
                            />
                            <Image
                                src={imagesAddresses.icons.linkdin}
                                alt=""
                                width={22}
                                height={22}
                                className="hidden dark:block"
                            />
                        </Link>

                        <Link
                            href="mailto:"
                            aria-label="Email"
                            className={socialClass}
                        >
                            <Image
                                src={imagesAddresses.icons.emailWhite}
                                alt=""
                                width={23}
                                height={23}
                                className="block dark:hidden"
                            />
                            <Image
                                src={imagesAddresses.icons.email}
                                alt=""
                                width={23}
                                height={23}
                                className="hidden dark:block"
                            />
                        </Link>

                        <Link
                            href="#"
                            aria-label="Facebook"
                            className={socialClass}
                        >
                            <Image
                                src={imagesAddresses.icons.facebook1White}
                                alt=""
                                width={23}
                                height={23}
                                className="block dark:hidden"
                            />
                            <Image
                                src={imagesAddresses.icons.facebook1}
                                alt=""
                                width={23}
                                height={23}
                                className="hidden dark:block"
                            />
                        </Link>
                    </div>

                    <p className="mt-6 font-serif text-sm italic leading-7 text-stone-400 sm:text-base dark:text-[#75634E]">
                        A little inspiration,
                        <br />
                        one page at a time.
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="relative z-10 border-t border-[#E7C9A5]/60 dark:border-[#B88A4B]/60">
                <div className="mx-auto flex min-h-[52px] max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-3 sm:min-h-[56px] sm:gap-4 sm:px-6">
                    <svg
                        width="24"
                        height="20"
                        viewBox="0 0 30 25"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0 text-[#E7C9A5] dark:text-[#A87938]"
                    >
                        <path
                            d="M15 6C11 2 5 2 2 3V21C7 19 12 21 15 24M15 6C19 2 25 2 28 3V21C23 19 18 21 15 24M15 6V24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <p className="text-center text-[10px] tracking-[0.08em] text-stone-400 sm:text-xs sm:tracking-[0.15em] dark:text-[#75634E]">
                        © {new Date().getFullYear()} BookWise. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;