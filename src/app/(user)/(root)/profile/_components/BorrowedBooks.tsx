"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useState } from "react";

const books = [1, 2, 3, 4, 5, 6, 7, 8];
const INITIAL_COUNT = 4;

const BorrowedBooks = () => {
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const swiperRef = useRef<any>(null);

    return (
        <div className="w-full mt-4 flex flex-col gap-4 md:gap-5">
            <p className="text-light-100 dark:text-gray-900 font-semibold text-2xl md:text-3xl">
                Borrowed books
            </p>
            <div className="hidden sm:flex sm:flex-col sm:gap-2">
                <Image
                    src={imagesAddresses.icons.arrowRightYellow2}
                    alt="star"
                    width={25}
                    height={25}
                    className="self-end cursor-pointer dark:hidden"
                    onClick={() => {
                        if (swiperRef.current && swiperRef.current.swiper) {
                            swiperRef.current.swiper.slideTo(books.length - 1);
                        }
                    }}
                />
                <Image
                    src={imagesAddresses.icons.arrowRightYellow}
                    alt="star"
                    width={25}
                    height={25}
                    className="self-end cursor-pointer dark:flex hidden"
                    onClick={() => {
                        if (swiperRef.current && swiperRef.current.swiper) {
                            swiperRef.current.swiper.slideTo(books.length - 1);
                        }
                    }}
                />
                <div className="hidden sm:flex">
                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation]}
                        spaceBetween={20}
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
                    >
                        {books.map((item) => (
                            <SwiperSlide key={item}>
                                <div className="flex flex-col gap-5 p-5 bg-[url('/images/loginBg.png')] bg-gray-900 bg-cover dark:bg-gray-50 rounded-lg cursor-grab">
                                    <div className="bg-gold500/60 rounded-lg px-12 py-6 flex justify-center">
                                        <Image
                                            src={imagesAddresses.images.book1}
                                            alt="book"
                                            width={120}
                                            height={120}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-white dark:text-gray-900 font-semibold text-xl leading-6">
                                            The Origin
                                        </p>
                                        <p className="text-white dark:text-gray-900 font-semibold text-xl leading-6">
                                            By Dan Brown
                                        </p>
                                    </div>
                                    <p className="text-light-100 dark:text-gray-900 font-normal text-xl leading-5">
                                        Thriller / Mystery
                                    </p>
                                    <div className="flex gap-1">
                                        <Image
                                            src={imagesAddresses.icons.greenBook}
                                            alt="star"
                                            width={16}
                                            height={16}
                                        />
                                        <p className="text-light-100 dark:text-gray-900 font-normal text-base">
                                            Borrowed on Dec 31
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-1">
                                            <Image
                                                src={imagesAddresses.icons.calender}
                                                alt="calendar"
                                                width={16}
                                                height={16}
                                            />
                                            <p className="text-light-100 dark:text-gray-900 font-normal text-base">
                                                04 days left to due
                                            </p>
                                        </div>
                                        <Image
                                            src={imagesAddresses.icons.list}
                                            alt="list"
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/* Mobile */}
            <div className="sm:hidden grid grid-cols-1 gap-4 py-2">
                {books.slice(0, visibleCount).map((item) => (
                    <div
                        key={item}
                        className="flex-shrink-0 w-full p-4 flex flex-col gap-3 bg-[url('/images/loginBg.png')] bg-gray-900 bg-cover dark:bg-gray-50 rounded-lg"
                    >
                        <div className="bg-gold500/60 rounded-lg px-8 py-4 flex justify-center">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt="book"
                                width={120}
                                height={120}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white dark:text-gray-900 font-semibold text-lg md:text-xl leading-5">
                                The Origin
                            </p>
                            <p className="text-white dark:text-gray-900 font-semibold text-lg md:text-xl leading-5">
                                By Dan Brown
                            </p>
                        </div>
                        <p className="text-light-100 dark:text-gray-900 font-normal text-base leading-4">
                            Thriller / Mystery
                        </p>
                        <div className="flex gap-1">
                            <Image
                                src={imagesAddresses.icons.greenBook}
                                alt="star"
                                width={16}
                                height={16}
                            />
                            <p className="text-light-100 dark:text-gray-900 font-normal text-sm">
                                Borrowed on Dec 31
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                <Image
                                    src={imagesAddresses.icons.calender}
                                    alt="calendar"
                                    width={16}
                                    height={16}
                                />
                                <p className="text-light-100 dark:text-gray-900 font-normal text-sm">
                                    04 days left to due
                                </p>
                            </div>
                            <Image
                                src={imagesAddresses.icons.list}
                                alt="list"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full flex sm:hidden">
                {visibleCount < books.length ? (
                    <>
                        <CustomButton
                            text="Show more"
                            iconAddress={imagesAddresses.icons.arrowDown}
                            iconPosition="left"
                            color="yellow"
                            containerClassName="w-full cursor-pointer dark:hidden block"
                            onClick={() => setVisibleCount(books.length)}
                        />
                        <CustomButton
                            text="Show more"
                            iconAddress={imagesAddresses.icons.arrowDownWhite}
                            iconPosition="left"
                            color="yellow"
                            containerClassName="w-full cursor-pointer dark:flex hidden"
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
                            containerClassName="w-full cursor-pointer dark:hidden block"
                            onClick={() => setVisibleCount(INITIAL_COUNT)}
                        />
                        <CustomButton
                            text="Show less"
                            iconAddress={imagesAddresses.icons.arrowUpWhite}
                            iconPosition="left"
                            color="yellow"
                            containerClassName="w-full cursor-pointer dark:flex hidden"
                            onClick={() => setVisibleCount(INITIAL_COUNT)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
export default BorrowedBooks;