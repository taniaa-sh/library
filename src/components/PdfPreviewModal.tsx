"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

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
    const workerUrl = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

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
        : "bg-black/60";

    const dividerClass = isAdmin
        ? "bg-gray-400 dark:bg-gray-600"
        : "bg-gray-600 dark:bg-gray-400";

    return (
        <>
            {/* desktop */}
            <div className={`hidden md:flex items-center justify-center fixed inset-0 w-full h-full z-[10002] ${overlayBgClass}`}>
                <div className={`w-[450px] z-10 flex flex-col gap-4 rounded-xl p-6 border border-gray-700 shadow-lg ${modalBgClass}`} >
                    {
                        isAdmin ? (
                            <Image
                                src={imagesAddresses.icons.modalClose}
                                alt="close"
                                width={24}
                                height={24}
                                className="cursor-pointer self-end dark:hidden"
                                onClick={handleClose}
                            />
                        ) : (
                            <>
                                <Image
                                    src={imagesAddresses.icons.modalCloseWhite}
                                    alt="close"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer self-end dark:hidden"
                                    onClick={handleClose}
                                />
                                <Image
                                    src={imagesAddresses.icons.modalClose}
                                    alt="close"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer self-end dark:flex hidden"
                                    onClick={handleClose}
                                />
                            </>
                        )
                    }
                    <Image
                        src={imagesAddresses.icons.modalCloseWhite}
                        alt="close"
                        width={24}
                        height={24}
                        className="cursor-pointer self-end hidden dark:block"
                        onClick={handleClose}
                    />
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-full h-[400px] overflow-auto">
                            <Worker workerUrl={workerUrl}>
                                <Viewer fileUrl={pdfUrl} />
                            </Worker>
                        </div>
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
                    <div className="w-full h-[400px] overflow-auto">
                        <Worker workerUrl={workerUrl}>
                            <Viewer fileUrl={pdfUrl} />
                        </Worker>
                    </div>
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