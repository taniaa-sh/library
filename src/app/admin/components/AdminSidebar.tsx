"use client";

import { menuItems } from "@/utils/adminMenuItems";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="
            hidden lg:flex lg:fixed w-[280px] 
            bg-white dark:bg-[#0d1b3b]
            border border-[#EDF1F1] dark:border-[#1E293B]
            flex-col h-[calc(100vh-124px)] 
            justify-between items-center 
            !min-h-screen overflow-y-auto p-4
            transition-all
        ">
            <div className="w-full">
                {/* LOGO */}
                <div className="flex flex-col gap-4 mb-6">
                    <Image
                        src={imagesAddresses.images.adminLogo}
                        alt="logo"
                        width={163}
                        height={77}
                        className="brightness-90 dark:hidden"
                    />
                    <Image
                        src={imagesAddresses.icons.adminLogoWhite}
                        alt="logo"
                        width={163}
                        height={77}
                        className="brightness-90 dark:block hidden"
                    />
                </div>

                {/* MENU */}
                <nav className="flex flex-col gap-3 w-full">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.link;

                        return (
                            <Link
                                key={item.id}
                                href={item.link}
                                className={`flex items-center gap-3 !p-4 rounded-xl transition-all ${isActive
                                    ? "bg-[#25388C] !text-[#FFFFFF] font-semibold"
                                    : "hover:bg-[#EDF1F1] dark:hover:bg-[#1E293B] text-gray-700"
                                    }`}
                            >
                                <Image
                                    src={isActive ? item.activeImage : item.image}
                                    alt={item.title}
                                    width={24}
                                    height={24}
                                />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* PROFILE */}
            <div
                className="
                    flex gap-2 items-center 
                    border-2 border-[#EDF1F1] dark:border-[#1E293B]
                    rounded-[62px] py-[10px] px-3
                    bg-white dark:bg-[#1E293B]
                    cursor-pointer transition-all
                "
            >
                <Image
                    src={imagesAddresses.images.profile}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-base text-[#1E293B] dark:text-white">
                        Adrian Hajdin
                    </p>
                    <p className="font-normal text-sm text-[#8D8D8D] dark:text-gray-400">
                        adrian@jsmastery.pro
                    </p>
                </div>
                <Image
                    src={imagesAddresses.icons.logout}
                    alt="logout"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => router.push(SiteUrls.logout)}
                />
            </div>
        </div>
    );
};

export default AdminSidebar;
