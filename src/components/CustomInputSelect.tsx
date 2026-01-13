'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PropsType = {
    label?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    name: string;
    value: string;
    containerClassName?: string;
    errors?: string[];
    Values: string[];
    width?: string;
    disabled?: boolean;
    shakeTrigger?: number;
    isAdmin?: boolean;
    customScrollBar?: boolean;
};

const CustomInputSelect: React.FC<PropsType> = ({
    width,
    label,
    placeholder = "Select an option",
    onChange,
    value,
    containerClassName,
    errors,
    Values,
    shakeTrigger = 0,
    disabled = false,
    isAdmin = false,
    customScrollBar
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (item: string) => {
        onChange(item);
        setOpen(false);
    };

    const buttonClass = isAdmin
        ? "!bg-light-600 dark:!bg-dark-400 text-gray-800 dark:text-white"
        : "!bg-dark-400 dark:!bg-white text-white dark:text-gray-900 border border-gray-600 dark:border-gray-400";

    const listItemClass = (item: string) => {
        if (item === value) {
            return isAdmin
                ? "!bg-primary-admin !text-white font-semibold"
                : "!bg-primary dark:!bg-[#7a6233] !text-gray-900 dark:!text-white font-semibold";
        }
        return isAdmin
            ? "hover:!bg-blue-50 dark:hover:!bg-dark-300 dark:text-white"
            : "hover:!bg-gold100 dark:hover:!bg-gold600 dark:text-gray-900 dark:hover:text-white text-gray-300 hover:text-gray-900";
    };

    const dropdownBg = isAdmin ? "!bg-white dark:!bg-dark-500" : "!bg-dark-500 dark:!bg-white";

    return (
        <div
            ref={wrapperRef}
            className={`relative flex flex-col 
                ${containerClassName || ""}
                ${customScrollBar ? "custom-scrollbar1" : ""}
                `}
            style={{ width: width ? `${width}px` : "100%" }}
        >
            {label && (
                <label className="mb-1 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
            )}

            <motion.button
                type="button"
                key={shakeTrigger}
                animate={errors && errors.length > 0 ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                disabled={disabled}
                onClick={() => !disabled && setOpen(prev => !prev)}
                className={`
                    w-full rounded-lg border px-4 py-3
                    text-sm sm:text-base font-medium
                    flex items-center justify-between
                    focus:outline-none focus:ring-2
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    ${buttonClass}
                `}
            >
                <span>{value || placeholder}</span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} className="ml-2 text-gray-400">
                    ▼
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className={`
                            absolute z-50 !mt-10 w-full
                            rounded-lg border shadow-lg
                            max-h-60 overflow-auto
                            ${dropdownBg}
                        `}
                    >
                        {Values.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(item)}
                                className={`
                                    px-4 py-3 cursor-pointer
                                    text-sm sm:text-base
                                    ${listItemClass(item)}
                                `}
                            >
                                {item}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomInputSelect;
