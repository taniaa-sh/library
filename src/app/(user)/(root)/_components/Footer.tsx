"use client";

import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gold100 to-gold200 dark:from-gold600 dark:to-gold700 text-black dark:text-white px-6 pt-12 pb-2 mt-16 rounded-t-4xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Logo */}
                <div className="flex flex-col items-start gap-4">
                    <Link
                        href={SiteUrls.dashbord}
                        className="flex items-center gap-2"
                    >
                        <Image
                            src={imagesAddresses.icons.FrameWhite}
                            alt="Logo"
                            width={120}
                            height={40}
                            className="!h-[20px] !w-[120px] dark:hidden block"
                        />
                        <Image
                            src={imagesAddresses.images.logo}
                            alt="Logo"
                            width={120}
                            height={40}
                            className="!h-[20px] !w-[120px] hidden dark:block"
                        />
                    </Link>
                    <p className="text-sm md:text-base max-w-xs">
                        Tawsigh Platform – The best way to securely manage and verify information.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">Links</h3>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                        <Link
                            href={SiteUrls.dashbord}
                            className="hover:!text-gold400 dark:hover:!text-gold200 group relative transition-colors duration-200"
                        >
                            Dashboard
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gold400 dark:bg-gold200 group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link
                            href={SiteUrls.profile}
                            className="hover:!text-gold400 dark:hover:!text-gold200 group relative transition-colors duration-200"
                        >
                            Profile
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gold400 dark:bg-gold200 group-hover:w-full transition-all duration-300" />
                        </Link>
                            <Link
                            href={SiteUrls.search}
                            className="hover:!text-gold400 dark:hover:!text-gold200 group relative transition-colors duration-200"
                        >
                            books
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gold400 dark:bg-gold200 group-hover:w-full transition-all duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">Social Media</h3>
                    <div className="flex gap-3">
                        <Link href="#" className="hover:scale-110 transition-transform">
                            <Image
                                src={imagesAddresses.icons.linkdin}
                                alt="linkdin"
                                width={24}
                                height={24}
                            />
                        </Link>
                        <Link
                            href="#"
                            className="hover:scale-110 transition-transform"
                        >
                            <Image
                                src={imagesAddresses.icons.email}
                                alt="email"
                                width={24}
                                height={24}
                            />
                        </Link>
                        <Link
                            href="#"
                            className="hover:scale-110 transition-transform"
                        >
                            <Image
                                src={imagesAddresses.icons.facebook1}
                                alt="facebook"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-black/20 dark:border-white/20 pt-4 text-sm text-center">
                © 2026 Tawsigh Platform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;