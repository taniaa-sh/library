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

    const workerUrl =
        "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js";

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => setShowPdfModal(false), 250);
    };

    useEffect(() => {
        document.body.style.overflowY = "hidden";

        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);

    // Admin theme remains unchanged.
    // User theme matches the BookWise footer.
    const modalBgClass = isAdmin
        ? "bg-white dark:bg-gray-900"
        : "bg-[#0D0D0C] text-white dark:bg-[#F8F2E6] dark:text-[#17130F]";

    const overlayBgClass = isAdmin
        ? "bg-black/70"
        : "bg-black/60";

    const dividerClass = isAdmin
        ? "bg-gray-400 dark:bg-gray-600"
        : "bg-[#E7C9A5] dark:bg-[#B88A4B]";

    const borderClass = isAdmin
        ? "border-gray-700"
        : "border-[#E7C9A5]/60 dark:border-[#B88A4B]/60";

    return (
        <>
            {/* Desktop */}
            <div
                className={`hidden md:flex items-center justify-center fixed inset-0 w-full h-full z-[10002] ${overlayBgClass}`}
            >
                <div
                    className={`w-[450px] z-10 flex flex-col gap-4 rounded-xl p-6 border ${borderClass} shadow-lg ${modalBgClass}`}
                >
                    {isAdmin ? (
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
                                className="cursor-pointer self-end hidden dark:flex"
                                onClick={handleClose}
                            />
                        </>
                    )}

                    {isAdmin && (
                        <Image
                            src={imagesAddresses.icons.modalCloseWhite}
                            alt="close"
                            width={24}
                            height={24}
                            className="cursor-pointer self-end hidden dark:block"
                            onClick={handleClose}
                        />
                    )}

                    <div className="flex flex-col items-center gap-4">
                        <div className="w-full h-[400px] overflow-auto">
                            <Worker workerUrl={workerUrl}>
                                <Viewer fileUrl={pdfUrl} />
                            </Worker>
                        </div>

                        <CustomButton
                            text="Close"
                            color="white"
                            containerClassName={`w-full cursor-pointer text-nowrap ${!isAdmin ? "hidden" : ""}`}
                            onClick={handleClose}
                        />

                        <CustomButton
                            text="Close"
                            color="secondary"
                            containerClassName={`w-full cursor-pointer text-nowrap ${isAdmin ? "hidden" : ""}`}
                            onClick={handleClose}
                        />
                    </div>
                </div>

                <div
                    className="absolute inset-0"
                    onClick={handleClose}
                />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden fixed inset-0 z-[10002]">
                <div
                    className={`absolute inset-0 ${overlayBgClass}`}
                    onClick={handleClose}
                />

                <div
                    className={`relative z-10 mt-auto w-full rounded-t-[20px] px-5 py-3 flex flex-col gap-4 border-t ${borderClass} ${
                        modalBgClass
                    } ${
                        isClosing
                            ? "animate-slideDown"
                            : "animate-slideUp"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className={`self-center w-8 h-1 rounded-full mb-4 cursor-pointer ${dividerClass}`}
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
                        containerClassName={`w-full cursor-pointer text-nowrap ${!isAdmin ? "hidden" : ""}`}
                        onClick={handleClose}
                    />

                    <CustomButton
                        text="Close"
                        color="secondary"
                        containerClassName={`w-full cursor-pointer text-nowrap ${isAdmin ? "hidden" : ""}`}
                        onClick={handleClose}
                    />
                </div>
            </div>
        </>
    );
};

export default PdfPreviewModal;