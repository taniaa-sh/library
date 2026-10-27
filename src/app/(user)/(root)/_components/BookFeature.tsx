"use client";

import Image from "next/image";
import imagesAddresses from "@/utils/imageAddresses";
import CustomButton from "@/components/CustomButton";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import BorrowBookModal from "./BorrowBookModal";

interface PropsType {
    title: string;
    Genre: string;
    author: string;
    rating: number;
    description: string;
    bookImg: string;
    totalBooks: number;
    availableBooks: number;
}

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            staggerChildren: 0.12,
            ease: "easeOut",
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const BookFeature = ({
    title,
    Genre,
    author,
    rating,
    description,
    bookImg,
    totalBooks,
    availableBooks,
}: PropsType) => {
    const [showBorrowModal, setShowBorrowModal] = useState(false);

    const isAvailable = availableBooks > 0;

    return (
        <>
            {showBorrowModal && (
                <BorrowBookModal
                    setShowBorrowModal={setShowBorrowModal}
                    bookImg={bookImg}
                    title={title}
                    author={author}
                    Genre={Genre}
                    availableBooks={availableBooks}
                />
            )}

            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="
          group relative isolate w-full overflow-hidden
          rounded-[28px] border border-[#E7C9A5]/20
          bg-[#10100F] text-white
          shadow-[0_24px_80px_rgba(0,0,0,0.18)]
          transition-colors duration-500
          dark:border-[#B88A4B]/25 dark:bg-[#FAF5EC]
          dark:text-[#211A13]
          sm:rounded-[36px]
        "
            >
                {/* Decorative background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(231,201,165,0.12),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_90%_10%,rgba(184,138,75,0.15),transparent_45%)]" />

                    <div className="absolute -right-28 -top-32 size-80 rounded-full bg-[#E7C9A5]/[0.07] blur-[90px] dark:bg-[#B88A4B]/[0.10]" />

                    <div className="absolute -bottom-32 -left-20 size-72 rounded-full bg-[#B88A4B]/10 blur-[100px]" />

                    <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(231,201,165,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(231,201,165,0.6)_1px,transparent_1px)] [background-size:38px_38px] dark:opacity-[0.04]" />
                </div>

                <div className="relative grid items-center gap-8 px-5 py-9 sm:gap-10 sm:px-9 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:px-14 lg:py-14 xl:px-16 xl:py-16">
                    {/* Book information */}
                    <motion.div
                        variants={itemVariants}
                        className="relative z-10 flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
                    >
                        {/* Eyebrow */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E7C9A5]/20 bg-[#E7C9A5]/[0.07] px-3.5 py-2 dark:border-[#B88A4B]/25 dark:bg-[#B88A4B]/[0.08]">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#C89B5C] opacity-50" />
                                <span className="relative inline-flex size-2 rounded-full bg-[#C89B5C]" />
                            </span>

                            <span className="text-[10px] font-bold tracking-[0.22em] text-[#E7C9A5] dark:text-[#8C612C] sm:text-xs">
                                FEATURED BOOK
                            </span>
                        </div>

                        {/* Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="max-w-2xl break-words text-3xl font-bold leading-[1.2] tracking-tight text-white dark:text-[#211A13] sm:text-4xl md:text-5xl xl:text-[58px]"
                        >
                            {title}
                        </motion.h1>

                        {/* Author */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm lg:justify-start sm:text-base"
                        >
                            <span className="text-stone-400 dark:text-[#897965]">
                                Written by
                            </span>

                            <span className="font-semibold text-[#E7C9A5] dark:text-[#95682F]">
                                {author}
                            </span>
                        </motion.div>

                        {/* Category and rating */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                        >
                            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 dark:border-[#B88A4B]/20 dark:bg-white/60">
                                <p className="text-[10px] font-medium uppercase tracking-widest text-stone-500 dark:text-[#897965]">
                                    Category
                                </p>
                                <p className="mt-1 text-sm font-semibold text-[#E7C9A5] dark:text-[#805827]">
                                    {Genre}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-[#E7C9A5]/20 bg-[#E7C9A5]/[0.07] px-4 py-2.5 dark:border-[#B88A4B]/25 dark:bg-[#B88A4B]/[0.08]">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-[#E7C9A5]/10 dark:bg-[#B88A4B]/15">
                                    <Image
                                        src={imagesAddresses.icons.stare}
                                        alt=""
                                        width={21}
                                        height={21}
                                    />
                                </div>

                                <div>
                                    <p className="text-lg font-bold leading-tight text-[#E7C9A5] dark:text-[#805827]">
                                        {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
                                        <span className="ml-1 text-xs font-medium text-stone-400 dark:text-[#897965]">
                                            / 5
                                        </span>
                                    </p>
                                    <p className="mt-1 text-[10px] text-stone-400 dark:text-[#897965]">
                                        Reader rating
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="mt-7 max-w-2xl text-sm leading-7 text-stone-300 dark:text-[#766856] sm:text-base sm:leading-8"
                        >
                            {description}
                        </motion.p>

                        {/* Availability statistics */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-7 grid w-full max-w-md grid-cols-2 gap-3 lg:max-w-lg"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 dark:border-[#B88A4B]/20 dark:bg-white/60 sm:p-5">
                                <div className="absolute right-0 top-0 size-20 rounded-full bg-[#E7C9A5]/[0.06] blur-2xl" />

                                <div className="relative flex items-center gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E7C9A5]/10 text-[#E7C9A5] dark:bg-[#B88A4B]/10 dark:text-[#95682F]">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            className="size-5"
                                            aria-hidden="true"
                                        >
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                                            <path d="M8 7h8M8 11h6" />
                                        </svg>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-2xl font-bold tracking-tight text-white dark:text-[#211A13]">
                                            {totalBooks}
                                        </p>
                                        <p className="mt-1 text-xs text-stone-400 dark:text-[#897965]">
                                            Total copies
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-[#9DC5A2]/20 bg-[#9DC5A2]/[0.05] p-4 dark:border-emerald-800/15 dark:bg-emerald-900/[0.035] sm:p-5">
                                <div className="relative flex items-center gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#9DC5A2]/10 text-[#9DC5A2] dark:bg-emerald-900/[0.08] dark:text-emerald-800">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            className="size-5"
                                            aria-hidden="true"
                                        >
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="m8.5 12 2.3 2.3 4.7-4.8" />
                                        </svg>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-2xl font-bold tracking-tight text-white dark:text-[#211A13]">
                                            {availableBooks}
                                        </p>
                                        <p className="mt-1 text-xs text-stone-400 dark:text-[#897965]">
                                            Available copies
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Availability status */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-5 flex items-center justify-center gap-2 lg:justify-start"
                        >
                            <span
                                className={`size-2 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-red-400"
                                    }`}
                            />

                            <span
                                className={`text-xs font-medium ${isAvailable
                                        ? "text-emerald-400 dark:text-emerald-700"
                                        : "text-red-400 dark:text-red-600"
                                    }`}
                            >
                                {isAvailable
                                    ? "Available for borrowing"
                                    : "Currently unavailable"}
                            </span>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-7 w-full sm:w-auto"
                        >
                            <div
                                className={`transition-transform duration-300 ${isAvailable
                                        ? "hover:-translate-y-0.5"
                                        : "pointer-events-none opacity-50"
                                    }`}
                            >
                                <CustomButton
                                    text="Borrow Book Request"
                                    iconAddress={imagesAddresses.icons.bookIcon}
                                    iconPosition="right"
                                    color="yellow"
                                    containerClassName="w-full cursor-pointer dark:hidden sm:!w-fit"
                                    onClick={() => {
                                        if (isAvailable) setShowBorrowModal(true);
                                    }}
                                />

                                <CustomButton
                                    text="Borrow Book Request"
                                    iconAddress={imagesAddresses.icons.bookIconWhite}
                                    iconPosition="right"
                                    color="yellow"
                                    containerClassName="hidden w-full cursor-pointer text-nowrap dark:flex sm:!w-fit"
                                    onClick={() => {
                                        if (isAvailable) setShowBorrowModal(true);
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Book cover */}
                    <motion.div
                        variants={itemVariants}
                        className="relative mx-auto flex w-full max-w-[390px] items-center justify-center py-5 sm:py-8 lg:max-w-none lg:py-0"
                    >
                        {/* Ambient glow */}
                        <div
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E7C9A5]/10 blur-[70px] dark:bg-[#B88A4B]/15 sm:blur-[100px]"
                        />

                        {/* Decorative rings */}
                        <div
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E7C9A5]/10 dark:border-[#B88A4B]/15"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#E7C9A5]/15 dark:border-[#B88A4B]/20"
                        />

                        {/* Floating decorative stars */}
                        <motion.div
                            aria-hidden="true"
                            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute right-[12%] top-[9%] z-20 text-3xl text-[#E7C9A5] dark:text-[#B88A4B]"
                        >
                            ✦
                        </motion.div>

                        <motion.div
                            aria-hidden="true"
                            animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className="absolute bottom-[14%] left-[8%] z-20 text-xl text-[#E7C9A5]/70 dark:text-[#B88A4B]/70"
                        >
                            ✧
                        </motion.div>

                        {/* Back cover shadow */}
                        <motion.div
                            aria-hidden="true"
                            initial={{ opacity: 0, x: 20, rotate: 12 }}
                            whileInView={{ opacity: 0.18, x: 0, rotate: 12 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute left-[18%] top-[7%] h-[82%] w-[62%] rounded-md bg-[#E7C9A5] blur-[2px] dark:bg-[#A87938]"
                        />

                        {/* Main book */}
                        <motion.div
                            initial={{ opacity: 0, y: 25, rotate: -5, scale: 0.92 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.85,
                                delay: 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            animate={{
                                y: [0, -8, 0],
                            }}
                            whileHover={{
                                rotate: 2,
                                scale: 1.035,
                                transition: { duration: 0.3 },
                            }}
                            className="relative z-10 w-[72%] max-w-[290px] [filter:drop-shadow(0_28px_28px_rgba(0,0,0,0.35))] sm:max-w-[320px]"
                        >
                            <Image
                                src={bookImg}
                                alt={title}
                                width={340}
                                height={460}
                                priority={false}
                                className="h-auto max-h-[420px] w-full object-contain sm:max-h-[460px]"
                                sizes="(max-width: 640px) 72vw, (max-width: 1024px) 320px, 340px"
                            />
                        </motion.div>

                        {/* Bottom floating label */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.65 }}
                            className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/10 bg-[#1C1B18]/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-[#B88A4B]/20 dark:bg-[#FFFCF5]/95 sm:bottom-1"
                        >
                            <div className="flex size-9 items-center justify-center rounded-xl bg-[#E7C9A5]/10 dark:bg-[#B88A4B]/10">
                                <Image
                                    src={imagesAddresses.icons.stare}
                                    alt=""
                                    width={19}
                                    height={19}
                                />
                            </div>

                            <div>
                                <p className="text-xs font-bold text-white dark:text-[#211A13]">
                                    Readers choice
                                </p>
                                <p className="mt-1 text-[10px] text-stone-400 dark:text-[#897965]">
                                    Discover your next favorite
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom accent line */}
                <div
                    aria-hidden="true"
                    className="h-px w-full bg-gradient-to-r from-transparent via-[#E7C9A5]/50 to-transparent dark:via-[#B88A4B]/50"
                />
            </motion.section>
        </>
    );
};

export default BookFeature;