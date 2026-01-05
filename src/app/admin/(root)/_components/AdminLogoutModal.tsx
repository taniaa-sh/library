"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LogoutModalProps {
    setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminLogoutModal = ({ setShowLogoutModal }: LogoutModalProps) => {

    const router = useRouter();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setShowLogoutModal(false), 250);
    };

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        }
    }, []);

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-center fixed inset-0 w-full h-full bg-black/70 z-50">
                <div className="w-[450px] z-10 flex flex-col gap-4 dark:bg-gray-900 bg-white rounded-xl p-6 border border-gray-700 shadow-lg">
                    <Image
                        src={imagesAddresses.icons.modalClose}
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer self-end"
                        onClick={handleClose}
                    />
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={imagesAddresses.icons.deny}
                            alt="logout"
                            width={70}
                            height={70}
                        />
                        <p className="text-xl font-semibold dark:text-white text-gray-900 text-center">Logout</p>
                        <p className="dark:text-gray-400 text-gray-600 text-center text-sm">
                            Are you sure you want to logout? You will need to login again to access your account.
                        </p>
                        <CustomButton
                            text="Logout"
                            color="red"
                            containerClassName="w-full cursor-pointer flex text-nowrap"
                            onClick={() => router.push(SiteUrls.adminLogin)}
                        />
                        <CustomButton
                            text="Cancel"
                            color="blue"
                            containerClassName="w-full cursor-pointer flex text-nowrap"
                            onClick={handleClose}
                        />
                    </div>
                </div>
                <div className="absolute inset-0" onClick={handleClose} />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden fixed inset-0 z-50">
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/70"
                    onClick={handleClose}
                />

                {/* Bottom Sheet */}
                <div
                    className={`relative z-10 mt-auto w-full dark:bg-gray-900 bg-white rounded-t-[20px] p-5 flex flex-col gap-4
                    ${isClosing ? 'animate-slideDown' : 'animate-slideUp'} `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="self-center w-12 h-1.5 bg-gray-600 rounded-full mb-4" />

                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={imagesAddresses.icons.deny}
                            alt="logout"
                            width={60}
                            height={60}
                        />
                        <p className="text-lg font-semibold dark:text-white text-gray-900 text-center">
                            Logout
                        </p>
                        <p className="dark:text-gray-400 text-gray-600 text-center text-sm">
                            Are you sure you want to logout? You will need to login again to access your account.
                        </p>

                        <CustomButton
                            text="Logout"
                            color="red"
                            containerClassName="w-full cursor-pointer flex text-nowrap"
                            onClick={() => router.push(SiteUrls.adminLogin)}
                        />
                        <CustomButton
                            text="Cancel"
                            color="blue"
                            containerClassName="w-full cursor-pointer flex text-nowrap"
                            onClick={handleClose}
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default AdminLogoutModal;
