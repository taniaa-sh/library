"use client";

import CustomButton from "@/components/CustomButton";
import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import { useState } from "react";

const books = [1, 2, 3, 4, 5, 6, 7, 8];
const INITIAL_COUNT = 4;

const BorrowedBooks = () => {

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    return (
        <div className="w-full mt-4 flex flex-col gap-4 md:gap-5">
            <p className="text-light-100 dark:text-gray-900 font-semibold text-2xl md:text-3xl">Borrowed books</p>
            <div className="grid grid-cols-1 gap-4 sm:flex sm:overflow-x-auto sm:gap-4 md:gap-5 py-2 custom-scrollbar1">
                {books.slice(0, visibleCount).map((item) => (
                    <div
                        key={item}
                        className="flex-shrink-0 w-full sm:w-64 p-4 md:p-5 flex flex-col gap-3 md:gap-5 bg-[url('/images/loginBg.png')] bg-gray-900 bg-cover dark:bg-gray-50 rounded-lg"
                    >
                        <div className="bg-gold500/60 rounded-lg px-8 py-4 md:px-12 md:py-6 flex justify-center">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt="book"
                                width={120}
                                height={120}
                                className="-ml-2 md:-ml-4"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white dark:text-gray-900 font-semibold text-lg md:text-xl leading-5 md:leading-6">
                                The Origin
                            </p>
                            <p className="text-white dark:text-gray-900 font-semibold text-lg md:text-xl leading-5 md:leading-6">
                                By Dan Brown
                            </p>
                        </div>
                        <p className="text-light-100 dark:text-gray-900 font-normal text-base md:text-xl leading-4 md:leading-5">
                            Thriller / Mystery
                        </p>
                        <div className="flex gap-1">
                            <Image
                                src={imagesAddresses.icons.greenBook}
                                alt="star"
                                width={16}
                                height={16}
                            />
                            <p className="text-light-100 dark:text-gray-900 font-normal text-sm md:text-base">
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
                                <p className="text-light-100 dark:text-gray-900 font-normal text-sm md:text-base">
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
            {visibleCount < books.length ? (
                <>
                    <CustomButton
                        text="Show more"
                        iconAddress={imagesAddresses.icons.arrowDown}
                        iconPosition="left"
                        color="yellow"
                        containerClassName="cursor-pointer dark:hidden block"
                        onClick={() => setVisibleCount(books.length)}
                    />
                    <CustomButton
                        text="Show more"
                        iconAddress={imagesAddresses.icons.arrowDownWhite}
                        iconPosition="left"
                        color="yellow"
                        containerClassName="cursor-pointer dark:flex hidden"
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
                        containerClassName="cursor-pointer dark:hidden block"
                        onClick={() => setVisibleCount(INITIAL_COUNT)}
                    />
                    <CustomButton
                        text="Show less"
                        iconAddress={imagesAddresses.icons.arrowUpWhite}
                        iconPosition="left"
                        color="yellow"
                        containerClassName="cursor-pointer dark:flex hidden"
                        onClick={() => setVisibleCount(INITIAL_COUNT)}
                    />
                </>
            )
            }
        </div>
    );
};

export default BorrowedBooks;