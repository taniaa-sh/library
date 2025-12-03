"use client";

import useDarkMode from "@/app/hooks/useDarkModeAdmin";
import { menuItems } from "@/utils/adminMenuItems";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminHeader = () => {

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const { isDarkAdmin, toggleTheme2 } = useDarkMode();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="fixed bg-white dark:bg-[#0d1b3b] flex items-center gap-8 w-full p-6 !shadow-md z-50 transition-all">
            <div className="flex flex-col">
                <Image
                    src={isOpenSidebar ? imagesAddresses.icons.arrowLeft : imagesAddresses.icons.hamburgerMenu}
                    alt="logo"
                    width={24}
                    height={24}
                    className="md:hidden cursor-pointer dark:hidden"
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                />
                <Image
                    src={isOpenSidebar ? imagesAddresses.icons.arrowLeftWhite : imagesAddresses.icons.hamburgerMenuWhite}
                    alt="logo"
                    width={24}
                    height={24}
                    className="md:hidden cursor-pointer hidden dark:block md:dark:hidden"
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                />
                {
                    isOpenSidebar && (
                        <div className="fixed lg:hidden top-[75px] left-0 p-5 flex flex-col gap-2 w-[280px] h-screen z-50 bg-white dark:bg-[#0F172A] shadow-2xl transition-all">
                            {menuItems.map(
                                (item: { id: number, title: string, image: string, activeImage: string, link: string }) => {
                                    const isActive = pathname === item.link;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.link}
                                            onClick={() => setIsOpenSidebar(false)}
                                            className={`flex items-center gap-3 p-4 rounded-xl transition-all 
                                            ${isActive
                                                    ? "bg-[#25388C] !text-white font-semibold"
                                                    : "hover:bg-[#EDF1F1] dark:hover:bg-[#1E293B] text-gray-700 dark:text-gray-200"
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
                            <div
                                className="flex gap-2 mt-8 items-center border-2 border-[#EDF1F1] dark:border-[#1E293B] rounded-[62px] py-[10px] px-3 cursor-pointer"
                                onClick={() => { }}
                            >
                                <Image
                                    src={imagesAddresses.images.profile}
                                    alt="profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium text-base text-[#1E293B] dark:text-gray-100">Adrian Hajdin</p>
                                    <p className="font-normal text-sm text-[#8D8D8D] dark:text-gray-400">adrian@jsmastery.pro</p>
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
                    )
                }
            </div>

            {/* TEXT SECTION */}
            <div className="flex flex-col gap-[6px]">
                <p className="font-semibold text-lg md:text-2xl text-[#0F172A] dark:text-white">
                    Welcome, Adrian
                </p>
                <p className="font-normal text-xs md:text-base text-slate-500 dark:text-slate-300">
                    Monitor all of your projects and tasks here
                </p>
            </div>

            {/* SEARCH INPUT */}
            <input
                className="hidden md:block p-3 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E293B] text-black dark:text-white sm:w-[400px] w-full transition-all"
                type="text"
                placeholder="Search users, books by title, author, or genre."
                onChange={() => { }}
            />

            {/* DARK-MODE TOGGLE */}
            <Image
                src={isDarkAdmin ? imagesAddresses.icons.darkLightMode2 : imagesAddresses.icons.darkLightMode}
                alt="Toggle Theme"
                width={25}
                height={25}
                className="cursor-pointer brightness-90 hover:brightness-110"
                onClick={toggleTheme2}
                title="Change Theme"
            />
        </div>
    );
};

export default AdminHeader;
