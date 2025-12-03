"use client";

import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LogoutModalProps {
    setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutModal = ({ setShowLogoutModal }: LogoutModalProps) => {

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
                <div className="w-[450px] z-10 flex flex-col gap-4 bg-gray-900 dark:bg-white rounded-xl p-6 border border-gray-700 shadow-lg">
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
                        <p className="text-xl font-semibold text-white dark:text-gray-900 text-center">Logout</p>
                        <p className="text-gray-400 dark:text-gray-600 text-center text-sm">
                            Are you sure you want to logout? You will need to login again to access your account.
                        </p>
                        <Button
                            onClick={() => router.push(SiteUrls.signIn)}
                            variant="contained"
                            sx={{
                                backgroundColor: '#EF4444',
                                color: '#fff dark:text-gray-900',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '12px',
                                width: '100%',
                                py: 1.5,
                                '&:hover': { backgroundColor: '#B91C1C' }
                            }}
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                borderColor: '#6B7280',
                                color: '#D1D5DB',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '12px',
                                width: '100%',
                                py: 1.5,
                                '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.1)' }
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                <div className="absolute inset-0" onClick={handleClose} />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-end justify-center fixed inset-0 bg-black/70 z-50 w-full h-full">
                <div className={`
                    w-full bg-gray-900 dark:bg-white rounded-t-[20px] p-5 flex flex-col gap-4
                    ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}
                `}>
                    <div className="self-center w-12 h-1.5 bg-gray-600 rounded-full mb-4" />

                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={imagesAddresses.icons.deny}
                            alt="logout"
                            width={60}
                            height={60}
                        />
                        <p className="text-lg font-semibold text-white dark:text-gray-900 text-center">Logout</p>
                        <p className="text-gray-400 dark:text-gray-600 text-center text-sm">
                            Are you sure you want to logout? You will need to login again to access your account.
                        </p>

                        <Button
                            onClick={() => router.push(SiteUrls.signIn)}
                            variant="contained"
                            sx={{
                                backgroundColor: '#EF4444',
                                color: '#fff',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '12px',
                                width: '100%',
                                py: 1.5,
                                '&:hover': { backgroundColor: '#B91C1C' }
                            }}
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                borderColor: '#6B7280',
                                color: '#D1D5DB',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '12px',
                                width: '100%',
                                py: 1.5,
                                '&:hover': { backgroundColor: 'rgba(107, 114, 128, 0.1)' }
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                <div className="absolute inset-0" onClick={handleClose} />
            </div>
        </>
    );
};

export default LogoutModal;
