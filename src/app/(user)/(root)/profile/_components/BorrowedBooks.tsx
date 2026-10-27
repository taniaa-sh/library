"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const books = [1, 2, 3, 4, 5, 6, 7, 8];
const INITIAL_COUNT = 4;

const BorrowedBooks = () => {
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const swiperRef = useRef<any>(null);
    const shouldReduceMotion = useReducedMotion();

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 24,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0 : 0.45,
                ease: "easeOut" as const,
            },
        },
    };

    const scrollToLastBook = () => {
        swiperRef.current?.swiper?.slideTo(books.length - 1);
    };

    const renderBookDetails = (isMobile = false) => (
        <>
            <div
                className={`relative overflow-hidden flex justify-center items-center rounded-xl border border-[#E7C9A5]/15 bg-gradient-to-br from-[#E7C9A5]/20 via-[#E7C9A5]/10 to-transparent ${isMobile ? "py-7 px-5" : "py-7 px-6"
                    }`}
            >
                <div className="absolute w-28 h-28 rounded-full bg-[#E7C9A5]/10 blur-2xl" />

                <Image
                    src={imagesAddresses.images.book1}
                    alt="The Origin book cover"
                    width={120}
                    height={120}
                    className="relative z-10 object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className={`flex flex-col gap-1 ${isMobile ? "text-center" : ""}`}>
                <p className="text-[#F8F2E6] dark:text-[#17130F] font-semibold text-lg md:text-xl tracking-tight">
                    The Origin
                </p>
                <p className="text-[#B8AA96] dark:text-[#75634E] text-sm md:text-base">
                    By Dan Brown
                </p>
            </div>

            <div className={`flex ${isMobile ? "justify-center" : ""}`}>
                <span className="text-xs font-medium tracking-wide text-[#E7C9A5] dark:text-[#8B642D] bg-[#E7C9A5]/10 dark:bg-[#A87938]/10 border border-[#E7C9A5]/15 dark:border-[#A87938]/15 px-3 py-1.5 rounded-full">
                    Thriller / Mystery
                </span>
            </div>

            <div
                className={`flex gap-2 items-center text-sm ${isMobile ? "justify-center" : ""
                    }`}
            >
                <Image
                    src={imagesAddresses.icons.greenBook}
                    alt=""
                    width={16}
                    height={16}
                />
                <p className="text-[#B8AA96] dark:text-[#75634E]">
                    Borrowed on Dec 31
                </p>
            </div>

            <div className="flex justify-between items-center gap-3 pt-3 border-t border-white/10 dark:border-[#17130F]/10">
                <div className="flex gap-2 items-center min-w-0">
                    <Image
                        src={imagesAddresses.icons.calender}
                        alt=""
                        width={16}
                        height={16}
                    />
                    <p className="text-[#E7C9A5] dark:text-[#8B642D] text-xs sm:text-sm font-medium">
                        04 days left to due
                    </p>
                </div>

                <button
                    type="button"
                    aria-label="Book options"
                    className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-[#E7C9A5]/15 dark:border-[#A87938]/20 hover:bg-[#E7C9A5]/10 dark:hover:bg-[#A87938]/10 transition-colors duration-200"
                >
                    <Image
                        src={imagesAddresses.icons.list}
                        alt=""
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </>
    );

    return (
        <section className="w-full mt-8 flex flex-col gap-5 md:gap-7">
            {/* Section heading */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center justify-between gap-4"
            >
                <div className="flex flex-col gap-2">
                    <span className="text-[#E7C9A5] dark:text-[#8B642D] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
                        YOUR COLLECTION
                    </span>

                    <h2 className="text-[#F8F2E6] dark:text-[#17130F] font-semibold text-2xl md:text-3xl tracking-tight">
                        Borrowed books
                    </h2>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Go to last borrowed book"
                        onClick={scrollToLastBook}
                        className="w-11 h-11 rounded-full border border-[#E7C9A5]/20 dark:border-[#A87938]/25 flex items-center justify-center hover:bg-[#E7C9A5]/10 dark:hover:bg-[#A87938]/10 hover:border-[#E7C9A5]/50 transition-all duration-300"
                    >
                        <Image
                            src={imagesAddresses.icons.arrowRightYellow2}
                            alt=""
                            width={20}
                            height={20}
                            className="dark:hidden"
                        />
                        <Image
                            src={imagesAddresses.icons.arrowRightYellow}
                            alt=""
                            width={20}
                            height={20}
                            className="hidden dark:block"
                        />
                    </button>
                </div>
            </motion.div>

            {/* Desktop / tablet slider */}
            <div className="hidden sm:block">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    spaceBetween={18}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    breakpoints={{
                        500: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                    className="!pb-4"
                >
                    {books.map((item, index) => (
                        <SwiperSlide key={item} className="!h-auto">
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    delay: shouldReduceMotion ? 0 : index * 0.07,
                                }}
                                whileHover={
                                    shouldReduceMotion
                                        ? undefined
                                        : { y: -5, transition: { duration: 0.25 } }
                                }
                                className="group relative h-full flex flex-col gap-4 p-4 md:p-5 overflow-hidden rounded-2xl border border-white/[0.08] dark:border-[#A87938]/15 bg-[#171614] dark:bg-[#FBF7EF] shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[#E7C9A5]/35 dark:hover:border-[#A87938]/35 transition-colors duration-300"
                            >
                                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#E7C9A5]/[0.06] dark:bg-[#A87938]/[0.06] blur-2xl pointer-events-none" />
                                {renderBookDetails()}
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden grid grid-cols-1 gap-4 py-1">
                <AnimatePresence initial={false}>
                    {books.slice(0, visibleCount).map((item, index) => (
                        <motion.div
                            key={item}
                            layout={!shouldReduceMotion}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : -10,
                                transition: { duration: 0.2 },
                            }}
                            transition={{
                                delay: shouldReduceMotion ? 0 : index * 0.06,
                                layout: { duration: 0.3 },
                            }}
                            whileTap={
                                shouldReduceMotion ? undefined : { scale: 0.985 }
                            }
                            className="group relative flex flex-col gap-4 p-4 overflow-hidden rounded-2xl border border-white/[0.08] dark:border-[#A87938]/15 bg-[#171614] dark:bg-[#FBF7EF] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        >
                            <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#E7C9A5]/[0.06] dark:bg-[#A87938]/[0.06] blur-2xl pointer-events-none" />
                            {renderBookDetails(true)}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Show more / less */}
            <div className="w-full flex sm:hidden pt-1">
                {visibleCount < books.length ? (
                    <>
                        <CustomButton
                            text="Show more"
                            iconAddress={imagesAddresses.icons.arrowDown}
                            iconPosition="left"
                            color="yellow"
                            containerClassName="!w-full cursor-pointer dark:hidden"
                            onClick={() => setVisibleCount(books.length)}
                        />
                        <CustomButton
                            text="Show more"
                            iconAddress={imagesAddresses.icons.arrowDownWhite}
                            iconPosition="left"
                            color="yellow"
                            containerClassName="!w-full cursor-pointer hidden dark:flex"
                            onClick={() => setVisibleCount(books.length)}
                        />
                    </>
                ) : (
                    <>
                        <CustomButton
                            text="Show less"
                            iconAddress={imagesAddresses.icons.arrowUp}
                            iconPosition="left"
                            color="yellow"
                            containerClassName="!w-full cursor-pointer dark:hidden"
                            onClick={() => setVisibleCount(INITIAL_COUNT)}
                        />
                        <CustomButton
                            text="Show less"
                            iconAddress={imagesAddresses.icons.arrowUpWhite}
                            iconPosition="left"
                            color="yellow"
                            containerClassName="!w-full cursor-pointer hidden dark:flex"
                            onClick={() => setVisibleCount(INITIAL_COUNT)}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default BorrowedBooks;