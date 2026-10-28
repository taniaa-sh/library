
'use client';

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";
import showToast from "@/utils/toast";
import PdfPreviewModal from "./PdfPreviewModal";

type DragAndDropUploadProps = {
    onChange: (file: File | null) => void;
    type?: 'image' | 'video' | 'pdf';
    preview?: string;
    error?: string;
    shakeTrigger?: number;
};

const DragAndDropUpload = ({
    onChange,
    type = 'image',
    preview,
    error,
    shakeTrigger,
}: DragAndDropUploadProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const path = usePathname();
    const isAdminPath = path?.startsWith('/admin');
    const [showPdfModal, setShowPdfModal] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleFile = (file: File) => {
        if (type === 'image' && !file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error', true);
            return;
        }

        if (type === 'video' && !file.type.startsWith('video/')) {
            showToast('Please select a video file', 'error', true);
            return;
        }

        if (type === 'pdf' && file.type !== 'application/pdf') {
            showToast('Please select a pdf file', 'error', true);
            return;
        }

        if (previewUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFileName(file.name);
        onChange(file);
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (previewUrl?.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(null);
        setFileName(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }

        onChange(null);
    };

    const handleViewPdf = () => {
        setShowPdfModal(true);
    };

    const fileTypeLabel =
        type === 'image' ? 'image' : type === 'video' ? 'video' : 'PDF';

    // Admin styles remain unchanged.
    const dropZoneClass = isAdminPath
        ? `
            bg-light-600 dark:bg-dark-400
            ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400'}
        `
        : `
            border-[#7A6233]/70
            bg-[#171614]
            hover:border-[#E7C9A5]
            hover:bg-[#211E19]
            dark:border-[#D6B98C]/70
            dark:bg-[#F8F2E6]
            dark:hover:border-[#B88A4B]
            dark:hover:bg-[#F4E9D6]
            ${isDragging
            ? 'border-[#E7C9A5] bg-[#292319] dark:border-[#B88A4B] dark:bg-[#F1E2C7]'
            : ''}
        `;

    const previewClass = isAdminPath
        ? 'bg-light-600 border-[#7286dd] dark:bg-dark-400'
        : `
            border-[#7A6233]/70
            bg-[#171614]
            dark:border-[#D6B98C]/70
            dark:bg-[#F8F2E6]
        `;

    const primaryTextClass = isAdminPath
        ? 'text-gray-700 dark:text-white'
        : 'text-[#F5EBDD] dark:text-[#342719]';

    const secondaryTextClass = isAdminPath
        ? 'text-slate-500 dark:text-white'
        : 'text-[#C6B69F] dark:text-[#76634C]';

    const uploadIconClass = isAdminPath
        ? ''
        : 'brightness-0 invert dark:brightness-0 dark:invert-0';

    return (
        <>
            {showPdfModal && (
                <PdfPreviewModal
                    setShowPdfModal={setShowPdfModal}
                    pdfUrl={previewUrl || ""}
                    isAdmin
                />
            )}

            <motion.div
                animate={error ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                key={shakeTrigger}
                transition={{ duration: 0.4 }}
                className="w-full"
            >
                {/* Drop Zone */}
                <div
                    className={`
                        group relative mt-1 flex w-full cursor-pointer
                        flex-col items-center justify-center overflow-hidden
                        rounded-2xl border-2 border-dashed p-5
                        transition-all duration-300 sm:p-7
                        ${dropZoneClass}
                        ${!isAdminPath
                            ? 'shadow-[0_4px_18px_rgba(184,138,75,0.05)] hover:shadow-[0_8px_26px_rgba(184,138,75,0.12)]'
                            : ''}
                    `}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!isAdminPath && (
                        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/70 to-transparent dark:via-[#B88A4B]/70" />
                    )}

                    <div className="flex w-full flex-col items-center gap-4 text-center">
                        <div
                            className={`
                                flex size-14 items-center justify-center
                                rounded-2xl transition-all duration-300
                                group-hover:scale-105
                                ${isAdminPath
                                    ? 'bg-transparent'
                                    : 'border border-[#7A6233]/50 bg-[#E7C9A5]/10 dark:border-[#D6B98C]/50 dark:bg-[#E7C9A5]/30'}
                            `}
                        >
                            <Image
                                src={imagesAddresses.icons.upload}
                                alt="upload"
                                width={27}
                                height={27}
                                className={uploadIconClass}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <p className={`text-sm font-semibold sm:text-base ${primaryTextClass}`}>
                                Upload a {fileTypeLabel}
                            </p>

                            <p className={`text-xs sm:text-sm ${secondaryTextClass}`}>
                                Drag and drop your file here, or browse to select one
                            </p>
                        </div>

                        <div onClick={(e) => e.stopPropagation()}>
                            <CustomButton
                                text="Browse to Upload"
                                color={isAdminPath ? 'blue' : 'yellow'}
                                containerClassName="cursor-pointer"
                                onClick={() => inputRef.current?.click()}
                            />
                        </div>
                    </div>

                    <input
                        type="file"
                        accept={
                            type === 'image'
                                ? 'image/*'
                                : type === 'video'
                                    ? 'video/*'
                                    : 'application/pdf'
                        }
                        ref={inputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* Preview */}
                {previewUrl && (
                    <div
                        className={`
                            mt-4 flex w-full flex-col items-center
                            justify-between gap-4 rounded-2xl border p-4
                            sm:flex-row sm:p-5
                            ${previewClass}
                            ${!isAdminPath
                                ? 'shadow-[0_4px_18px_rgba(184,138,75,0.05)]'
                                : ''}
                        `}
                    >
                        {type === 'image' ? (
                            <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex min-w-0 items-center gap-3">
                                    <Image
                                        src={previewUrl}
                                        alt="preview"
                                        width={80}
                                        height={80}
                                        unoptimized
                                        className={`
                                            size-20 shrink-0 rounded-xl
                                            border object-cover shadow-sm
                                            ${isAdminPath
                                                ? 'border-gray-200 dark:border-gray-600'
                                                : 'border-[#7A6233]/40 dark:border-[#D6B98C]/60'}
                                        `}
                                    />

                                    <p className={`min-w-0 break-all text-sm font-medium ${primaryTextClass}`}>
                                        {fileName || 'Selected image'}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    aria-label="Remove image"
                                    onClick={handleRemoveFile}
                                    className={`
                                        flex size-10 shrink-0 items-center
                                        justify-center self-center rounded-xl
                                        transition-colors
                                        ${isAdminPath
                                            ? 'hover:bg-red-100 dark:hover:bg-red-900/30'
                                            : 'hover:bg-red-100/10 dark:hover:bg-red-100/70'}
                                    `}
                                >
                                    <Image
                                        src={imagesAddresses.icons.delete}
                                        alt=""
                                        width={22}
                                        height={22}
                                    />
                                </button>
                            </div>
                        ) : type === 'video' ? (
                            <div className="flex w-full flex-col gap-4">
                                <video
                                    src={previewUrl}
                                    controls
                                    className="max-h-80 w-full rounded-xl sm:max-w-lg"
                                />

                                <button
                                    type="button"
                                    aria-label="Remove video"
                                    onClick={handleRemoveFile}
                                    className="flex size-10 items-center justify-center self-end rounded-xl transition-colors hover:bg-red-100/10 dark:hover:bg-red-100/70"
                                >
                                    <Image
                                        src={imagesAddresses.icons.delete}
                                        alt=""
                                        width={22}
                                        height={22}
                                    />
                                </button>
                            </div>
                        ) : (
                            <div className="flex w-full min-w-0 items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className={`
                                            flex size-11 shrink-0 items-center
                                            justify-center rounded-xl
                                            ${isAdminPath
                                                ? 'bg-blue-50 dark:bg-dark-300'
                                                : 'bg-[#E7C9A5]/10 dark:bg-[#E7C9A5]/40'}
                                        `}
                                    >
                                        <span
                                            className={`text-xs font-bold ${isAdminPath
                                                ? 'text-blue-600 dark:text-white'
                                                : 'text-[#E7C9A5] dark:text-[#8A6234]'}`}
                                        >
                                            PDF
                                        </span>
                                    </div>

                                    <p className={`min-w-0 break-all text-sm font-medium ${primaryTextClass}`}>
                                        {fileName || 'Selected PDF'}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-1">
                                    <button
                                        type="button"
                                        aria-label="Preview PDF"
                                        onClick={handleViewPdf}
                                        className={`
                                            flex size-10 items-center justify-center
                                            rounded-xl transition-colors
                                            ${isAdminPath
                                                ? 'hover:bg-gray-200 dark:hover:bg-gray-600'
                                                : 'hover:bg-[#E7C9A5]/15 dark:hover:bg-[#E7C9A5]/40'}
                                        `}
                                    >
                                        <Image
                                            src={imagesAddresses.icons.eyeWhite}
                                            alt=""
                                            width={22}
                                            height={22}
                                            className="hidden dark:block"
                                        />

                                        <Image
                                            src={imagesAddresses.icons.eyeBlack}
                                            alt=""
                                            width={22}
                                            height={22}
                                            className="block dark:hidden"
                                        />
                                    </button>

                                    <button
                                        type="button"
                                        aria-label="Remove PDF"
                                        onClick={handleRemoveFile}
                                        className={`
                                            flex size-10 items-center justify-center
                                            rounded-xl transition-colors
                                            ${isAdminPath
                                                ? 'hover:bg-red-100 dark:hover:bg-red-900/30'
                                                : 'hover:bg-red-100/10 dark:hover:bg-red-100/70'}
                                        `}
                                    >
                                        <Image
                                            src={imagesAddresses.icons.delete}
                                            alt=""
                                            width={22}
                                            height={22}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Error */}
                {error && !previewUrl && (
                    <p className="mt-2 text-xs text-red-500 sm:text-sm">
                        {error}
                    </p>
                )}
            </motion.div>
        </>
    );
};

export default DragAndDropUpload;
