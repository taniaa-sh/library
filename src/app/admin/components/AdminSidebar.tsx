"use client";

import { Button } from "@/components/ui/button";
import { menuItems } from "@/utils/adminMenuItems";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-[280px] bg-white flex flex-col h-[calc(100vh-124px)] justify-between items-center max-h-screen overflow-y-auto !p-4">
            <div className="w-full">
                <div className="flex flex-col gap-4 !mb-6">
                    <Image
                        src={imagesAddresses.images.adminLogo}
                        alt="logo"
                        width={163}
                        height={77}
                    />
                </div>

                <nav className="flex flex-col gap-3 w-full">
                    {menuItems.map((item: { id: number, title: string, image: string, activeImage: string, link: string }) => {
                        const isActive = pathname === item.link;

                        return (
                            <Link
                                key={item.id}
                                href={item.link}
                                className={`flex items-center gap-3 !p-4 rounded-xl transition-all ${isActive
                                    ? "bg-[#25388C] !text-[#FFFFFF] font-semibold"
                                    : "hover:bg-gray-100 text-gray-700"
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
                />
            </div>
        </div>
    );
};

export default AdminSidebar;