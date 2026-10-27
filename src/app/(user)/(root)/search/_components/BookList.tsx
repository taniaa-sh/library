"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CustomInputSelect from "@/components/CustomInputSelect";
import SiteUrls from "@/utils/routs";
import { BookFeatureProps } from "@/utils/type";
import imagesAddresses from "@/utils/imageAddresses";

const GENRES = ["All", "Fiction", "Non-fiction", "Science", "Biography"];

const genreToId: Record<string, string> = {
    Fiction: "1",
    "Non-fiction": "2",
    Science: "3",
    Biography: "4",
};

const idToGenre: Record<string, string> = {
    "1": "Fiction",
    "2": "Non-fiction",
    "3": "Science",
    "4": "Biography",
};

const ITEMS_PER_PAGE = 12;

const BookList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const shouldReduceMotion = useReducedMotion();

    const [data, setData] = useState<BookFeatureProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const genreFromUrl = searchParams.get("genre") || "";
        const pageFromUrl = Number(searchParams.get("page")) || 1;

        setSelectedGenre(idToGenre[genreFromUrl] || "");
        setCurrentPage(
            Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1
        );
    }, [searchParams]);

    useEffect(() => {
        let isMounted = true;

        fetch("/data/data.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to load books");
                }
                return res.json();
            })
            .then((json: BookFeatureProps[]) => {
                if (isMounted) setData(json);
            })
            .catch((err) => console.error("Error loading books:", err))
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const updateUrl = (genre: string, page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (genre && genreToId[genre]) {
            params.set("genre", genreToId[genre]);
        } else {
            params.delete("genre");
        }

        if (page > 1) {
            params.set("page", String(page));
        } else {
            params.delete("page");
        }

        const query = params.toString();
        router.push(query ? `?${query}` : window.location.pathname, {
            scroll: false,
        });
    };

    const handleSelectGenre = (value: string) => {
        const genre = value === "All" ? "" : value;

        setSelectedGenre(genre);
        setCurrentPage(1);
        updateUrl(genre, 1);
    };

    const handlePageClick = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected + 1;

        setCurrentPage(page);
        updateUrl(selectedGenre, page);
    };

    const filteredData = selectedGenre
        ? data.filter((book) => book.genre === selectedGenre)
        : data;

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const safeCurrentPage = Math.min(
        Math.max(currentPage, 1),
        Math.max(totalPages, 1)
    );

    const paginatedData = filteredData.slice(
        (safeCurrentPage - 1) * ITEMS_PER_PAGE,
        safeCurrentPage * ITEMS_PER_PAGE
    );

    const reveal = {
        initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut" as const,
        },
    };

    return (
        <section className="relative w-full my-10 flex flex-col gap-7 md:gap-9">
            {/* Header and genre filter */}
            <motion.div
                {...reveal}
                className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            >
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#E7C9A5] dark:text-[#8B642D]">
                        EXPLORE THE COLLECTION
                    </span>

                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#F8F2E6] dark:text-[#17130F]">
                        All Books
                    </h2>

                    <p className="text-sm leading-6 text-[#B8AA96] dark:text-[#75634E]">
                        Find your next favorite from our library.
                    </p>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <label className="text-xs sm:text-sm font-medium text-[#B8AA96] dark:text-[#75634E]">
                        Filter by genre
                    </label>

                    <div className="w-full md:w-[220px] rounded-xl border border-[#E7C9A5]/20 dark:border-[#A87938]/20 bg-[#171614] dark:bg-[#FBF7EF] p-1 transition-colors duration-300">
                        <CustomInputSelect
                            name="genre"
                            placeholder="Select a genre"
                            Values={GENRES}
                            value={selectedGenre || "All"}
                            onChange={handleSelectGenre}
                            containerClassName="!w-full"
                            customScrollBar
                        />
                    </div>
                </div>
            </motion.div>

            {/* Result count */}
            {!isLoading && (
                <div className="flex items-center justify-between gap-3 border-b border-white/10 dark:border-[#17130F]/10 pb-4">
                    <p className="text-xs sm:text-sm text-[#B8AA96] dark:text-[#75634E]">
                        {selectedGenre ? (
                            <>
                                Browsing{" "}
                                <span className="font-medium text-[#E7C9A5] dark:text-[#8B642D]">
                                    {selectedGenre}
                                </span>{" "}
                                books
                            </>
                        ) : (
                            "Browse our complete collection"
                        )}
                    </p>

                    <span className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border border-[#E7C9A5]/20 dark:border-[#A87938]/20 bg-[#E7C9A5]/10 dark:bg-[#A87938]/10 text-[#E7C9A5] dark:text-[#8B642D]">
                        {filteredData.length} books
                    </span>
                </div>
            )}

            {/* Loading state */}
            {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse rounded-2xl border border-white/[0.06] dark:border-[#A87938]/10 bg-[#171614] dark:bg-[#FBF7EF] p-3 sm:p-4"
                        >
                            <div className="aspect-[3/4] rounded-xl bg-white/[0.06] dark:bg-[#A87938]/10" />
                            <div className="mt-4 h-4 rounded bg-white/[0.06] dark:bg-[#A87938]/10" />
                            <div className="mt-3 h-3 w-2/3 rounded bg-white/[0.06] dark:bg-[#A87938]/10" />
                            <div className="mt-5 h-5 w-20 rounded-full bg-white/[0.06] dark:bg-[#A87938]/10" />
                        </div>
                    ))}
                </div>
            )}

            {/* Book cards */}
            {!isLoading && paginatedData.length > 0 && (
                <motion.div
                    layout={!shouldReduceMotion}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {paginatedData.map((book, index) => (
                            <motion.button
                                key={book.id}
                                type="button"
                                layout={!shouldReduceMotion}
                                initial={
                                    shouldReduceMotion
                                        ? false
                                        : { opacity: 0, y: 18 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    y: 8,
                                    transition: { duration: 0.15 },
                                }}
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.35,
                                    delay: shouldReduceMotion
                                        ? 0
                                        : index * 0.035,
                                    ease: "easeOut",
                                }}
                                whileHover={
                                    shouldReduceMotion
                                        ? undefined
                                        : { y: -5 }
                                }
                                whileTap={
                                    shouldReduceMotion
                                        ? undefined
                                        : { scale: 0.98 }
                                }
                                onClick={() =>
                                    router.push(
                                        `${SiteUrls.bookDetail}/${book.id}`
                                    )
                                }
                                className="group relative min-w-0 w-full overflow-hidden rounded-2xl p-3 sm:p-4 text-left bg-[#171614] dark:bg-[#FBF7EF] border border-white/[0.08] dark:border-[#A87938]/15 shadow-[0_8px_28px_rgba(0,0,0,0.15)] hover:border-[#E7C9A5]/40 dark:hover:border-[#A87938]/35 hover:shadow-[0_16px_35px_rgba(231,201,165,0.09)] dark:hover:shadow-[0_16px_35px_rgba(168,121,56,0.10)] transition-[border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7C9A5] dark:focus-visible:ring-[#A87938]"
                            >
                                {/* Decorative glow */}
                                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#E7C9A5]/[0.06] dark:bg-[#A87938]/[0.06] blur-2xl pointer-events-none" />

                                {/* Cover */}
                                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#E7C9A5]/15 via-[#E7C9A5]/5 to-transparent dark:from-[#A87938]/15 dark:via-[#A87938]/5">
                                    <div className="aspect-[3/4] flex items-center justify-center p-3">
                                        <Image
                                            src={book.coverUrl}
                                            alt={book.title}
                                            width={180}
                                            height={260}
                                            className="w-full h-full object-contain rounded-lg drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/25 via-transparent to-transparent pointer-events-none" />

                                    <span className="absolute top-2 left-2 max-w-[calc(100%-16px)] truncate rounded-full px-2 py-1 text-[9px] sm:text-[10px] font-semibold bg-[#171614]/85 text-[#E7C9A5] border border-[#E7C9A5]/20 backdrop-blur-sm">
                                        {book.genre}
                                    </span>
                                </div>

                                {/* Book information */}
                                <div className="relative mt-4 flex flex-col items-start gap-2">
                                    <h3 className="w-full text-xs sm:text-sm font-semibold leading-5 line-clamp-2 min-h-10 text-[#F8F2E6] dark:text-[#17130F] group-hover:text-[#E7C9A5] dark:group-hover:text-[#8B642D] transition-colors">
                                        {book.title}
                                    </h3>

                                    <p className="w-full text-[11px] sm:text-xs truncate text-[#B8AA96] dark:text-[#75634E]">
                                        by {book.author}
                                    </p>

                                    <div className="w-full mt-2 pt-3 border-t border-white/10 dark:border-[#17130F]/10 flex items-center justify-between gap-2">
                                        <span className="text-[10px] sm:text-xs text-[#B8AA96] dark:text-[#75634E]">
                                            View details
                                        </span>

                                        <span className="text-sm text-[#E7C9A5] dark:text-[#A87938] transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Empty state */}
            {!isLoading && paginatedData.length === 0 && (
                <motion.div
                    {...reveal}
                    className="flex flex-col items-center text-center gap-4 py-12 px-5 rounded-3xl border border-[#E7C9A5]/15 dark:border-[#A87938]/15 bg-[#171614] dark:bg-[#FBF7EF]"
                >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#E7C9A5]/10 dark:bg-[#A87938]/10">
                        <Image
                            src={imagesAddresses.icons.serach}
                            alt=""
                            width={28}
                            height={28}
                            className="dark:hidden opacity-70"
                        />
                        <Image
                            src={imagesAddresses.icons.searchLight}
                            alt=""
                            width={28}
                            height={28}
                            className="hidden dark:block opacity-70"
                        />
                    </div>

                    <h3 className="text-xl font-semibold text-[#F8F2E6] dark:text-[#17130F]">
                        No books found
                    </h3>

                    <p className="max-w-sm text-sm leading-6 text-[#B8AA96] dark:text-[#75634E]">
                        There are no books in this category yet. Try selecting
                        another genre.
                    </p>

                    {selectedGenre && (
                        <button
                            type="button"
                            onClick={() => handleSelectGenre("All")}
                            className="px-4 py-2 rounded-xl border border-[#E7C9A5]/25 dark:border-[#A87938]/25 text-sm font-medium text-[#E7C9A5] dark:text-[#8B642D] hover:bg-[#E7C9A5]/10 dark:hover:bg-[#A87938]/10 transition-colors"
                        >
                            View all books
                        </button>
                    )}
                </motion.div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <motion.div
                    {...reveal}
                    className="flex flex-col items-center gap-3 mt-3"
                >
                    <ReactPaginate
                        forcePage={safeCurrentPage - 1}
                        previousLabel="‹"
                        nextLabel="›"
                        breakLabel="…"
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-sm select-none"
                        pageClassName="min-w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 dark:border-[#A87938]/15 text-[#B8AA96] dark:text-[#75634E] hover:border-[#E7C9A5]/40 dark:hover:border-[#A87938]/40 hover:bg-[#E7C9A5]/10 dark:hover:bg-[#A87938]/10 transition-colors"
                        activeClassName="!border-[#E7C9A5] dark:!border-[#A87938] !bg-[#E7C9A5] dark:!bg-[#A87938] !text-[#17130F] font-semibold"
                        previousClassName="min-w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 dark:border-[#A87938]/15 text-[#E7C9A5] dark:text-[#8B642D] hover:bg-[#E7C9A5]/10 dark:hover:bg-[#A87938]/10 transition-colors"
                        nextClassName="min-w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 dark:border-[#A87938]/15 text-[#E7C9A5] dark:text-[#8B642D] hover:bg-[#E7C9A5]/10 dark:hover:bg-[#A87938]/10 transition-colors"
                        disabledClassName="!opacity-30 !cursor-not-allowed"
                        breakClassName="px-2 text-[#B8AA96] dark:text-[#75634E]"
                    />

                    <p className="text-[11px] text-[#887D6D] dark:text-[#75634E]">
                        Page {safeCurrentPage} of {totalPages}
                    </p>
                </motion.div>
            )}
        </section>
    );
};

export default BookList;