"use client";

import imagesAddresses from '@/utils/imageAddresses';
import Image from 'next/image';

type PropsType = {
    text?: string;
    width?: string;
    color: "primary" | "secondary" | "tertiary" | "textbutton" | "iconbutton" | "red" | "blue" | "gray" | "white" | "yellow" | "green";
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    containerClassName?: string;
    iconPosition?: 'right' | 'left' | 'center';
    iconAddress?: string;
    isDisable?: boolean;
    isSmall?: boolean;
    onClick?: (e: React.FormEvent) => void;
    widthIcon?: number;
    heightIcon?: number;
};

const CustomButton: React.FC<PropsType> = ({
    text,
    width,
    color,
    type = 'button',
    loading = false,
    containerClassName,
    iconPosition,
    iconAddress,
    isDisable,
    isSmall,
    widthIcon = 24,
    heightIcon = 24,
    onClick,
}) => {

    let newClass = "";
    if (color === "secondary") {
        newClass =
            "w-full border border-gray-500 text-gray-300 font-semibold rounded-xl py-1.5 hover:bg-gray-500/10 dark:text-gray-800 dark:border-gray-400 dark:hover:bg-gray-300/20";
    } else if (color === "red") {
        newClass =
            "dark:bg-[#ef4444] hover:dark:bg-[#dc2626] text-white border-[0px] !px-4 bg-[#7c1f1f] hover:bg-[#991b1b] dark:text-white";
    } else if (color === "green") {
        newClass =
            "text-white bg-[#2e6b57] hover:bg-[#357c63] dark:bg-[#4C7B62] dark:hover:bg-[#3f6d59] border-0 px-4 rounded-md"
    } else if (color === "blue") {
        newClass =
            "bg-[#25388C] hover:bg-[#3a4fae] text-white border-[0px] !px-4 dark:bg-[#1a2b66] dark:hover:bg-[#3a4fae] dark:text-white";
    } else if (color === "yellow") {
        newClass =
            "bg-[#e7c9a5] hover:bg-[#ddbfa3] text-black border-[0px] !px-4 dark:bg-[#7a6233] dark:hover:bg-[#8a723e] dark:text-white";
    } else if (color === "white") {
        newClass =
            "bg-white hover:bg-gray-50 text-gray-900 border-[0px] dark:border dark:border-gray-600 !px-4 !shadow-lg dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-100";
    }
    if (color === "iconbutton" && iconAddress !== undefined) {
        return (
            <button
                className={`min-w-6 min-h-6 rounded-[8px] duration-200 hover:bg-gray50 ${loading ? 'opacity-40 cursor-default' : ''
                    } ${containerClassName !== undefined ? containerClassName : ''}`}
                type={loading ? 'button' : type}
                onClick={onClick}
            >
                <Image width={widthIcon} height={heightIcon} alt="icon" src={iconAddress} />
            </button>
        );
    }

    return (
        <button
            type={loading ? 'button' : type}
            className={`relative select-none custom-btn-container rounded-[8px] duration-200 gap-1 ${isSmall ? 'h-7 desktop:h-10' : 'h-10'
                } text-xs font-semibold flex justify-center items-center ${newClass} ${containerClassName ?? ''} disabled:opacity-40`}
            style={{ width: width }}
            onClick={onClick}
            disabled={isDisable || loading}
        >
            {loading ? (
                <div className="flex justify-center items-center gap-2">
                    <span
                        className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${color === 'white' ? 'border-black' : 'border-white'
                            }`}
                    ></span>
                    {text && <span className="opacity-70">{text}</span>}
                </div>
            ) : (
                <>
                    {iconPosition === 'right' && iconAddress && <Image src={iconAddress} width={14} height={14} alt="" />}
                    {iconPosition === 'center' && iconAddress && <Image src={iconAddress} width={14} height={14} alt="" />}
                    {text}
                    {iconPosition === 'left' && iconAddress && <Image src={iconAddress} width={14} height={14} alt="" />}
                </>
            )}
        </button>

    );
};

export default CustomButton;
