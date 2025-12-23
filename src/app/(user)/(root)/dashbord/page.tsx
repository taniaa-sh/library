'use client';

import BookFeature from "@/app/(user)/(root)/_components/BookFeature";
import PopularBookSlider from "@/app/(user)/(root)/_components/PopularBookSlider";
import imagesAddresses from "@/utils/imageAddresses";
import { BookFeatureProps } from "@/utils/type";
import { useEffect, useState } from "react";

const Home = () => {

    const [data, setData] = useState<BookFeatureProps[]>([]);

    useEffect(() => {
        fetch('/data/data.json')
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error('error:', err));
    }, []);

    return (
        <>
            <div className="flex flex-col gap-10 px-4 md:px-10">
                <BookFeature
                    title="The Lord"
                    Genre="Fantasy"
                    author="J.R.R. Tolkien"
                    rating={4.8}
                    description={"The Lord of the Rings is a novel by English author and scholar J. R. R. Tolkien."}
                    bookImg={imagesAddresses.images.book1}
                    totalBooks={10}
                    availableBooks={4}
                />
            </div>
            <div className="flex flex-col gap-12 mt-20 px-4 md:px-10">
                <p className="text-xl md:text-3xl font-semibold text-light-100 dark:text-gray-900">Popular Books</p>
                <PopularBookSlider data={data} />
            </div>
            <div className="flex flex-col gap-12 mt-20 px-4 md:px-10">
                <p className="text-xl md:text-3xl font-semibold text-light-100 dark:text-gray-900">New Arrivals</p>
                <PopularBookSlider data={data} />
            </div>
            <div className="flex flex-col gap-12 mt-20 px-4 md:px-10">
                <p className="text-xl md:text-3xl font-semibold text-light-100 dark:text-gray-900">Top Rated</p>
                <PopularBookSlider data={data} />
            </div>
            <div className="flex flex-col gap-12 mt-20 px-4 md:px-10">
                <p className="text-xl md:text-3xl font-semibold text-light-100 dark:text-gray-900">Recommended</p>
                <PopularBookSlider data={data} />
            </div>
        </>
    );
};

export default Home;