"use client";

import Image from "next/image";
import imagesAddresses from "@/utils/imageAddresses";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";

interface PropsType {
    data: string[];
}

const BookList = ({ data }: PropsType) => {
    const router = useRouter();

    return (
        <div className="my-10 flex flex-col gap-6">
            <p className="text-[20px] md:text-[28px] font-semibold text-white dark:text-gray-900">
                All Books
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {data.map((book, index) => (
                    <div
                        onClick={() => router.push(`${SiteUrls.bookDetail}/${1111}`)}
                        key={index}
                        className="group rounded-xl bg-dark-300 dark:bg-white p-4 flex flex-col gap-3 cursor-pointer transition hover:scale-[1.03]"
                    >
                        <div className="relative w-full flex justify-center">
                            <Image
                                src={imagesAddresses.images.book1}
                                alt={book}
                                width={120}
                                height={160}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            <p className="text-sm md:text-base font-semibold text-white dark:text-gray-900 line-clamp-2">
                                {book}
                            </p>
                            <p className="text-xs md:text-sm text-light-100 dark:text-gray-600">
                                Unknown Author
                            </p>
                            <span className="text-xs text-gold100 dark:text-gold600">
                                General
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
