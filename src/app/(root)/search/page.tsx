"use client"

import { Button } from "@/components/ui/button"
import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { useState } from "react"

const SearchBook = () => {
    const [search, setSearch] = useState("")

    const handleSearch = () => {
        console.log("Searching for:", search)
    }

    const handleClear = () => {
        setSearch("")
    }

    return (
        <div className="mt-16 md:mt-20 flex flex-col items-center gap-8 px-4 md:px-10">
            <div>
                <p className="text-[18px] md:text-[20px] font-semibold leading-7 text-light-100 text-center">
                    Discover Your Next Great Read:
                </p>
                <p className="text-[32px] md:text-[56px] font-semibold leading-snug text-white text-center">
                    Explore and Search for
                </p>
                <p className="text-[32px] md:text-[56px] font-semibold leading-snug text-white text-center">
                    <span className="text-light-200">Any Book </span> In Our Library
                </p>
            </div>
            <div className="w-full max-w-[600px] flex flex-col sm:flex-row items-center gap-4 mt-8">
                <input
                    className="w-full sm:flex-1 bg-[#232839] p-3 sm:p-4 rounded-lg placeholder-gray-400 text-light-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    type="text"
                    placeholder="Search for a book"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch()
                    }}
                />
                <Button
                    className="w-full sm:w-auto !p-3 sm:!px-6"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>

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
                    className="w-full mt-4"
                    onClick={handleClear}
                >
                    Clear Search
                </Button>
            </div>
        </div>
    )
}

export default SearchBook