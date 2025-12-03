"use client";

import imagesAddresses from "@/utils/imageAddresses";
import SiteUrls from "@/utils/routs";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LogoutModalProps {
    setShowPdfModal: React.Dispatch<React.SetStateAction<boolean>>
}

const PdfModal = ({ setShowPdfModal }: LogoutModalProps) => {

    const router = useRouter();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setShowPdfModal(false), 250);
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
                <div className="w-[1200px] z-10 flex flex-col gap-4 bg-gray-900 dark:bg-white rounded-xl p-6 border border-gray-700 shadow-lg">
                    <Image
                        src={imagesAddresses.icons.closeMenue}
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer self-end"
                        onClick={handleClose}
                    />
                    
                    <div className="flex justify-end items-end gap-4 relative bottom-0">
                        <Button
                            onClick={() => router.push(SiteUrls.signIn)}
                            variant="contained"
                            sx={{
                                backgroundColor: '#e7c9a5',
                                color: 'black',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '12px',
                                width: '100%',
                                py: 1.5,
                                '&:hover': { backgroundColor: '#e7c9a5' }
                            }}
                        >
                            download
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
            <div></div>
        </>
    );
};

export default PdfModal;
