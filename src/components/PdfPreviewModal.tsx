"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useEffect, useState } from "react";
import PdfViewer from "./PdfViewer";

interface LogoutModalProps {
    setShowPdfModal: React.Dispatch<React.SetStateAction<boolean>>
    pdfUrl: string
}

const PdfPreviewModal = ({ setShowPdfModal, pdfUrl }: LogoutModalProps) => {

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
            <div className="hidden md:flex items-center justify-center fixed inset-0 w-full h-full bg-black/70 z-[10002]">
                <div className="w-[450px] z-10 flex flex-col gap-4 dark:bg-gray-900 bg-white rounded-xl p-6 border border-gray-700 shadow-lg">
                    <Image
                        src={imagesAddresses.icons.modalClose}
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer self-end dark:hidden"
                        onClick={handleClose}
                    />
                    <Image
                        src={imagesAddresses.icons.modalCloseWhite}
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer self-end dark:flex hidden"
                        onClick={handleClose}
                    />
                    <div className="flex flex-col items-center gap-4">
                        <PdfViewer fileUrl={pdfUrl} className="h-[280px] w-full" />
                        <div className="w-full flex gap-2 justify-start">
                            <CustomButton
                                text="Close"
                                color="white"
                                containerClassName="w-fit cursor-pointer flex text-nowrap"
                                onClick={handleClose}
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0" onClick={handleClose} />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden fixed inset-0 z-[10002]">
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
                    <div
                        className="self-center w-12 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full mb-4 cursor-pointer"
                        onClick={handleClose}
                    />
                    <PdfViewer fileUrl={pdfUrl} className="h-[280px] w-full" />
                    <div className="flex flex-col items-center gap-4">
                        <CustomButton
                            text="Close"
                            color="white"
                            containerClassName="w-full cursor-pointer flex text-nowrap"
                            onClick={handleClose}
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default PdfPreviewModal;