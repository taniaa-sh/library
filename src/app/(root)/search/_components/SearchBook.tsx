"use client"

import { Button } from "@/components/ui/button"
import imagesAddresses from "@/utils/imageAddresses"
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner";

interface PropsType {
    data: string[]
}

const SearchBook = ({ data }: PropsType) => {

    const query = new URLSearchParams(window.location.search)
    const searchQuery = query.get("search")

    const router = useRouter()
    const [search, setSearch] = useState(searchQuery || "")
    const [showNoResult, setShowNoResult] = useState(false)
    const [bookList, setBookList] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)

    const filterBooks = data.filter(book => book.toLowerCase().includes(search.toLowerCase()))

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
            toast.error("Please enter a book name")
            return
        }
        setLoading(true)
        const exactMatch = data.some(item => item.toLowerCase() === book.toLowerCase());

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
        <div className="w-full flex flex-col gap-12">
            <div className="mt-10 flex flex-col items-center gap-8 px-4 md:px-10">
                {/* Header */}
                <div>
                    <p className="text-[18px] md:text-[20px] font-semibold leading-7 text-light-100 text-center pt-20">
                        Discover Your Next Great Read:
                    </p>
                    <p className="text-[32px] md:text-[56px] font-semibold leading-snug text-white text-center">
                        Explore and Search for
                    </p>
                    <p className="text-[32px] md:text-[56px] font-semibold leading-snug text-white text-center">
                        <span className="text-light-200">Any Book </span> In Our Library
                    </p>
                </div>

                {/* Search Box */}
                <div className="w-full max-w-[600px] flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <div className="w-full max-w-[600px] flex flex-col">
                        <div className="relative">
                            <input
                                className="w-full sm:flex-1 bg-[#232839] py-3 px-10 sm:py-4 sm:px-12 rounded-lg placeholder-gray-400 text-light-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
                            <Image
                                src={imagesAddresses.icons.serach}
                                alt="Search Icon"
                                width={25}
                                height={25}
                                className="absolute top-3 md:top-4 left-2 cursor-pointer z-50"
                                onClick={() => handleSearch(search)}
                            />
                        </div>

                        <AnimatePresence>
                            {bookList && search.length > 0 && filterBooks.length > 0 && !showNoResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="bg-[#232839] rounded-lg shadow-lg p-2 z-20 !mt-2"
                                >
                                    {filterBooks.map((book) => (
                                        <p
                                            key={book}
                                            className="p-3 cursor-pointer hover:bg-[#2b3145] text-light-100 rounded-md text-sm"
                                            onClick={() => handleSelectSuggestion(book)}
                                        >
                                            {book}
                                        </p>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Button
                        className="w-full sm:w-auto !p-3 sm:!px-6 sm:!py-7 cursor-pointer self-start flex items-center justify-center gap-2"
                        onClick={() => handleSearch(search)}
                        disabled={loading}
                    >
                        {loading ? <span className='w-4 h-4 rounded-full border-2 border-t-2 border-white animate-spin' /> : "Search"}
                    </Button>
                </div>

                {/* No Result */}
                {showNoResult && (
                    <div className="mt-16 flex flex-col gap-4 items-center justify-center max-w-[360px] text-center">
                        <Image
                            src={imagesAddresses.images.emptyResult}
                            alt="empty"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                        <p className="text-2xl md:text-3xl font-semibold leading-7 text-white">
                            No Results Found
                        </p>
                        <p className="text-sm md:text-base font-normal leading-6 text-light-100">
                            We couldn’t find any books matching your search. Try using different keywords or check for typos.
                        </p>
                        <Button
                            className="w-full my-4 cursor-pointer"
                            onClick={handleClear}
                        >
                            Clear Search
                        </Button>
                    </div>
                )}

                {/* Search Results */}
                {showResults && (
                    <div className="flex flex-col gap-12">
                        <p className="text-[20px] md:text-[30px] font-semibold leading-7 text-white">Search Results</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                <div key={item} className="p-4 md:p-5 flex flex-col gap-3 md:gap-5 rounded-lg">
                                    <Image
                                        src={imagesAddresses.images.book1}
                                        alt="book"
                                        width={120}
                                        height={120}
                                        className="-ml-2 md:-ml-4"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-white font-semibold text-lg md:text-xl leading-5 md:leading-6">The Origin</p>
                                        <p className="text-white font-semibold text-lg md:text-xl leading-5 md:leading-6">By Dan Brown</p>
                                    </div>
                                    <p className="text-light-100 font-normal text-base md:text-xl leading-4 md:leading-5">Thriller / Mystery</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBook
