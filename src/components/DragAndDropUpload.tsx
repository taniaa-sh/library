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

    return (
        <motion.div
            animate={error ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
            key={shakeTrigger}
            transition={{ duration: 0.4 }}
        >
            <div
                className={`w-full mt-1 h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : ` ${isAdminPath ? 'hover:border-blue-400 border-gray-300' : 'hover:border-[#ddbfa3] border-gray-300 dark:border-gray-500 dark:hover:border-[#7a6233]'}`} ${isAdminPath ? 'bg-light-600 dark:bg-dark-400' : '!bg-dark-300 dark:!bg-gray-200'}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col gap-6 items-center text-center text-gray-500">
                    <div className="flex items-center gap-2">
                        <Image
                            src={imagesAddresses.icons.upload}
                            alt="upload" width={18} height={18} />
                        <p className={`font-normal text-base leading-6 ${isAdminPath ? 'text-slate-500 dark:text-white' : 'text-white dark:text-slate-500'}`}>
                            Upload a {type === 'image' ? 'image' : 'video'}
                        </p>
                    </div>
                    <CustomButton
                        text="Browse to Upload"
                        color={isAdminPath ? 'blue' : 'yellow'}
                        containerClassName="cursor-pointer"
                    />
                </div>

                <input type="file" accept={type === 'image' ? 'image/*' : 'video/*'} ref={inputRef} onChange={handleFileChange} className="hidden" />
            </div>

            {previewUrl && (
                <div className={`w-full border-2 rounded-xl flex justify-between items-center !mt-4 !p-4 gap-4 ${isAdminPath ? '!bg-light-600 border-[#7286dd] dark:!bg-dark-400 dark:!border-gray-500' : 'bg-dark-300 dark:bg-gray-50 border-[#ddbfa3] dark:border-[#7a6233]'}`}>
                    {type === 'image' ? (
                        <Image
                            src={previewUrl}
                            alt="preview"
                            width={30}
                            height={30}
                            className="object-cover rounded-lg shadow-md max-h-40 dark:!border-gray-500 dark:bg-gray-500 self-"
                        />
                    ) : (
                        <video src={previewUrl} controls className="w-full md:w-1/3 rounded-lg max-h-40" />
                    )}
                    <div className="flex gap-2 items-center w-full md:w-auto">
                        <p className={`text-sm font-medium  ${isAdminPath ? 'text-gray-700 dark:text-white' : 'text-white dark:text-gray-600'}`}>{fileName}</p>
                        {/* <Image
                            src={imagesAddresses.icons.delete}
                            alt="close"
                            width={20}
                            height={20}
                            className="cursor-pointer"
                            onClick={() => {
                                setPreviewUrl(null);
                                setFileName(null);
                                onChange(null)
                            }}
                        /> */}
                    </div>
                </div>
            )}
            {error && !previewUrl && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
            )}
        </motion.div>
    )
}

export default DragAndDropUpload