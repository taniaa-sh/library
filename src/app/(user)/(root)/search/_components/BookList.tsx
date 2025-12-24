"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import SiteUrls from "@/utils/routs";
import { useEffect, useState } from "react";
import { BookFeatureProps } from "@/utils/type";
import ReactPaginate from "react-paginate";

const BookList = () => {
    const router = useRouter();

    const [data, setData] = useState<BookFeatureProps[]>([]);
    const totalPages = 10;

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;
        router.push(`?page=${page}`);
    };

    useEffect(() => {
        fetch('/data/data.json')
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error('error:', err));
    }, []);

    return (
        <div className="my-10 flex flex-col gap-6">
            <p className="text-[20px] md:text-[28px] font-semibold text-white dark:text-gray-900">
                All Books
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {data.map((book, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            router.push(
                                SiteUrls.bookDetail + `/${book.id}`
                            )
                        }
                        className="
                                group w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px]
                                cursor-pointer rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1
                                bg-gradient-to-b from-[#0f0f0f] to-[#181818]
                                border border-white/5
                                shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                                hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]
                                dark:bg-gradient-to-b dark:from-white dark:to-gray-100
                                dark:border-gray-200
                                dark:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                                dark:hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]
                            "
                    >
                        <div className="relative flex justify-center">
                            <Image
                                src={book.coverUrl}
                                alt={book.title}
                                width={180}
                                height={260}
                                className="w-[110px] h-[155px] sm:w-[130px] sm:h-[185px] md:w-[150px] md:h-[210px] object-cover rounded-xl shadow-xl !-ml-10"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-black/40 dark:via-black/10" />
                        </div>

                        <div className="mt-3 h-[92px] flex flex-col justify-between text-start">
                            <div>
                                {/* Title */}
                                <p className="text-[12px] sm:text-sm font-semibold leading-5 line-clamp-2 min-h-[40px] transition-colors text-white group-hover:text-[#d4af37] dark:text-gray-900 dark:group-hover:text-amber-600">
                                    {book.title}
                                </p>

                                {/* Author */}
                                <p className="mt-1 text-[11px] italic truncate text-gray-400 dark:text-gray-500">
                                    by {book.author}
                                </p>
                            </div>

                            {/* Genre */}
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 dark:bg-amber-100 dark:text-amber-700 dark:border-amber-200">
                                {book.genre}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-7 overflow-x-auto dark:!text-white">
                <ReactPaginate
                    previousLabel={"‹"}
                    nextLabel={"›"}
                    breakLabel={"…"}
                    pageCount={totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="flex items-center gap-1 text-xs sm:text-sm cursor-pointer select-none whitespace-nowrap"
                    pageClassName="px-2 sm:px-3 py-1 border rounded-md border-gray-400 dark:border-gray-500 dark:text-gray-700 text-gray-200 dark:hover:bg-gray-200 hover:bg-dark-400 transition"
                    activeClassName="bg-primary text-gray-900 dark:text-gray-700 border-primary"
                    previousClassName="px-2 sm:px-3 py-1 border rounded-md dark:border-gray-300 border-dark-400 dark:text-gray-700 text-gray-200 dark:hover:bg-gray-200 hover:bg-dark-400 transition"
                    nextClassName="px-2 sm:px-3 py-1 border rounded-md dark:border-gray-300 border-dark-400 dark:text-gray-700 text-gray-200 dark:hover:bg-gray-200 hover:bg-dark-400 transition"
                    disabledClassName="opacity-40 cursor-not-allowed"
                    breakClassName="text-white dark:text-gray-700"
                />
            </div>
        </div>
    );
};

export default BookList;
