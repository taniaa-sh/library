"use client";

import { menuItems } from "@/utils/adminMenuItems";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminHeader = () => {

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="fixed bg-white flex items-center gap-8 w-full p-6 !shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-50">
            <div className="flex flex-col">
                <Image
                    src={isOpenSidebar ? imagesAddresses.icons.arrowLeft : imagesAddresses.icons.hamburgerMenu}
                    alt="logo"
                    width={24}
                    height={24}
                    className="md:hidden cursor-pointer"
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                />
                {
                    isOpenSidebar && (
                        <div className="fixed lg:hidden top-[75px] left-0 !p-5 flex flex-col gap-2 w-[280px] h-screen z-50 bg-white !shadow-2xl">
                            {menuItems.map((item: { id: number, title: string, image: string, activeImage: string, link: string }) => {
                                const isActive = pathname === item.link;

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.link}
                                        onClick={() => setIsOpenSidebar(false)}
                                        className={`flex items-center gap-3 !p-4 rounded-xl transition-all ${isActive
                                            ? "bg-[#25388C] !text-[#FFFFFF] font-semibold"
                                            : "hover:bg-[#EDF1F1] text-gray-700"
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
                                className="flex gap-2 items-center border-2 border-[#EDF1F1] rounded-[62px] !py-[10px] !px-3"
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
                                    <p className="font-medium text-base text-[#1E293B]">Adrian Hajdin</p>
                                    <p className="font-normal text-sm text-[#8D8D8D]">adrian@jsmastery.pro</p>
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
            <div className="flex flex-col gap-[6px]">
                <p className="font-semibold text-lg md:text-2xl">Welcome, Adrian</p>
                <p className="font-normal text-xs md:text-base text-slate-500">Monitor all of your projects and tasks here</p>
            </div>
            <input
                className="hidden md:block p-3 rounded-lg placeholder-gray-400 border sm:w-[400px] w-full"
                type="text"
                placeholder="Search users, books by title, author, or genre."
                onChange={() => { }}
            />
        </div>
    );
};

export default AdminHeader;