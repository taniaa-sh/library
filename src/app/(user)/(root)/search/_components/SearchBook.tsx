
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import imagesAddresses from "@/utils/imageAddresses";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import BookList from "./BookList";
import SiteUrls from "@/utils/routs";
import showToast from "@/utils/toast";

type Book = {
    _id: string;
    id: number;
    title: string;
    author: string;
    genre: string;
    bookVideo: string;
    bookPrimaryColor: string;
    bookImage: string;
    totalNumberOfBooks: number;
    description: string;
    bookPdf: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
};

interface Props {
    data: Book[];
    totalPages?: number;
}

const SearchBook = ({ data: books, totalPages = 1 }: Props) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const searchQuery = searchParams.get("search") || "";

    const [search, setSearch] = useState(searchQuery);
    const [showNoResult, setShowNoResult] = useState(false);
    const [bookList, setBookList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const filterBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
    );

    const exactMatchBooks = books.filter(
        (book) =>
            book.title.toLowerCase() === search.trim().toLowerCase()
    );

    useEffect(() => {
        if (searchQuery.trim()) {
            setSearch(searchQuery);
            setShowResults(true);
            setShowNoResult(false);
            setBookList(false);
        } else {
            setShowResults(false);
            setShowNoResult(false);
            setBookList(false);
        }
    }, [searchQuery]);

    const handleSearch = (book: string) => {
        const query = book.trim();

        if (!query) {
            setShowNoResult(false);
            setShowResults(false);
            setBookList(false);
            showToast("Please enter a book name", "error");
            return;
        }

        setLoading(true);

        const exactMatch = books.some(
            (item) =>
                item.title.toLowerCase() === query.toLowerCase()
        );

        if (!exactMatch) {
            setShowNoResult(true);
            setShowResults(false);
            setBookList(false);
            setLoading(false);
            return;
        }

        setSearch(query);
        setShowNoResult(false);
        setBookList(false);
        setShowResults(true);

        router.push(`?search=${encodeURIComponent(query)}`);

        setLoading(false);
    };

    const handleSelectSuggestion = (book: string) => {
        setSearch(book);
        setShowNoResult(false);
        setBookList(false);
        handleSearch(book);
    };

    const handleClear = () => {
        setSearch("");
        setShowNoResult(false);
        setShowResults(false);
        setBookList(false);

        const params = new URLSearchParams(
            window.location.search
        );

        params.delete("search");

        const newQuery = params.toString();

        router.push(newQuery ? `?${newQuery}` : "?");
    };

    const reveal = {
        initial: shouldReduceMotion
            ? false
            : { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: shouldReduceMotion ? 0 : 0.55,
            ease: "easeOut" as const,
        },
    };

    return (
        <div className="relative w-full flex flex-col gap-12 pb-16 overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[420px] h-[300px] rounded-full bg-[#E7C9A5]/[0.05] dark:bg-[#A87938]/[0.08] blur-[100px] pointer-events-none" />

            <div className="relative z-10 mt-10 flex flex-col items-center gap-8 px-4 md:px-10">
                {/* Header */}
                <motion.div
                    {...reveal}
                    className="flex flex-col items-center pt-12 md:pt-16"
                >
                    <motion.span
                        initial={
                            shouldReduceMotion
                                ? false
                                : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 px-4 py-2 rounded-full border border-[#E7C9A5]/20 dark:border-[#A87938]/25 bg-[#E7C9A5]/[0.07] dark:bg-[#A87938]/[0.08] text-[#E7C9A5] dark:text-[#8B642D] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase"
                    >
                        YOUR NEXT CHAPTER
                    </motion.span>

                    <motion.p
                        initial={
                            shouldReduceMotion
                                ? false
                                : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                        }}
                        className="text-base md:text-xl font-medium leading-7 text-[#B8AA96] dark:text-[#75634E] text-center"
                    >
                        Discover Your Next Great Read
                    </motion.p>

                    <motion.h1
                        initial={
                            shouldReduceMotion
                                ? false
                                : { opacity: 0, y: 16 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                        }}
                        className="mt-3 text-[32px] sm:text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-[#F8F2E6] dark:text-[#17130F] text-center"
                    >
                        Explore and Search for
                        <span className="block mt-1 text-[#E7C9A5] dark:text-[#A87938]">
                            Any Book
                            <span className="text-[#F8F2E6] dark:text-[#17130F]">
                                {" "}In Our Library
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={
                            shouldReduceMotion
                                ? false
                                : { opacity: 0, y: 10 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.35,
                        }}
                        className="mt-5 max-w-xl text-center text-sm md:text-base leading-7 text-[#B8AA96] dark:text-[#75634E]"
                    >
                        Search by title or author and find the book
                        that inspires your next adventure.
                    </motion.p>
                </motion.div>

                {/* Search box */}
                <motion.div
                    initial={
                        shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 20, scale: 0.98 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.55,
                        delay: 0.2,
                        ease: "easeOut",
                    }}
                    className="w-full max-w-[650px] relative z-30"
                >
                    <div className="relative flex items-center gap-2 p-2 rounded-2xl border border-[#E7C9A5]/20 dark:border-[#A87938]/20 bg-[#171614] dark:bg-[#FBF7EF] shadow-[0_12px_45px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_35px_rgba(80,55,20,0.08)] transition-colors duration-300 focus-within:border-[#E7C9A5]/60 dark:focus-within:border-[#A87938]/50">
                        <div className="pl-2 shrink-0">
                            <Image
                                src={imagesAddresses.icons.serach}
                                alt=""
                                width={22}
                                height={22}
                                className="dark:hidden"
                            />
                            <Image
                                src={imagesAddresses.icons.searchLight}
                                alt=""
                                width={22}
                                height={22}
                                className="hidden dark:block"
                            />
                        </div>

                        <input
                            className="min-w-0 flex-1 bg-transparent py-3 px-1 text-sm md:text-base text-[#F8F2E6] dark:text-[#17130F] placeholder:text-[#887D6D] dark:placeholder:text-[#9B8A75] focus:outline-none"
                            type="text"
                            placeholder="Search by book title or author..."
                            value={search}
                            onChange={(e) => {
                                const value = e.target.value;

                                setSearch(value);
                                setBookList(true);
                                setShowNoResult(false);
                                setShowResults(false);

                                if (value.trim() === "") {
                                    handleClear();
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(search);
                                }

                                if (e.key === "Escape") {
                                    handleClear();
                                }
                            }}
                            aria-label="Search books by title or author"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={handleClear}
                                aria-label="Clear search"
                                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[#B8AA96] dark:text-[#75634E] hover:bg-white/10 dark:hover:bg-black/5 transition-colors"
                            >
                                <span className="text-xl leading-none">
                                    ×
                                </span>
                            </button>
                        )}

                        <CustomButton
                            text="Search"
                            color="yellow"
                            containerClassName="!w-fit !min-w-[95px] !rounded-xl cursor-pointer"
                            loading={loading}
                            onClick={() => handleSearch(search)}
                        />
                    </div>

                    {/* Search suggestions */}
                    <AnimatePresence>
                        {bookList &&
                            search.trim().length > 0 &&
                            filterBooks.length > 0 &&
                            !showNoResult && (
                                <motion.div
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: -8,
                                                scale: 0.99,
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -6,
                                        scale: 0.99,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-3 max-h-[300px] overflow-y-auto rounded-2xl border border-[#E7C9A5]/15 dark:border-[#A87938]/20 bg-[#171614] dark:bg-[#FBF7EF] shadow-[0_18px_45px_rgba(0,0,0,0.3)] dark:shadow-[0_18px_40px_rgba(80,55,20,0.1)] p-2"
                                >
                                    <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B8AA96] dark:text-[#75634E]">
                                        Suggested books
                                    </p>

                                    {filterBooks
                                        .slice(0, 8)
                                        .map((book, index) => (
                                            <motion.button
                                                key={book._id || book.id}
                                                type="button"
                                                initial={
                                                    shouldReduceMotion
                                                        ? false
                                                        : {
                                                            opacity: 0,
                                                            x: -8,
                                                        }
                                                }
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    delay: shouldReduceMotion
                                                        ? 0
                                                        : index * 0.03,
                                                }}
                                                onClick={() =>
                                                    handleSelectSuggestion(
                                                        book.title
                                                    )
                                                }
                                                className="w-full flex items-center gap-3 p-3 text-left rounded-xl hover:bg-[#E7C9A5]/10 dark:hover:bg-[#A87938]/10 transition-colors group"
                                            >
                                                <div className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-[#E7C9A5]/10 dark:bg-[#A87938]/10">
                                                    <Image
                                                        src={imagesAddresses.icons.serach}
                                                        alt=""
                                                        width={16}
                                                        height={16}
                                                        className="dark:hidden"
                                                    />
                                                    <Image
                                                        src={imagesAddresses.icons.searchLight}
                                                        alt=""
                                                        width={16}
                                                        height={16}
                                                        className="hidden dark:block"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-[#F8F2E6] dark:text-[#17130F] group-hover:text-[#E7C9A5] dark:group-hover:text-[#8B642D] transition-colors">
                                                        {book.title}
                                                    </p>

                                                    <p className="mt-1 truncate text-xs text-[#B8AA96] dark:text-[#75634E]">
                                                        by {book.author}
                                                    </p>
                                                </div>

                                                <span className="text-[#E7C9A5] dark:text-[#A87938] opacity-0 group-hover:opacity-100 transition-opacity">
                                                    →
                                                </span>
                                            </motion.button>
                                        ))}
                                </motion.div>
                            )}
                    </AnimatePresence>
                </motion.div>

                {/* No results */}
                <AnimatePresence mode="wait">
                    {showNoResult && (
                        <motion.div
                            key="no-results"
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : {
                                        opacity: 0,
                                        y: 18,
                                        scale: 0.98,
                                    }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 mb-8 w-full max-w-[420px] flex flex-col gap-5 items-center justify-center text-center p-7 md:p-9 rounded-3xl border border-[#E7C9A5]/15 dark:border-[#A87938]/20 bg-[#171614] dark:bg-[#FBF7EF] shadow-[0_15px_45px_rgba(0,0,0,0.15)]"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-[#E7C9A5]/10 dark:bg-[#A87938]/10 blur-2xl" />

                                <Image
                                    src={imagesAddresses.images.emptyResult}
                                    alt="No books found"
                                    width={160}
                                    height={160}
                                    className="relative object-contain dark:hidden"
                                />

                                <Image
                                    src={imagesAddresses.images.emptyResultLight}
                                    alt="No books found"
                                    width={160}
                                    height={160}
                                    className="relative hidden object-contain dark:block"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-2xl md:text-3xl font-semibold text-[#F8F2E6] dark:text-[#17130F]">
                                    No Results Found
                                </h2>

                                <p className="text-sm leading-7 text-[#B8AA96] dark:text-[#75634E]">
                                    We couldn’t find a book with that
                                    exact title. Try another title or
                                    select one of the suggestions.
                                </p>
                            </div>

                            <CustomButton
                                text="Clear Search"
                                color="yellow"
                                containerClassName="!w-full cursor-pointer"
                                onClick={handleClear}
                            />
                        </motion.div>
                    )}

                    {/* Search results */}
                    {showResults && !showNoResult && (
                        <motion.div
                            key="search-results"
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 18 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.35 }}
                            className="w-full max-w-[1100px] flex flex-col gap-7 mt-8"
                        >
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#E7C9A5] dark:text-[#8B642D] mb-2">
                                        YOUR DISCOVERY
                                    </p>

                                    <h2 className="text-xl md:text-3xl font-semibold text-[#F8F2E6] dark:text-[#17130F]">
                                        Search Results
                                    </h2>
                                </div>

                                <span className="shrink-0 rounded-full px-3 py-1.5 border border-[#E7C9A5]/20 dark:border-[#A87938]/20 bg-[#E7C9A5]/10 dark:bg-[#A87938]/10 text-xs font-medium text-[#E7C9A5] dark:text-[#8B642D]">
                                    {exactMatchBooks.length}{" "}
                                    {exactMatchBooks.length === 1
                                        ? "exact match"
                                        : "exact matches"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                                {exactMatchBooks.map(
                                    (book, index) => (
                                        <motion.button
                                            key={book._id || book.id}
                                            type="button"
                                            initial={
                                                shouldReduceMotion
                                                    ? false
                                                    : {
                                                        opacity: 0,
                                                        y: 20,
                                                    }
                                            }
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                delay: shouldReduceMotion
                                                    ? 0
                                                    : index * 0.07,
                                            }}
                                            whileHover={
                                                shouldReduceMotion
                                                    ? undefined
                                                    : { y: -6 }
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
                                            className="group w-full min-w-0 text-left rounded-2xl p-3 sm:p-4 bg-[#171614] dark:bg-[#FBF7EF] border border-white/[0.08] dark:border-[#A87938]/15 shadow-[0_8px_28px_rgba(0,0,0,0.16)] hover:border-[#E7C9A5]/40 dark:hover:border-[#A87938]/40 hover:shadow-[0_16px_35px_rgba(231,201,165,0.1)] dark:hover:shadow-[0_16px_35px_rgba(168,121,56,0.1)] transition-colors duration-300"
                                        >
                                            <div className="relative overflow-hidden rounded-xl bg-[#E7C9A5]/10 dark:bg-[#A87938]/10">
                                                <div className="aspect-[3/4] flex items-center justify-center p-3">
                                                    <Image
                                                        src={book.bookImage}
                                                        alt={book.title}
                                                        width={180}
                                                        height={260}
                                                        className="w-full h-full object-contain rounded-lg drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>

                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/35 via-transparent to-transparent pointer-events-none" />

                                                <span className="absolute top-2 left-2 max-w-[calc(100%-16px)] truncate rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold bg-[#171614]/85 text-[#E7C9A5] backdrop-blur-sm border border-[#E7C9A5]/20">
                                                    {book.genre}
                                                </span>
                                            </div>

                                            <div className="mt-4 flex flex-col gap-2">
                                                <h3 className="text-sm sm:text-base font-semibold leading-5 line-clamp-2 min-h-10 text-[#F8F2E6] dark:text-[#17130F] group-hover:text-[#E7C9A5] dark:group-hover:text-[#8B642D] transition-colors">
                                                    {book.title}
                                                </h3>

                                                <p className="text-xs sm:text-sm truncate text-[#B8AA96] dark:text-[#75634E]">
                                                    by {book.author}
                                                </p>

                                                <div className="pt-3 mt-1 border-t border-white/10 dark:border-[#17130F]/10 flex items-center justify-between gap-2">
                                                    <span className="text-[10px] sm:text-xs text-[#B8AA96] dark:text-[#75634E]">
                                                        View details
                                                    </span>

                                                    <span className="text-[#E7C9A5] dark:text-[#A87938] transition-transform duration-300 group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.button>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Default book list */}
                {!showResults && !showNoResult && (
                    <BookList data={books} />
                )}
            </div>
        </div>
    );
};

export default SearchBook;