"use client"

import { Button } from "@/components/ui/button"
import imagesAddresses from "@/utils/imageAddresses"
import Image from "next/image"
import { useState } from "react"

const SearchBook = () => {

    const [seach, setSearch] = useState("")

    const handleSearch = () => { }

    return (
        <div className="mt-20 flex flex-col gap-8 items-center justify-center">
            <p className="text-[18px] font-semibold leading-7 text-light-100">Discover Your Next Great Read:</p>
            <p className="text-[56px] font-semibold leading-7 text-white">Explore and Search for</p>
            <p className="text-[56px] font-semibold leading-7 text-white"><span className="text-light-200 text-[56px] font-semibold">Any Book </span> In Our Library</p>
            <div className="w-full max-w-[600px] flex items-center gap-2 mt-10">
                <input
                    className="w-full bg-[#232839] p-3 rounded-lg placeholder-gray-400 text-light-100"
                    type="text"
                    placeholder="Search for a book"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch()
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    className="p-[22px] cursor-pointer"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </div>
            <div className="mt-20 flex flex-col gap-6 items-center justify-center max-w-[360px]">
                <Image
                    src={imagesAddresses.images.emptyResult}
                    alt="empty"
                    width={200}
                    height={200}
                />
                <p className="text-2xl font-semibold leading-7 text-white">No Results Found</p>
                <p className="text-base font-normal leading-6 text-light-100 text-center">
                    We couldn’t find any books matching your search. Try using different keywords or check for typos.
                </p>
                <Button
                    className="cursor-pointer w-full"
                    onClick={() => setSearch("")}
                >
                    Clear Search
                </Button>
            </div>
        </div>
    )
}

export default SearchBook