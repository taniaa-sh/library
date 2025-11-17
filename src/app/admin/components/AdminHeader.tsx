"use client";

import { menuItems } from "@/utils/adminMenuItems";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AdminHeader = () => {

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const pathname = usePathname();

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
                {/* {isOpenSidebar && (
                <div
                    className="fixed top-[80px] lg:hidden left-0 w-full h-[calc(100%-72px)] bg-black/30 z-40"
                    onClick={() => setIsOpenSidebar(false)}
                ></div>
            )} */}

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
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col gap-[6px]">
                <p className="font-semibold text-lg md:text-2xl">Welcome, Adrian</p>
                <p className="font-normal text-xs md:text-base text-slate-500">Monitor all of your projects and tasks here</p>
            </div>
        </div>
    );
};

export default AdminHeader;