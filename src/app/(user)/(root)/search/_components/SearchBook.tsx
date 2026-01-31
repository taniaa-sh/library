"use client"

import { useSearchParams } from "next/navigation"
import imagesAddresses from "@/utils/imageAddresses"
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CustomButton from "@/components/CustomButton";
import BookList from "./BookList";
import { BookFeatureProps } from "@/utils/type";
import SiteUrls from "@/utils/routs";
import showToast from "@/utils/toast";

const SearchBook = () => {

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || ""
    const [data, setData] = useState<BookFeatureProps[]>([]);

    useEffect(() => {
        fetch('/data/data.json')
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error('error:', err));
    }, []);

    const router = useRouter()
    const [search, setSearch] = useState(searchQuery)
    const [showNoResult, setShowNoResult] = useState(false)
    const [bookList, setBookList] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)

    const filterBooks = data.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        if (searchQuery && searchQuery.trim() !== "") {
            setSearch(searchQuery)
            setShowResults(true)
            setShowNoResult(false)
            setBookList(false)
        } else {
            setShowResults(false)
            setShowNoResult(false)
            setBookList(false)
        }
    }, [])

    const handleSearch = (book: string) => {

        if (book === "") {
            setShowNoResult(false)
            setShowResults(false)
            setBookList(false)
             showToast("Please enter a book name", "error");
            return
        }
        setLoading(true)
        const exactMatch = data.some(b => b.title.toLowerCase() === book.toLowerCase());

        if (!exactMatch) {
            setShowNoResult(true)
            setShowResults(false)
            setBookList(false)
            setLoading(false)
            return
        }

        setShowNoResult(false)
        setBookList(false)
        setShowResults(true)
        router.push(`?search=${encodeURIComponent(book)}`)
        setLoading(false)
    };

    const handleSelectSuggestion = (book: string) => {
        setSearch(book)
        setShowNoResult(false)
        setBookList(false)
        handleSearch(book)
    };

    const handleClear = () => {
        setSearch("")
        setShowNoResult(false)
        setShowResults(false)
        const params = new URLSearchParams(window.location.search)
        params.delete("search")
        const newQuery = params.toString()
        router.push(newQuery ? `?${newQuery}` : "?")
    }

    return (
        <div className="w-full flex flex-col gap-12 pb-10">
            <div className="mt-10 flex flex-col items-center gap-8 px-4 md:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-[18px] md:text-[20px] font-semibold leading-7 text-light-100 dark:text-gray-700 text-center pt-20"
                    >
                        Discover Your Next Great Read:
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-[32px] md:text-[56px] font-semibold leading-snug text-white dark:text-gray-900 text-center"
                    >
                        Explore and Search for
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-[32px] md:text-[56px] font-semibold leading-snug text-white dark:text-gray-900  text-center"
                    >
                        <span className="text-gold100 dark:text-gold600">Any Book </span> In Our Library
                    </motion.p>
                </motion.div>

                {/* Search Box */}
                <div className="w-full max-w-[600px] flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <div className="w-full max-w-[600px] flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative w-full"
                        >
                            <div className="flex gap-2 items-center">
                                <motion.input
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    className="w-full sm:flex-1 bg-dark-300 dark:bg-white dark:text-gray-900 py-3 px-10 sm:py-4 sm:px-12 rounded-lg placeholder-gray-400 text-light-100 focus:outline-none focus:ring-2 focus:ring-gold100 transition"
                                    type="text"
                                    placeholder="Search for a book"
                                    value={search}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setSearch(value)
                                        setBookList(true)
                                        setShowNoResult(false)
                                        setShowResults(false)

                                        if (value.trim() === "") {
                                            handleClear()
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSearch(search)
                                    }}
                                />

                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                >
                                    <CustomButton
                                        text="Search"
                                        color="yellow"
                                        containerClassName="!w-fit h-12 cursor-pointer"
                                        loading={loading}
                                        onClick={() => handleSearch(search)}
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="absolute top-3 md:top-4 left-2 z-50 cursor-pointer"
                                onClick={() => handleSearch(search)}
                            >
                                <Image
                                    src={imagesAddresses.icons.serach}
                                    alt="Search Icon"
                                    width={25}
                                    height={25}
                                    className="cursor-pointer dark:hidden"
                                />
                                <Image
                                    src={imagesAddresses.icons.searchLight}
                                    alt="Search Icon"
                                    width={25}
                                    height={25}
                                    className="cursor-pointer hidden dark:block"
                                />
                            </motion.div>
                        </motion.div>

                        <AnimatePresence>
                            {bookList && search.length > 0 && filterBooks.length > 0 && !showNoResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="bg-dark-300 dark:bg-gray-300 rounded-lg shadow-lg p-2 z-20 !mt-2 max-h-[300px] overflow-y-scroll"
                                >
                                    {filterBooks.map((book) => (
                                        <p
                                            key={book.id}
                                            onClick={() => handleSelectSuggestion(book.title)}
                                            className="p-3 cursor-pointer hover:bg-[#2b3145] dark:hover:bg-gray-200 text-light-100 dark:text-gray-900 rounded-md text-sm"
                                        >
                                            {book.title}
                                        </p>
                                    ))}

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                {showNoResult ? (
                    /* No Result */
                    <div className="mt-16 !mb-8 flex flex-col gap-4 items-center justify-center max-w-[360px] text-center">
                        <Image
                            src={imagesAddresses.images.emptyResult}
                            alt="empty"
                            width={200}
                            height={200}
                            className="object-contain dark:hidden"
                        />
                        <Image
                            src={imagesAddresses.images.emptyResultLight}
                            alt="empty"
                            width={200}
                            height={200}
                            className="object-contain hidden dark:block"
                        />

                        <p className="text-2xl md:text-3xl font-semibold leading-7 text-white dark:text-gray-900">
                            No Results Found
                        </p>

                        <p className="text-sm md:text-base font-normal leading-6 text-light-100 dark:text-gray-600">
                            We couldn’t find any books matching your search. Try using different keywords or check for typos.
                        </p>

                        <CustomButton
                            text="Clear Search"
                            color="yellow"
                            containerClassName="w-full cursor-pointer flex text-nowrap"
                            loading={loading}
                            onClick={handleClear}
                        />
                    </div>
                ) : showResults ? (
                    /* Search Results */
                    <div className="w-full max-w-[1000px] flex flex-col gap-6 !mt-8">
                        <p className="text-[20px] md:text-[30px] font-semibold leading-7 text-white dark:text-gray-900">
                            Search Results
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {filterBooks.map((book) => (
                                <div
                                    key={book.id}
                                    onClick={() =>
                                        router.push(`${SiteUrls.bookDetail}/${book.id}`)
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
                                            <p className="text-[12px] sm:text-sm font-semibold leading-5 line-clamp-2 min-h-[40px] transition-colors text-white group-hover:text-[#d4af37] dark:text-gray-900 dark:group-hover:text-amber-600">
                                                {book.title}
                                            </p>

                                            <p className="mt-1 text-[11px] italic truncate text-gray-400 dark:text-gray-500">
                                                by {book.author}
                                            </p>
                                        </div>

                                        <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 dark:bg-amber-100 dark:text-amber-700 dark:border-amber-200">
                                            {book.genre}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* All Books */
                    <BookList />
                )}
            </div>
        </div>
    )
}

export default SearchBook
