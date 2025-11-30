'use client';

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useRef, useState } from "react";
import AdminButton from "../../components/AdminButton";
import { usePathname } from "next/navigation";

type DragAndDropUploadProps = {
    onChange: (file: File) => void;
    type?: 'image' | 'video';
    preview?: string;
};

const DragAndDropUpload = ({ onChange, type = 'image', preview }: DragAndDropUploadProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const path = usePathname()
    const isAdminPath = path?.startsWith('/admin');

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
            alert('Please select an image file');
            return;
        }
        if (type === 'video' && !file.type.startsWith('video/')) {
            alert('Please select a video file');
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFileName(file.name);
        onChange(file);
    };

    return (
        <>
            <div
                className={`w-full h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : `border-gray-300 ${isAdminPath ? 'hover:border-blue-400' : 'hover:border-[#ddbfa3]'}`
                    } ${isAdminPath ? 'bg-[#F9FAFB] dark:bg-[#1e293b]' : '!bg-[#232839] dark:!bg-gray-200'}`}
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col gap-6 items-center text-center text-gray-500">
                    <div className="flex items-center gap-2">
                        <Image
                            src={imagesAddresses.icons.upload}
                            alt="upload"
                            width={18}
                            height={18}
                        />
                        <p className={`font-normal text-base leading-6 ${isAdminPath ? 'text-slate-500 dark:text-white' : 'text-white dark:text-slate-500'}`}>
                            Upload a {type === 'image' ? 'image' : 'video'}
                        </p>
                    </div>
                    <AdminButton
                        text="Browse to Upload"
                        color={isAdminPath ? 'blue' : 'yellow'}
                        containerClassName="cursor-pointer"
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

            {previewUrl && (
                <div className={`w-full  border-2 rounded-xl flex flex-col md:flex-row justify-between items-center !mt-4 !p-4 gap-4 ${isAdminPath ? '!bg-[#F9FAFB] border-[#7286dd]' : 'bg-[#232839] border-[#ddbfa3]'}`}>
                    {type === 'image' ? (
                        <Image
                            src={previewUrl}
                            alt="preview"
                            width={type === 'image' ? 40 : 80}
                            height={type === 'image' ? 40 : 60}
                            className="object-cover rounded-lg shadow-md max-h-40"
                        />
                    ) : (
                        <video
                            src={previewUrl}
                            controls
                            className="w-full md:w-1/3 rounded-lg max-h-40"
                        />
                    )}
                    <div className="flex gap-2 items-center w-full md:w-auto">
                        <p className={`text-sm font-medium  ${isAdminPath ? 'text-gray-700' : 'text-white'}`}>{fileName}</p>
                        <Image
                            src={imagesAddresses.icons.delete}
                            alt="close"
                            width={20}
                            height={20}
                            className="cursor-pointer"
                            onClick={() => setPreviewUrl(null)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default DragAndDropUpload