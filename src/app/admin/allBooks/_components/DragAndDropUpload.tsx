'use client';

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useRef, useState } from "react";
import AdminButton from "../../components/AdminButton";

type DragAndDropUploadProps = {
    onChange: (file: File) => void;
    preview?: string;
};

const DragAndDropUpload = ({ onChange, preview }: DragAndDropUploadProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(preview || null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

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
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        const url = URL.createObjectURL(file);
        setImagePreview(url);
        onChange(file);
    };

    return (
        <div className={`w-full h-44 !bg-[#F9FAFB] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : "border-gray-300 hover:border-blue-400"
            }`}
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
                    <p className="font-normal text-base leading 6 text-slate-500">Upload an image</p>
                </div>
                <AdminButton
                    text="Browse to Upload"
                    color="blue"
                    containerClassName="cursor-pointer"
                />
            </div>
            {
                imagePreview && (
         <div className="w-full !bg-[#F9FAFB] border-2 border-gray-300 rounded-xl flex justify-between items-center !mt-20">
                       <Image
                        src={imagePreview}
                        alt="preview"
                        width={20}
                        height={20}
                        className="object-cover rounded-lg shadowr"
                    />
                    cfbc
        </div>
                )
            }
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div >
    )
}

export default DragAndDropUpload