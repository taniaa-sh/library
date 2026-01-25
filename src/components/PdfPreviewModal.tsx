"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useEffect, useState } from "react";
// import PdfViewer from "./PdfViewer";

interface PdfPreviewModalProps {
    setShowPdfModal: React.Dispatch<React.SetStateAction<boolean>>;
    pdfUrl: string;
    isAdmin?: boolean;
}

const PdfPreviewModal = ({
    setShowPdfModal,
    pdfUrl,
    isAdmin = false,
}: PdfPreviewModalProps) => {

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

    const modalBgClass = isAdmin
        ? "bg-white dark:bg-gray-900"
        : "bg-gray-900 dark:bg-white";

    const overlayBgClass = isAdmin
        ? "bg-black/70"
        : "bg-white/70";

    const dividerClass = isAdmin
        ? "bg-gray-400 dark:bg-gray-600"
        : "bg-gray-600 dark:bg-gray-400";

    return (
        <>
            {/* desktop */}
            <div className={`hidden md:flex items-center justify-center fixed inset-0 w-full h-full z-[10002] ${overlayBgClass}`}
            >
                <div className={`w-[450px] z-10 flex flex-col gap-4 rounded-xl p-6 border border-gray-700 shadow-lg ${modalBgClass}`} >
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
                        className="cursor-pointer self-end hidden dark:block"
                        onClick={handleClose}
                    />

                    <div className="flex flex-col items-center gap-4">
                        {/* <PdfViewer fileUrl={pdfUrl} className="h-[280px] w-full" /> */}
                        <div className="w-full flex gap-2 justify-start">
                            <CustomButton
                                text="Close"
                                color="white"
                                containerClassName="w-fit cursor-pointer text-nowrap"
                                onClick={handleClose}
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0" onClick={handleClose} />
            </div>

            <div className="flex md:hidden fixed inset-0 z-[10002]">
                <div
                    className={`absolute inset-0 ${overlayBgClass}`}
                    onClick={handleClose}
                />

                <div
                    className={`relative z-10 mt-auto w-full rounded-t-[20px] p-5 flex flex-col gap-4
                     ${modalBgClass}
                     ${isClosing ? "animate-slideDown" : "animate-slideUp"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className={`self-center w-12 h-1.5 rounded-full mb-4 cursor-pointer ${dividerClass}`}
                        onClick={handleClose}
                    />
                    {/* <PdfViewer fileUrl={pdfUrl} className="h-[280px] w-full" /> */}

                    <CustomButton
                        text="Close"
                        color="white"
                        containerClassName={`w-full cursor-pointer text-nowrap ${!isAdmin && "hidden"}`}
                        onClick={handleClose}
                    />
                    <CustomButton
                        text="Close"
                        color="secondary"
                        containerClassName={`w-full cursor-pointer text-nowrap ${isAdmin && "hidden"}`}
                        onClick={handleClose}
                    />
                </div>
            </div>
        </>
    );
};

export default PdfPreviewModal;