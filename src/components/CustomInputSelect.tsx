"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
    name,
    containerClassName,
    errors,
    Values,
    shakeTrigger = 0,
    disabled = false,
    isAdmin = false,
    customScrollBar = false,
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const hasError = Boolean(errors?.length);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSelect = (item: string) => {
        onChange(item);
        setOpen(false);
    };

    const buttonClass = isAdmin
        ? `
            bg-light-600 dark:bg-dark-400
            text-[#17130F] dark:text-[#F8F2E6]
            border-[#E5DED2] dark:border-white/10
            hover:border-[#1565C0]/50 dark:hover:border-[#1565C0]/60
        `
        : `
            bg-[#171614] dark:bg-[#FBF7EF]
            text-[#F8F2E6] dark:text-[#17130F]
            border-white/10 dark:border-[#A87938]/20
            hover:border-[#E7C9A5]/40 dark:hover:border-[#A87938]/40
        `;

    const dropdownBg = isAdmin
        ? "bg-white dark:bg-[#201E1A] border-[#E5DED2] dark:border-white/10"
        : "bg-[#201E1A] dark:bg-[#FBF7EF] border-white/10 dark:border-[#A87938]/20";

    const listItemClass = (item: string) => {
        const isSelected = item === value;

        if (isAdmin) {
            return isSelected
                ? "bg-[#1565C0]/10 dark:bg-[#1565C0]/20 text-[#1565C0] dark:text-blue-300 font-semibold"
                : "text-[#403A32] dark:text-[#F8F2E6] hover:bg-[#1565C0]/5 dark:hover:bg-white/5";
        }

        return isSelected
            ? "bg-[#E7C9A5]/15 dark:bg-[#A87938]/15 text-[#E7C9A5] dark:text-[#8B642D] font-semibold"
            : "text-[#D8CDBD] dark:text-[#40372B] hover:bg-white/5 dark:hover:bg-[#A87938]/10 hover:text-[#F8F2E6] dark:hover:text-[#17130F]";
    };

    return (
        <div
            ref={wrapperRef}
            className={`relative flex w-full flex-col ${containerClassName || ""}`}
            style={{ width: width ? `${width}px` : "100%" }}
        >
            {label && (
                <label
                    htmlFor={name}
                    className={`mb-2 text-xs sm:text-sm font-medium ${isAdmin
                        ? "text-[#403A32] dark:text-[#F8F2E6]"
                        : "text-[#B8AA96] dark:text-[#75634E]"
                        }`}
                >
                    {label}
                </label>
            )}

            <motion.button
                id={name}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-invalid={hasError}
                aria-label={label || placeholder}
                animate={
                    hasError && !shouldReduceMotion
                        ? { x: [0, -5, 5, -5, 5, 0] }
                        : { x: 0 }
                }
                transition={{
                    duration: shouldReduceMotion ? 0 : 0.35,
                }}
                disabled={disabled}
                onClick={() => setOpen((previous) => !previous)}
                className={`
                    group flex w-full items-center justify-between gap-3
                    rounded-xl border px-4 py-3
                    text-left text-sm sm:text-base font-medium
                    outline-none transition-all duration-300
                    focus-visible:ring-2 focus-visible:ring-offset-2
                    ${isAdmin
                        ? "focus-visible:ring-[#1565C0] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#201E1A]"
                        : "focus-visible:ring-[#E7C9A5] dark:focus-visible:ring-[#A87938] focus-visible:ring-offset-[#0D0D0C] dark:focus-visible:ring-offset-[#F8F2E6]"
                    }
                    ${buttonClass}
                    ${hasError
                        ? "!border-red-500 focus-visible:!ring-red-500"
                        : ""
                    }
                    ${disabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }
                `}
            >
                <span
                    className={`min-w-0 truncate ${value
                        ? ""
                        : isAdmin
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-[#887D6D] dark:text-[#9A8A74]"
                        }`}
                >
                    {value || placeholder}
                </span>

                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.25,
                    }}
                    className={`shrink-0 text-xs ${isAdmin
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-[#B8AA96] dark:text-[#8B642D]"
                        }`}
                >
                    ▼
                </motion.span>
            </motion.button>

            {hasError && (
                <p className="mt-1.5 text-xs text-red-500">
                    {errors?.[0]}
                </p>
            )}

            <AnimatePresence>
                {open && !disabled && (
                    <motion.ul
                        key="dropdown"
                        role="listbox"
                        aria-label={label || placeholder}
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1 }
                                : { opacity: 0, y: -8, scale: 0.98 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                            shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -5, scale: 0.98 }
                        }
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.18,
                            ease: "easeOut",
                        }}
                        className={`
                        absolute left-0 right-0 top-full z-50 mt-2
                        max-h-60 overflow-y-auto overscroll-contain
                        rounded-xl border p-1.5
                        shadow-[0_16px_40px_rgba(0,0,0,0.25)]
                        transition-colors duration-300
                    
                        ${isAdmin ? `
                      bg-light-600 dark:bg-dark-400
                      border-[#E5DED2] dark:border-white/10
                        custom-scrollbar1 `: `
                        bg-[#201E1A] dark:bg-[#FBF7EF]
                        order-white/10 dark:border-[#A87938]/20
                        ustom-scrollbar1 `
                            }

                     ${customScrollBar ? "custom-scrollbar1" : ""}`}
                    >
                        {Values.length > 0 ? (
                            Values.map((item) => (
                                <li
                                    key={item}
                                    role="option"
                                    aria-selected={item === value}
                                    onClick={() => handleSelect(item)}
                                    className={`
                                        flex cursor-pointer items-center justify-between
                                        gap-3 rounded-lg px-3 py-2.5
                                        text-sm sm:text-base
                                        transition-colors duration-200
                                        ${listItemClass(item)}
                                    `}
                                >
                                    <span className="min-w-0 truncate">
                                        {item}
                                    </span>

                                    {item === value && (
                                        <span
                                            aria-hidden="true"
                                            className="shrink-0 text-xs"
                                        >
                                            ✓
                                        </span>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li
                                className={`px-3 py-4 text-center text-sm ${isAdmin
                                    ? "text-gray-500 dark:text-gray-400"
                                    : "text-[#B8AA96] dark:text-[#75634E]"
                                    }`}
                            >
                                No options available
                            </li>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomInputSelect;