"use client";

import imagesAddresses from '@/utils/imageAddresses';
import Image from 'next/image';

type PropsType = {
    text?: string;
    width?: string;
    color: "primary" | "secondary" | "tertiary" | "textbutton" | "iconbutton" | "red" | "blue" | "gray" | "white";
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

const AdminButton: React.FC<PropsType> = ({
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
            "text-brand600 border-[1.25px] bg-white hover:bg-brand50 !px-4 !py-2";
    } else if (color === "red") {
        newClass = "bg-error600 hover:bg-error700 text-white border-[0px] !px-1";
    } else if (color === "blue") {
        newClass = "bg-[#25388C] hover:bg-[#3a4fae] text-[#FFFFFF] border-[0px] !px-4";
    } else if (color === "white") {
        newClass = "bg-white hover:bg-gray-50 text-gray-900 border-[0px] !px-4 !shadow-lg";
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
            className={`select-none custom-btn-container rounded-[8px] duration-200 gap-1 ${isSmall ? 'h-7 desktop:h-10' : 'h-10'
                } text-xs font-semibold flex justify-center items-center ${newClass} ${loading ? 'opacity-40 cursor-default' : ''
                } ${containerClassName !== undefined ? containerClassName : ''
                } disabled:opacity-40`}
            style={{ width: width }}
            onClick={onClick}
            disabled={isDisable}
        >
            {loading ? (
                color === 'secondary' ? (
                    <Image
                        src={imagesAddresses.icons.loading}
                        width={16}
                        height={16}
                        alt="loading"
                        className="loading-svg"
                        style={{
                            filter:
                                'brightness(0) saturate(100%) invert(46%) sepia(42%) saturate(2564%) hue-rotate(192deg) brightness(99%) contrast(99%)',
                        }}
                    />
                ) : (
                    <Image
                        src={imagesAddresses.icons.loading}
                        width={16}
                        height={16}
                        alt="loading"
                        className="loading-svg"
                    />
                )
            ) : (
                <>
                    {iconPosition === 'right' && iconAddress !== undefined ? (
                        <Image src={iconAddress} width={14} height={14} alt="" />
                    ) : null}
                    {iconPosition === 'center' && iconAddress !== undefined ? (
                        <Image src={iconAddress} width={14} height={14} alt="" />
                    ) : null}
                    {text}
                    {iconPosition === 'left' && iconAddress !== undefined ? (
                        <Image src={iconAddress} width={14} height={14} alt="" />
                    ) : null}
                </>
            )}
        </button>
    );
};

export default AdminButton;
