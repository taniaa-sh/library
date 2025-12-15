'use client';

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";

type DragAndDropUploadProps = {
    onChange: (file: File | null) => void;
    type?: 'image' | 'video';
    preview?: string;
    error?: string;
    shakeTrigger?: number;
};

const DragAndDropUpload = ({ onChange, type = 'image', preview, error, shakeTrigger }: DragAndDropUploadProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const path = usePathname()
    const isAdminPath = path?.startsWith('/admin');

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) handleFile(file); };

    const handleFile = (file: File) => {
        if (type === 'image' && !file.type.startsWith('image/')) { alert('Please select an image file'); return; }
        if (type === 'video' && !file.type.startsWith('video/')) { alert('Please select a video file'); return; }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFileName(file.name);
        onChange(file);
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreviewUrl(null);
        setFileName(null);
        if (inputRef.current) inputRef.current.value = '';
        onChange(null);
    };

    return (
        <motion.div
            animate={error ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
            key={shakeTrigger}
            transition={{ duration: 0.4 }}
        >
            {/* Drop Zone */}
            <div
                className={`
                    w-full mt-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all
                    ${isDragging ? 'border-blue-500 bg-blue-50' : `${isAdminPath ? 'hover:border-blue-400 border-gray-300' : 'hover:border-[#ddbfa3] border-gray-300 dark:border-gray-500 dark:hover:border-[#7a6233]'}`}
                    ${isAdminPath ? 'bg-light-600 dark:bg-dark-400' : 'bg-dark-300 dark:!bg-gray-200'}
                    cursor-pointer
                    p-4 sm:p-6
                `}
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center">
                    <Image
                        src={imagesAddresses.icons.upload}
                        alt="upload"
                        width={24}
                        height={24}
                    />
                    <p className={`text-base ${isAdminPath ? 'text-slate-500 dark:text-white' : 'text-white dark:text-slate-500'}`}>
                        Upload a {type === 'image' ? 'image' : 'video'}
                    </p>
                    <CustomButton
                        text="Browse to Upload"
                        color={isAdminPath ? 'blue' : 'yellow'}
                        containerClassName="cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                    />
                </div>
                <input
                    type="file"
                    accept={type === 'image' ? 'image/*' : 'video/*'}
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Preview */}
            {previewUrl && (
                <div className={`
                    w-full sm:w-3/4 lg:w-1/2 mt-4 p-4 border-2 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4
                    ${isAdminPath ? 'bg-light-600 border-[#7286dd] dark:bg-dark-400' : 'bg-dark-300 border-[#ddbfa3] dark:bg-gray-50'}
                `}>
                    {type === 'image' ? (
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Image
                                src={previewUrl}
                                alt="preview"
                                width={80}
                                height={80}
                                className="object-cover rounded-lg shadow-md max-h-40"
                            />
                            <p className={`text-sm font-medium ${isAdminPath ? 'text-gray-700 dark:text-white' : 'text-white dark:text-gray-600'} break-all`}>
                                {fileName}
                            </p>
                        </div>
                    ) : (
                        <video src={previewUrl} controls className="w-full sm:w-2/3 md:w-1/2 rounded-lg max-h-80" />
                    )}

                    <div className="flex gap-2 items-center">
                        <Image
                            src={imagesAddresses.icons.delete}
                            alt="remove"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                            onClick={handleRemoveFile}
                        />
                    </div>
                </div>
            )}

            {/* Error */}
            {error && !previewUrl && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
            )}
        </motion.div>
    )
}

export default DragAndDropUpload;
