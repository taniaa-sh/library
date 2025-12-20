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
    errors: string[];
    Values: string[];
    width?: string;
    disabled?: boolean;
    shakeTrigger?: number;
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
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    /* Close on outside click */
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

    return (
        <div
            ref={wrapperRef}
            className={`relative flex flex-col ${containerClassName || ""}`}
            style={{ width: width ? `${width}px` : "100%" }}
        >
            {label && (
                <label
                    className="mb-1 text-xs sm:text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
            )}

            {/* Select Box */}
            <motion.button
                type="button"
                key={shakeTrigger}
                animate={errors.length > 0 ? { x: [0, -5, 5, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                disabled={disabled}
                onClick={() => !disabled && setOpen(prev => !prev)}
                className={`
                    w-full rounded-lg border px-4 py-3
                    text-sm sm:text-base font-medium
                    flex items-center justify-between
                    bg-light-600 dark:bg-dark-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    ${value ? "text-gray-800 dark:text-white" : "text-gray-400"}
                `}
            >
                <span>{value || placeholder}</span>

                {/* Arrow */}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    className="ml-2 text-gray-400"
                >
                    ▼
                </motion.span>
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="
                            absolute z-50 !mt-10 w-full
                            rounded-lg border
                            bg-white dark:bg-dark-500
                            shadow-lg
                            max-h-60 overflow-auto
                        "
                    >
                        {Values.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(item)}
                                className={`
                                    px-4 py-3 cursor-pointer
                                    text-sm sm:text-base
                                    hover:bg-blue-50 dark:hover:bg-dark-300 dark:text-white
                                    ${item === value ? "bg-primary-admin text-white  font-semibold" : ""}
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
