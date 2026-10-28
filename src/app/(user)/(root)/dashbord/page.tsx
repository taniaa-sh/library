"use client";

import BookFeature from "@/app/(user)/(root)/_components/BookFeature";
import PopularBookSlider from "@/app/(user)/(root)/_components/PopularBookSlider";
import imagesAddresses from "@/utils/imageAddresses";
import { BookFeatureProps } from "@/utils/type";
import { useEffect, useState } from "react";

const Home = () => {
    const [data, setData] = useState<BookFeatureProps[]>([]);

    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("error:", err));
    }, []);

    const sections = [
        {
            title: "Popular Books",
            id: "popular-books",
            description: "Discover the books readers love most.",
        },
        {
            title: "New Arrivals",
            id: "new-arrivals",
            description: "Explore the latest additions to our library.",
        },
        {
            title: "Top Rated",
            id: "top-rated",
            description: "Find highly rated books worth reading.",
        },
        {
            title: "Recommended",
            id: "recommended",
            description: "Discover your next favorite read.",
        },
    ];

    return (
        <main className="relative isolate mt-0 min-h-screen overflow-hidden bg-[#0D0D0C] text-white transition-colors duration-300 dark:bg-[#F8F2E6] dark:text-[#17130F]">
            {/* Transition from header to page */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-transparent via-[#0D0D0C]/70 to-[#0D0D0C] dark:via-[#F8F2E6]/70 dark:to-[#F8F2E6]"
            />

            {/* Top separator */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/80 to-transparent dark:via-[#B88A4B]/70"
            />

            {/* Decorative glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-20 -z-10 h-64 w-64 rounded-full bg-[#A87938]/10 blur-3xl dark:bg-[#E7C9A5]/30"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-[600px] -z-10 h-80 w-80 rounded-full bg-[#E7C9A5]/[0.06] blur-3xl dark:bg-[#A87938]/10"
            />

            {/* Featured book */}
            <section className="relative px-4 pb-4 pt-20 sm:px-8 sm:pt-24 md:px-10 lg:pt-28 mt-4">
                <div className="mx-auto w-full max-w-7xl">
                    <BookFeature
                        title="The Lord"
                        Genre="Fantasy"
                        author="J.R.R. Tolkien"
                        rating={4.8}
                        description="The Lord of the Rings is a novel by English author and scholar J. R. R. Tolkien."
                        bookImg={imagesAddresses.images.book1}
                        totalBooks={10}
                        availableBooks={4}
                    />
                </div>
            </section>

            {/* Book collections */}
            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pb-16 pt-12 sm:gap-20 sm:px-8 sm:pt-16 md:px-10 md:pb-20 lg:pt-20">
                {sections.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="relative min-w-0 scroll-mt-24"
                    >
                        {/* Section heading */}
                        <div className="mb-7 flex flex-col items-start gap-3 sm:mb-9">
                            <div className="flex items-center gap-3">
                                <span
                                    aria-hidden="true"
                                    className="h-7 w-1 rounded-full bg-[#E7C9A5] dark:bg-[#B88A4B]"
                                />

                                <h2 className="font-serif text-xl font-semibold tracking-wide text-white sm:text-2xl md:text-3xl dark:text-[#17130F]">
                                    {section.title}
                                </h2>
                            </div>

                            <p className="pl-4 text-xs leading-6 text-stone-400 sm:text-sm dark:text-[#75634E]">
                                {section.description}
                            </p>

                            {/* Section separator */}
                            <div
                                aria-hidden="true"
                                className="mt-1 h-px w-full bg-gradient-to-r from-[#E7C9A5]/60 via-[#E7C9A5]/20 to-transparent dark:from-[#B88A4B]/60 dark:via-[#B88A4B]/20 dark:to-transparent"
                            />
                        </div>

                        {/* Books slider */}
                        <div className="relative min-w-0 rounded-2xl border border-[#E7C9A5]/15 bg-white/[0.02] p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-colors duration-300 sm:p-5 dark:border-[#B88A4B]/20 dark:bg-white/40 dark:shadow-[0_8px_30px_rgba(80,55,25,0.04)]">
                            <PopularBookSlider data={data} />
                        </div>
                    </section>
                ))}
            </div>

            {/* Bottom separator */}
            <div
                aria-hidden="true"
                className="relative z-10 h-px bg-gradient-to-r from-transparent via-[#E7C9A5]/60 to-transparent dark:via-[#B88A4B]/60"
            />
        </main>
    );
};

export default Home;